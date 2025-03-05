const fs = require("fs");
const path = require("path");

const soundsDir = path.join(__dirname, "../dist/sounds");
const outputFilePath = path.join(soundsDir, "index.html");

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
    console.log("index.html generated successfully");
  });
});
