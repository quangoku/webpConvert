const { dialog } = require("@electron/remote");
const path = require("path");
const webp = require("webp-converter");

const selectFileBtn = document.getElementById("selectFileBtn");
const formatSelect = document.getElementById("formatSelect");
const selectFolderBtn = document.getElementById("selectFolderBtn");
const outputPathText = document.getElementById("outputPath");
const convertBtn = document.getElementById("convertBtn");
const status = document.getElementById("status");

let outputFolder = null;
let inputFiles = [];

// select files
selectFileBtn.addEventListener("click", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "WebP images", extensions: ["webp"] }],
  });
  if (!result.canceled) {
    inputFiles = result.filePaths;
    status.textContent = `📁 Đã chọn ${inputFiles.length} file WebP`;
  }
});
// select folder
selectFolderBtn.addEventListener("click", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (!result.canceled) {
    outputFolder = result.filePaths[0];
    outputPathText.textContent = outputFolder;
  }
});
// convert event
convertBtn.addEventListener("click", async () => {
  if (!inputFiles.length) {
    status.textContent = "❗ Pls choose  .webp files";
    return;
  }
  if (!outputFolder) {
    status.textContent = "❗ Pls choose folder to save files";
    return;
  }

  const format = formatSelect.value;
  status.textContent = "🔄 Converting ...";

  for (const inputPath of inputFiles) {
    try {
      const fileName = path.basename(inputPath, path.extname(inputPath));
      const outputPath = path.join(outputFolder, `${fileName}.${format}`);

      await webp.dwebp(inputPath, outputPath, "-o");
    } catch (error) {
      status.textContent = `⚠️ Failed to convert ${path.basename(inputPath)}`;
      return;
    }
  }

  status.textContent = "✅ Converted Successfully";
});
