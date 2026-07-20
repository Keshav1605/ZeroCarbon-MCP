#!/usr/bin/env node

/**
 * ZeroCarbon MCP Stdio Bridge Client
 * 
 * Bridges standard stdin/stdout JSON-RPC to the hosted ZeroCarbon API server.
 * Includes local file search heuristics to automatically extract and upload proof documents
 * when AI agents call tools with filenames.
 * 
 * Setup:
 * 1. Set ZEROCARBON_API_KEY environment variable.
 * 2. Configure your agent config (e.g. Claude Desktop or Gemini CLI) to run:
 *    node path/to/zerocarbon-mcp-client.js
 */

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.ZEROCARBON_API_KEY;
const apiUrl = process.env.ZEROCARBON_API_URL || 'https://zerocarbon.org.in/api/v1/mcp';

if (!apiKey) {
  console.error('Error: ZEROCARBON_API_KEY environment variable is required.');
  process.exit(1);
}

// Scans typical folders on the host machine to find files by name.
// Helps extract proof attachments from the local machine when absolute paths are omitted.
function findFileInStandardDirs(fileName) {
  if (!fileName) return null;
  
  // Strip out any directory paths and get the pure file name
  const cleanName = path.basename(fileName);

  const homeDir = process.env.USERPROFILE || process.env.HOME || '';
  const appDataDir = process.env.APPDATA || 
    (process.platform === 'darwin' ? path.join(homeDir, 'Library', 'Application Support') : path.join(homeDir, '.config'));
  const tempDir = process.env.TEMP || process.env.TMP || (process.platform === 'win32' ? '' : '/tmp');

  const searchDirs = [
    process.cwd(),
    path.join(homeDir, 'Downloads'),
    path.join(homeDir, 'Desktop'),
    path.join(homeDir, 'Documents'),
    path.join(homeDir, 'Claude'),
    path.join(homeDir, 'claude'),
    path.join(homeDir, 'Claude Desktop'),
    path.join(appDataDir, 'Claude', 'attachments'),
    path.join(tempDir),
    path.join(tempDir, 'Claude'),
    path.join(tempDir, 'claude-desktop'),
    path.join(tempDir, 'attachments')
  ].filter(Boolean);

  // 1. Direct search in common directories
  for (const dir of searchDirs) {
    const fullPath = path.join(dir, cleanName);
    try {
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
          return fullPath;
        }
      }
    } catch (e) {}
  }

  // 2. Scan one level deep inside AppData Claude Attachments directory
  try {
    const claudeAttachmentsDir = path.join(appDataDir, 'Claude', 'attachments');
    if (fs.existsSync(claudeAttachmentsDir)) {
      const subdirs = fs.readdirSync(claudeAttachmentsDir);
      for (const subdir of subdirs) {
        const fullPath = path.join(claudeAttachmentsDir, subdir);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            const nestedPath = path.join(fullPath, cleanName);
            if (fs.existsSync(nestedPath)) {
              return nestedPath;
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 3. Scan common Temp folders
  try {
    if (fs.existsSync(tempDir)) {
      const subs = ['Claude', 'claude-desktop', 'attachments'];
      for (const sub of subs) {
        const fullPath = path.join(tempDir, sub, cleanName);
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    }
  } catch (e) {}

  return null;
}

let buffer = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  buffer += chunk;
  
  // JSON-RPC messages are typically newline-delimited in MCP stdio.
  const lines = buffer.split('\n');
  buffer = lines.pop(); // Keep incomplete last line
  
  for (const line of lines) {
    if (line.trim()) {
      handleRequest(line.trim());
    }
  }
});

process.stdin.on('end', () => {
  if (buffer.trim()) {
    handleRequest(buffer.trim());
  }
});

function handleRequest(rawJson) {
  try {
    const parsed = JSON.parse(rawJson);
    
    // Intercept client file paths to convert them to base64 before sending to remote server
    if (parsed.method === 'tools/call' && parsed.params && parsed.params.name === 'ingest_unstructured_document') {
      const args = parsed.params.arguments || {};
      const targetPath = args.filePath || args.fileName;
      if (targetPath) {
        try {
          let resolvedPath = null;
          if (fs.existsSync(targetPath)) {
            resolvedPath = targetPath;
          } else {
            resolvedPath = findFileInStandardDirs(targetPath);
          }

          if (resolvedPath) {
            const fileBuffer = fs.readFileSync(resolvedPath);
            parsed.params.arguments = {
              ...args,
              fileContent: fileBuffer.toString('base64'),
              fileName: path.basename(resolvedPath)
            };
          } else {
            console.error(`[Warning] Local file not found: ${targetPath}. Forwarding request to API server.`);
          }
        } catch (err) {
          sendJsonRpcError(parsed.id, -32603, `Failed to read local file: ${err.message}`);
          return;
        }
      }
    }
    
    if (parsed.method === 'tools/call' && parsed.params && parsed.params.name === 'create_draft_record') {
      const args = parsed.params.arguments || {};
      const targetPath = args.filePath || args.fileName;
      if (targetPath) {
        try {
          let resolvedPath = null;
          if (fs.existsSync(targetPath)) {
            resolvedPath = targetPath;
          } else {
            resolvedPath = findFileInStandardDirs(targetPath);
          }

          if (resolvedPath) {
            const fileBuffer = fs.readFileSync(resolvedPath);
            parsed.params.arguments = {
              ...args,
              fileContent: fileBuffer.toString('base64'),
              fileName: path.basename(resolvedPath)
            };
          } else {
            // Log local warning to terminal, but let draft creation proceed without attachment
            console.error(`[Warning] Local proof document not found for: ${targetPath}`);
          }
        } catch (err) {
          console.error(`[Error] Failed to read local draft verification file: ${err.message}`);
        }
      }
    }
    
    if (parsed.method === 'tools/call' && parsed.params && parsed.params.name === 'start_bulk_ingestion_job') {
      const args = parsed.params.arguments || {};
      const targetPaths = args.filePaths || [];
      if (targetPaths && Array.isArray(targetPaths) && targetPaths.length > 0) {
        try {
          const files = [];
          for (const rawPath of targetPaths) {
            let resolvedPath = null;
            if (fs.existsSync(rawPath)) {
              resolvedPath = rawPath;
            } else {
              resolvedPath = findFileInStandardDirs(rawPath);
            }

            if (resolvedPath) {
              const fileBuffer = fs.readFileSync(resolvedPath);
              files.push({
                fileName: path.basename(resolvedPath),
                fileContent: fileBuffer.toString('base64')
              });
            } else {
              console.error(`[Warning] Local bulk file not found: ${rawPath}. Forwarding request to API server.`);
            }
          }
          parsed.params.arguments = {
            ...args,
            files: files
          };
        } catch (err) {
          sendJsonRpcError(parsed.id, -32603, `Failed to read local files: ${err.message}`);
          return;
        }
      }
    }

    const requestBody = JSON.stringify(parsed);
    
    const parsedUrl = url.parse(apiUrl);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };
    
    const client = (parsedUrl.protocol === 'https:' ? https : http);
    const req = client.request(options, (res) => {
      let responseData = '';
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 204) {
          return;
        }
        try {
          const jsonResponse = JSON.parse(responseData);
          if (!jsonResponse || !jsonResponse.jsonrpc || (!jsonResponse.result && !jsonResponse.error)) {
            sendJsonRpcError(
              parsed.id,
              res.statusCode === 401 ? -32001 : -32603,
              jsonResponse.error || jsonResponse.message || `HTTP ${res.statusCode}: ${responseData}`
            );
          } else {
            process.stdout.write(JSON.stringify(jsonResponse) + '\n');
          }
        } catch (err) {
          sendJsonRpcError(parsed.id, -32603, `API server responded with invalid JSON: ${responseData}`);
        }
      });
    });
    
    req.on('error', (err) => {
      sendJsonRpcError(parsed.id, -32603, `HTTP Request failed: ${err.message}`);
    });
    
    req.write(requestBody);
    req.end();
    
  } catch (err) {
    sendJsonRpcError(null, -32700, `Parse error: ${err.message}`);
  }
}

function sendJsonRpcError(id, code, message) {
  const errResponse = {
    jsonrpc: '2.0',
    id: id,
    error: {
      code: code,
      message: message
    }
  };
  process.stdout.write(JSON.stringify(errResponse) + '\n');
}
