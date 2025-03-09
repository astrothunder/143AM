import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const soundsDir = path.join(__dirname, "../dist/sound");
const outputFilePath = path.join(soundsDir, "index.html");

// Ensure the sounds directory exists
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

fs.readdir(soundsDir, (err, files) => {
  if (err) {
    console.error("Error reading sounds directory:", err);
    return;
  }

  const soundFiles = files.filter(
    (file) => file.endsWith(".mp3") || file.endsWith(".wav")
  );

  const htmlContent = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Sounds Index</title> </head> <body> <h1>Sounds Index</h1> <ul> ${soundFiles
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join("")} </ul> </body> </html> `;
  fs.writeFile(outputFilePath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
      return;
    }
    console.log("Sound/ index.html generated successfully");
  });
});
