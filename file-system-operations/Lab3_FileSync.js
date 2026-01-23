
const fs = require('fs');
const path = require('path');

async function syncDir(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await syncDir(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error("Sync error:", err.message);
  }
}

syncDir('dir1', 'dir2').then(() => console.log("Sync complete"));
