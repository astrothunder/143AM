import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resourceDir = path.join(__dirname, "../dist/resource");
const outputFilePath = path.join(resourceDir, "index.html");

if (!fs.existsSync(resourceDir)) {
  fs.mkdirSync(resourceDir, { recursive: true });
}

fs.readdir(resourceDir, (err, files) => {
  if (err) {
    console.error("Error reading resource directory:", err);
    return;
  }

  const resourceFiles = files.filter(
    (file) =>
      file.endsWith(".res") || file.endsWith(".txt") || file.endsWith(".ttf")
  );

  const htmlContent = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Resource Index</title> </head> <body> <h1>Resource Index</h1> <ul> ${resourceFiles
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join("")} </ul> </body> </html> `;
  fs.writeFile(outputFilePath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
      return;
    }
    console.log("Resource/ index.html generated successfully");
  });
});
