const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:\\Users\\Lenovo\\Desktop\\brisamarina';
const OUT = path.join(__dirname, '..', 'img');
const VIDEOUT = path.join(__dirname, '..', 'video');

// mapa nombre-origen -> nombre-limpio (webp)
const MAP = {
  'atardecer .png': 'atardecer',
  'balcon.png': 'balcon',
  'balcon2.png': 'balcon2',
  'balcon3.png': 'balcon3',
  'Habitacion.png': 'habitacion',
  'hotel.png': 'hotel',
  'interior3.png': 'interior',
  'lugar3.png': 'lugar',
  'nocturno.png': 'nocturno',
  'nocturno2.png': 'nocturno2',
  'todoellugar.png': 'panoramica',
  'todoellugar2.png': 'panoramica2',
  'vistas2.png': 'vista',
  'vitas.png': 'vista2',
};

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const thumbs = [];
  for (const [src, name] of Object.entries(MAP)) {
    const srcPath = path.join(SRC, src);
    if (!fs.existsSync(srcPath)) { console.log('MISSING', src); continue; }
    const meta = await sharp(srcPath).metadata();
    // versión grande optimizada
    await sharp(srcPath)
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${name}.webp`));
    // thumbnail para contact sheet
    const tbuf = await sharp(srcPath)
      .resize({ width: 300, height: 200, fit: 'cover' })
      .webp({ quality: 70 })
      .toBuffer();
    thumbs.push({ name, buf: tbuf, w: meta.width, h: meta.height });
    console.log('OK', name, `${meta.width}x${meta.height}`);
  }

  // Construir contact sheet (grid 4 columnas)
  const cols = 4;
  const cw = 300, ch = 200, pad = 8, labelH = 26;
  const rows = Math.ceil(thumbs.length / cols);
  const sheetW = cols * cw + (cols + 1) * pad;
  const sheetH = rows * (ch + labelH) + (rows + 1) * pad;
  const composites = [];
  for (let i = 0; i < thumbs.length; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const x = pad + c * (cw + pad);
    const y = pad + r * (ch + labelH + pad);
    composites.push({ input: thumbs[i].buf, left: x, top: y });
    const label = Buffer.from(
      `<svg width="${cw}" height="${labelH}"><rect width="100%" height="100%" fill="#0A2540"/><text x="8" y="18" font-family="Arial" font-size="15" fill="#D4B36A">${thumbs[i].name} (${thumbs[i].w}x${thumbs[i].h})</text></svg>`
    );
    composites.push({ input: label, left: x, top: y + ch });
  }
  await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: '#12212E' } })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(path.join(__dirname, 'contact-sheet.jpg'));
  console.log('CONTACT SHEET listo');

  // Copiar solo el video del hero (los demás no se usan en la página).
  // Para probar otro video de fondo, agrega su nombre aquí y cambia el <source> del hero.
  if (!fs.existsSync(VIDEOUT)) fs.mkdirSync(VIDEOUT, { recursive: true });
  const vids = { 'lugar.mp4': 'hero.mp4' };
  for (const [s, d] of Object.entries(vids)) {
    const sp = path.join(SRC, s);
    if (fs.existsSync(sp)) { fs.copyFileSync(sp, path.join(VIDEOUT, d)); console.log('VIDEO', d); }
  }
})();
