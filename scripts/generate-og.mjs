import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('src/assets/og');
fs.mkdirSync(outDir, { recursive: true });

const title = 'Why BrowserMan exists';
const subtitle = 'Local browser tools can access a real browser. Cloud browsers can serve remote agents. Real workflows need both.';
const slug = 'why-browserman-exists';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const titleLines = wrapText(title, 20).slice(0, 3);
const subtitleLines = wrapText(subtitle, 58).slice(0, 3);

const titleSvg = titleLines.map((line, i) =>
  `<text x="88" y="${250 + i * 84}" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="#1a1814">${escapeXml(line)}</text>`
).join('\n');

const subtitleSvg = subtitleLines.map((line, i) =>
  `<text x="88" y="${460 + i * 34}" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#4b433b">${escapeXml(line)}</text>`
).join('\n');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f1e8"/>
  <rect x="18" y="18" width="1164" height="594" rx="18" fill="#f8f4ec" stroke="#d4cab3" stroke-width="2"/>
  <text x="88" y="92" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="4" fill="#a9661e">BROWSERMAN · WRITING</text>
  <text x="88" y="165" font-family="Georgia, 'Times New Roman', serif" font-size="190" font-style="italic" fill="#1a1814">B</text>
  ${titleSvg}
  ${subtitleSvg}
  <line x1="88" y1="548" x2="1112" y2="548" stroke="#d4cab3" stroke-width="2"/>
  <text x="88" y="585" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="2" fill="#6b6459">BLOG.BROWSERMAN.RUN</text>
  <text x="1112" y="585" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="2" fill="#6b6459">WHY BROWSERMAN EXISTS</text>
</svg>`;

const outPath = path.join(outDir, `${slug}.png`);
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
