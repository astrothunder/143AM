import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mapsDir = path.join(__dirname, "../dist/maps");
const outputFilePath = path.join(mapsDir, "index.html");

// Ensure the maps directory exists
if (!fs.existsSync(mapsDir)) {
  fs.mkdirSync(mapsDir, { recursive: true });
}

fs.readdir(mapsDir, (err, files) => {
  if (err) {
    console.error("Error reading maps directory:", err);
    return;
  }

  const mapFiles = files.filter((file) => file.endsWith(".bsp.bz2"));

  const htmlContent = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Maps Index</title> </head> <body> <h1>Maps Index</h1> <ul> ${mapFiles
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join("")} </ul> </body> </html> `;
  fs.writeFile(outputFilePath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
      return;
    }
    console.log("Maps/ index.html generated successfully");
  });
});
