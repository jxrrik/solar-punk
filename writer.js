const fs = require("fs").promises;
const path = require("path");

// Função para verificar se um diretório ou arquivo deve ser excluído
function shouldExclude(fileOrDir, excludedNames) {
  return excludedNames.some((excluded) => fileOrDir.includes(excluded));
}

// Função para verificar se o conteúdo do arquivo contém uma palavra específica
async function containsWord(filePath, word) {
  const fileContent = await fs.readFile(filePath, "utf-8");
  return fileContent.includes(word);
}

// Função para obter todos os arquivos, aplicando filtros de exclusão
async function getAllFiles(
  dirPath,
  arrayOfFiles = [],
  excludedNames = [],
  wordFilter = null
) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    if (shouldExclude(file, excludedNames)) continue;

    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await getAllFiles(filePath, arrayOfFiles, excludedNames, wordFilter);
    } else {
      if (!wordFilter || (await containsWord(filePath, wordFilter))) {
        arrayOfFiles.push(filePath);
      }
    }
  }

  return arrayOfFiles;
}

// Função para gerar o arquivo de saída
async function generateOutputFile(
  dirPath,
  outputFilePath,
  excludedNames = [],
  wordFilter = null
) {
  try {
    const files = await getAllFiles(dirPath, [], excludedNames, wordFilter);
    const outputStream = await fs.open(outputFilePath, "w");

    for (const file of files) {
      const relativePath = path.relative(dirPath, file);
      const fileContent = await fs.readFile(file, "utf-8");

      await outputStream.write(`\n\n=== ${relativePath} ===\n`);
      await outputStream.write(`${fileContent}\n`);
    }

    await outputStream.close();
    console.log(`Arquivo de saída gerado com sucesso em: ${outputFilePath}`);
  } catch (error) {
    console.error(`Erro ao gerar o arquivo de saída: ${error.message}`);
  }
}

// Configurações

const taskPath = path.join(__dirname);

const taskFilePath = path.join(__dirname, path.basename(taskPath) + ".txt");
const excludedNames = [
  "output",
  "package",
  "test",
  "node_modules",
  "logs",
  "json",
  "txt",
  "ico",
  "jpg",
  "csv",
  "xlsx",
  "pdf",
  "xml",
  "png",
  "zip",
  "log",
  "SERVER_FILES",
  "hooks",
  "imgs",
  ".vscode",
  ".git",
  "certs",	
  "utils"
];
const wordFilter = null; // Substitua por sua palavra específica

generateOutputFile(taskPath, taskFilePath, excludedNames);
