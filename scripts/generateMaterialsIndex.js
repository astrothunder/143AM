const fs = require("fs");
const path = require("path");

const materialsDir = path.join(__dirname, "../dist/materials");
const outputFilePath = path.join(materialsDir, "index.html");

fs.readdir(materialsDir, (err, files) => {
  if (err) {
    console.error("Error reading materials directory:", err);
    return;
  }

  const materialFiles = files.filter(
    (file) =>
      file.endsWith(".vmt") || file.endsWith(".vtf") || file.endsWith(".png")
  );

  const htmlContent = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Materials Index</title> </head> <body> <h1>Materials Index</h1> <ul> ${materialFiles
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join("")} </ul> </body> </html> `;
  fs.writeFile(outputFilePath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing index.html:", err);
      return;
    }
    console.log("index.html generated successfully");
  });
});
