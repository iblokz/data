# JSDoc Documentation Build System

This folder contains all the configuration, templates, and assets for building the complete documentation site.

## Structure

```
jsdoc/
├── build-docs.js        # Main build script
├── config.json          # JSDoc configuration
├── theme.css            # Custom JSDoc dark/light theme
├── landing.css          # Landing page styles
├── markdown.css         # Markdown page styles
└── templates/
    ├── landing.pug      # Landing page template
    └── markdown.pug     # Markdown wrapper template
```

## Templates

All HTML is generated from **Pug templates** with separate CSS files:

- **`templates/landing.pug`**: Main landing page with card-based navigation
- **`templates/markdown.pug`**: Wrapper for README.html and API.html

## Stylesheets

- **`theme.css`**: Custom dark/light theme for JSDoc pages
- **`landing.css`**: Styles for the landing page
- **`markdown.css`**: Styles for markdown-converted pages

## Build Script

The `build-docs.js` script:
1. Generates JSDoc HTML from source code
2. Loads all CSS files
3. Compiles Pug templates
4. Generates landing page (index.html)
5. Converts README.md and API.md to HTML
6. Injects custom theme into JSDoc pages

## Usage

```bash
# Build complete documentation site
npm run docs:site

# Preview locally
npm run docs:preview
```

## GitHub Workflow

The GitHub Actions workflow (`.github/workflows/docs.yml`) uses the same build script:

```yaml
- name: Build complete documentation site
  run: npm run docs:site
```

This ensures **100% parity** between local preview and deployed documentation.

## Customization

To modify the documentation:

- **Landing page content**: Edit `templates/landing.pug`
- **Landing page styles**: Edit `landing.css`
- **Markdown styles**: Edit `markdown.css`
- **JSDoc theme**: Edit `theme.css`
- **JSDoc config**: Edit `config.json`

All changes are reflected in both local preview and GitHub Pages deployment.

