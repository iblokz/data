#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const pug = require('pug');
const { execSync } = require('child_process');

const siteDir = path.join(__dirname, '..', '_site');
const jsdocDir = path.join(__dirname);

// Ensure _site directory exists
if (!fs.existsSync(siteDir)) {
	fs.mkdirSync(siteDir, { recursive: true });
}

console.log('Building documentation site...');

// Step 1: Generate JSDoc
console.log('1. Generating JSDoc...');
execSync('npm run docs:html', { stdio: 'inherit' });

// Step 2: Read CSS files
console.log('2. Loading stylesheets...');
const landingCSS = fs.readFileSync(path.join(jsdocDir, 'landing.css'), 'utf8');
const markdownCSS = fs.readFileSync(path.join(jsdocDir, 'markdown.css'), 'utf8');
const jsdocThemeCSS = fs.readFileSync(path.join(jsdocDir, 'theme.css'), 'utf8');

// Step 3: Compile Pug templates
console.log('3. Compiling templates...');
const landingTemplate = pug.compileFile(path.join(jsdocDir, 'templates', 'landing.pug'));
const markdownTemplate = pug.compileFile(path.join(jsdocDir, 'templates', 'markdown.pug'));

// Step 4: Generate landing page
console.log('4. Creating landing page...');
const landingHtml = landingTemplate({
	title: 'iblokz-data Documentation',
	css: landingCSS
});
fs.writeFileSync(path.join(siteDir, 'index.html'), landingHtml);

// Step 5: Convert README.md to HTML
console.log('5. Converting README.md to HTML...');
const readmeMd = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
const readmeHtml = markdownTemplate({
	title: 'README - iblokz-data',
	css: markdownCSS,
	content: marked(readmeMd)
});
fs.writeFileSync(path.join(siteDir, 'README.html'), readmeHtml);

// Step 6: Convert API.md to HTML
console.log('6. Converting API.md to HTML...');
const apiMd = fs.readFileSync(path.join(__dirname, '..', 'API.md'), 'utf8');
const apiHtml = markdownTemplate({
	title: 'API Reference - iblokz-data',
	css: markdownCSS,
	content: marked(apiMd)
});
fs.writeFileSync(path.join(siteDir, 'API.html'), apiHtml);

// Step 7: Inject custom theme into JSDoc files
console.log('7. Applying custom theme to JSDoc...');
const jsdocApiDir = path.join(siteDir, 'api');
if (fs.existsSync(jsdocApiDir)) {
	const htmlFiles = fs.readdirSync(jsdocApiDir).filter(f => f.endsWith('.html'));
	
	htmlFiles.forEach(file => {
		const filePath = path.join(jsdocApiDir, file);
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
