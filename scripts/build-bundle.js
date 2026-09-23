const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'static', 'js');
const outBundle = path.join(outDir, 'nostr-comments.bundle.js');

console.log('Building Nostr Comments & Highlights bundle...');
fs.mkdirSync(outDir, { recursive: true });

const cssSrcDir = path.join(rootDir, 'assets', 'css');
const cssOutDir = path.join(rootDir, 'static', 'css');
fs.mkdirSync(cssOutDir, { recursive: true });
if (fs.existsSync(cssSrcDir)) {
  const cssFiles = fs.readdirSync(cssSrcDir).filter(f => f.startsWith('nostr-') && f.endsWith('.css'));
  for (const file of cssFiles) {
    fs.copyFileSync(path.join(cssSrcDir, file), path.join(cssOutDir, file));
  }
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hugo-bundle-'));
try {
  const layoutsDir = path.join(tempDir, 'layouts');
  fs.mkdirSync(layoutsDir, { recursive: true });

  // Symlink node_modules and assets from root
  fs.symlinkSync(path.join(rootDir, 'node_modules'), path.join(tempDir, 'node_modules'), 'dir');
  fs.symlinkSync(path.join(rootDir, 'assets'), path.join(tempDir, 'assets'), 'dir');

  const cacheDir = path.join(tempDir, 'cache');
  fs.mkdirSync(cacheDir, { recursive: true });

  fs.writeFileSync(
    path.join(tempDir, 'hugo.toml'),
    `baseURL = "https://example.com"\ncacheDir = "${cacheDir}"\n`
  );

  fs.writeFileSync(
    path.join(layoutsDir, 'index.html'),
    '{{ $js := resources.Get "js/nostr-comments.js" | js.Build (dict "targetPath" "nostr-comments.bundle.js" "minify" true) }}\n' +
    '<script src="{{ $js.RelPermalink }}"></script>\n'
  );

  execSync(`hugo --cacheDir "${cacheDir}" --ignoreCache --cleanDestinationDir --gc`, { cwd: tempDir, stdio: 'pipe' });

  const generatedBundle = path.join(tempDir, 'public', 'nostr-comments.bundle.js');
  if (fs.existsSync(generatedBundle)) {
    fs.copyFileSync(generatedBundle, outBundle);
    const sizeKb = (fs.statSync(outBundle).size / 1024).toFixed(1);
    console.log(`Bundle generated successfully: static/js/nostr-comments.bundle.js (${sizeKb} KB)`);
  } else {
    throw new Error('Generated bundle not found at ' + generatedBundle);
  }
} finally {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
}
