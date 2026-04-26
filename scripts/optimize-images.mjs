// Public klasöründeki büyük JPG'leri yerinde optimize eder.
// Orijinaller public/_original/ altına yedeklenir.
// Çalıştırma: node scripts/optimize-images.mjs

import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT     = path.resolve(process.cwd(), 'public')
const BACKUP   = path.resolve(ROOT, '_original')

// dosya -> { maxWidth, quality }
const TARGETS = {
  'atletizm.jpg':    { maxWidth: 1920, quality: 80 },
  'performance.jpg': { maxWidth: 1600, quality: 80 },
  'antrenör.jpg':    { maxWidth: 1400, quality: 80 },
  'blog1.jpg':       { maxWidth: 1200, quality: 80 },
  'blog2.jpg':       { maxWidth: 1200, quality: 80 },
  'blog3.jpg':       { maxWidth: 1200, quality: 80 },
  'insta1.jpg':      { maxWidth: 800,  quality: 78 },
}

async function ensureBackup() {
  await fs.mkdir(BACKUP, { recursive: true })
}

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}

async function optimize(file, opts) {
  const src = path.join(ROOT, file)
  const bak = path.join(BACKUP, file)
  let stat
  try {
    stat = await fs.stat(src)
  } catch {
    console.log(`SKIP  ${file} (yok)`)
    return
  }

  // Yedek henüz alınmadıysa orijinali kopyala
  try {
    await fs.access(bak)
  } catch {
    await fs.copyFile(src, bak)
  }

  const before = stat.size
  // Buffer'a oku ki write conflict olmasın
  const buf = await fs.readFile(bak) // her zaman backup'tan optimize et (idempotent)
  const out = await sharp(buf)
    .rotate()
    .resize({ width: opts.maxWidth, withoutEnlargement: true })
    .jpeg({ quality: opts.quality, mozjpeg: true, progressive: true })
    .toBuffer()

  const origSize = (await fs.stat(bak)).size
  if (out.length >= origSize) {
    // Optimizasyon orijinalden büyükse orijinali geri yaz (idempotent kalsın)
    await fs.copyFile(bak, src)
    console.log(`KEEP  ${file.padEnd(20)} ${fmtKB(origSize).padStart(10)} (orijinal zaten optimal)`)
    return
  }
  await fs.writeFile(src, out)
  const after = out.length
  const pct = (((origSize - after) / origSize) * 100).toFixed(1)
  console.log(`OK    ${file.padEnd(20)} ${fmtKB(origSize).padStart(10)} -> ${fmtKB(after).padStart(10)}  (-${pct}%)`)
}

async function main() {
  await ensureBackup()
  for (const [file, opts] of Object.entries(TARGETS)) {
    await optimize(file, opts)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
