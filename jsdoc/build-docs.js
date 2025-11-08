#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { execSync } = require('child_process');

// Ensure _site directory exists
const siteDir = path.join(__dirname, '..', '_site');
if (!fs.existsSync(siteDir)) {
	fs.mkdirSync(siteDir, { recursive: true });
}

// Read theme CSS
const themeCSS = `
:root {
	--bg-color: #ffffff;
	--text-color: #24292e;
	--link-color: #0366d6;
	--border-color: #e1e4e8;
	--code-bg: #f6f8fa;
	--header-bg: #f6f8fa;
}

@media (prefers-color-scheme: dark) {
	:root {
		--bg-color: #0d1117;
		--text-color: #c9d1d9;
		--link-color: #58a6ff;
		--border-color: #30363d;
		--code-bg: #161b22;
		--header-bg: #161b22;
	}
}

body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
	line-height: 1.6;
	max-width: 900px;
	margin: 0 auto;
	padding: 2rem;
	background: var(--bg-color);
	color: var(--text-color);
}

a {
	color: var(--link-color);
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

pre {
	background: var(--code-bg);
	padding: 1rem;
	border-radius: 6px;
	overflow-x: auto;
	border: 1px solid var(--border-color);
}

code {
	background: var(--code-bg);
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-family: 'Courier New', monospace;
}

pre code {
	background: none;
	padding: 0;
}

h1, h2, h3, h4, h5, h6 {
	margin-top: 1.5em;
	margin-bottom: 0.5em;
}

table {
	border-collapse: collapse;
	width: 100%;
	margin: 1rem 0;
}

th, td {
	border: 1px solid var(--border-color);
	padding: 0.5rem;
	text-align: left;
}

th {
	background: var(--header-bg);
	font-weight: 600;
}

tr:nth-child(even) {
	background: var(--code-bg);
}

blockquote {
	border-left: 4px solid var(--border-color);
	padding-left: 1rem;
	margin-left: 0;
	color: var(--text-color);
	opacity: 0.8;
}
`;

// Function to convert markdown to HTML with theming
function markdownToHtml(markdownContent, title) {
	const htmlContent = marked(markdownContent);
	
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title} - iblokz-data</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" media="(prefers-color-scheme: light)">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" media="(prefers-color-scheme: dark)">
	<style>${themeCSS}</style>
</head>
<body>
	${htmlContent}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
	<script>hljs.highlightAll();</script>
</body>
</html>`;
}

// Generate landing page
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>iblokz-data Documentation</title>
	<style>${themeCSS}</style>
</head>
<body>
	<h1>iblokz-data Documentation</h1>
	<p>A lightweight JavaScript utility library for immutable data operations.</p>
	
	<h2>Documentation</h2>
	<ul>
		<li><a href="README.html">README</a> - Getting started and overview</li>
		<li><a href="API.html">API Documentation</a> - Detailed API reference</li>
		<li><a href="api/index.html">JSDoc Browser</a> - Interactive API browser</li>
	</ul>
	
	<h2>Quick Links</h2>
	<ul>
		<li><a href="https://github.com/iblokz/data">GitHub Repository</a></li>
		<li><a href="https://www.npmjs.com/package/iblokz-data">npm Package</a></li>
	</ul>
</body>
</html>`;

console.log('Building documentation site...');

// Step 1: Generate JSDoc
console.log('1. Generating JSDoc...');
execSync('npm run docs:html', { stdio: 'inherit' });

// Step 2: Convert README.md to HTML
console.log('2. Converting README.md to HTML...');
const readmeMd = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
const readmeHtml = markdownToHtml(readmeMd, 'README');
fs.writeFileSync(path.join(siteDir, 'README.html'), readmeHtml);

// Step 3: Convert API.md to HTML
console.log('3. Converting API.md to HTML...');
const apiMd = fs.readFileSync(path.join(__dirname, '..', 'API.md'), 'utf8');
const apiHtml = markdownToHtml(apiMd, 'API Reference');
fs.writeFileSync(path.join(siteDir, 'API.html'), apiHtml);

// Step 4: Create landing page
console.log('4. Creating landing page...');
fs.writeFileSync(path.join(siteDir, 'index.html'), indexHtml);

// Step 5: Inject custom theme into JSDoc files
console.log('5. Applying custom theme to JSDoc...');
const jsdocDir = path.join(siteDir, 'api');
if (fs.existsSync(jsdocDir)) {
	const jsdocThemeCSS = fs.readFileSync(path.join(__dirname, 'theme.css'), 'utf8');
	const htmlFiles = fs.readdirSync(jsdocDir).filter(f => f.endsWith('.html'));
	
	htmlFiles.forEach(file => {
		const filePath = path.join(jsdocDir, file);
		let content = fs.readFileSync(filePath, 'utf8');
		
		// Inject custom CSS before </head>
		if (!content.includes('/* JSDoc custom theme */')) {
			content = content.replace(
				'</head>',
				`<style>/* JSDoc custom theme */\n${jsdocThemeCSS}</style>\n</head>`
			);
			fs.writeFileSync(filePath, content);
		}
	});
}

console.log('✅ Documentation site built successfully in _site/');
console.log('   Open _site/index.html in your browser to preview');

