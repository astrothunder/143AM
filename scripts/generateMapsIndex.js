// filepath: /c:/Users/Ciriaco/Documents/GitHub/143AM/scripts/generateMapsIndex.js
const fs = require("fs");
const path = require("path");

const mapsDir = path.join(__dirname, "../dist/maps");
const outputFilePath = path.join(mapsDir, "index.html");

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
    console.log("index.html generated successfully");
  });
});
