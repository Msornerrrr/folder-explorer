/**
 * @author Hao Jiang
 * @description
 * A server serves all the pdf files within all the subfolders of the folder in server
 * 
 * @link
 * https://www.geeksforgeeks.org/node-js-fs-readdir-method/
 * https://www.geeksforgeeks.org/node-js-fs-readfile-method/?ref=lbp
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { StatusCodes } from 'http-status-codes'

// import swaggerUi from 'swagger-ui-express';
// import swaggerFile from './swagger.json' assert { type: "json" };

const app = express();
app.use(cors());

const __dirname = new URL('.', import.meta.url).pathname;
const baseDir = path.resolve(__dirname, "folders");

// middlewares
const checkMainFolder = async (req, res, next) => {
  try {
    const items = await fs.readdir(baseDir, { withFileTypes: true });
    req.mainItems = items;
    next();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "main folder is not present in file system" });
  }
};

const checkSubFolder = async (req, res, next) => {
  try {
    const subfolder = path.join(baseDir, req.params.folder);
    const items = await fs.readdir(subfolder, { withFileTypes: true });
    req.subItems = items;
    next();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "subfolder is not present in file system" });
  }
};

const checkPdf = async (req, res, next) => {
  const item = req.subItems.find(item => item.name === req.params.pdf);
  if (item) {
    next();
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "pdf file is not present in file system" });
  }
};

// controllers
app.get("/api/folders", checkMainFolder, (req, res) => {
  const folders = req.mainItems
    .filter(item => item.isDirectory())   // only include directory
    .map(folder => folder.name);          // only send directory name
  res.json(folders);
});

app.get("/api/folders/:folder", checkSubFolder, async (req, res) => {
  const pdfs = req.subItems
    .filter(item => item.isFile() && path.extname(item.name) === ".pdf")   // only include pdf file
    .map(pdf => pdf.name);                              // server the file name without .pdf ending
  res.json(pdfs);
});

app.get("/api/folders/:folder/:pdf", checkSubFolder, checkPdf, (req, res) => {
  const pdfPath = path.join(baseDir, req.params.folder, req.params.pdf);
  // res.sendFile(pdfPath);
  res.download(pdfPath);
});

// use swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true, }));

// // handle production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(__dirname + '/public/'));

//   app.get(/.*/, (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
//   });
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))