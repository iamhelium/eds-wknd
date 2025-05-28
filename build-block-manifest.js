/* eslint-disable no-restricted-syntax, no-continue */
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const blocksRoot = path.join(rootDir, 'blocks');
const multisiteDir = path.join(rootDir, 'multisite');
const outputPath = path.join(rootDir, 'manifest.json');

function getBlockDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name));
}

function getBlockMetadata(blockPath) {
  const blockName = path.basename(blockPath);
  const jsFile = path.join(blockPath, `${blockName}.js`);
  const cssFile = path.join(blockPath, `${blockName}.css`);

  return {
    name: blockName,
    hasJS: fs.existsSync(jsFile),
    hasCSS: fs.existsSync(cssFile),
  };
}

function getBlocksMetadata(basePath) {
  return getBlockDirs(basePath)
    .map(getBlockMetadata)
    .filter((b) => b.hasJS || b.hasCSS);
}

function generateManifest() {
  const manifest = {};

  // Default blocks
  const defaultBlocks = getBlocksMetadata(blocksRoot);
  manifest.default = {
    blocks: defaultBlocks.map((b) => b.name),
    metadata: Object.fromEntries(defaultBlocks
      .map((b) => [b.name, { js: b.hasJS, css: b.hasCSS }])),
  };

  // Multisite overrides
  const siteDirs = getBlockDirs(multisiteDir);
  for (const sitePath of siteDirs) {
    const siteName = path.basename(sitePath);
    const siteBlocksPath = path.join(sitePath, 'blocks');
    if (!fs.existsSync(siteBlocksPath)) continue;

    const siteBlocks = getBlocksMetadata(siteBlocksPath);
    manifest[siteName] = {
      blocks: siteBlocks.map((b) => b.name),
      metadata: Object.fromEntries(siteBlocks.map((b) => [b.name, { js: b.hasJS, css: b.hasCSS }])),
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest generated at ${outputPath}`);
}

generateManifest();
