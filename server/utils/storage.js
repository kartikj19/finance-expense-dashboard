const fs = require('fs').promises;

const readData = async (filePath) => {
  try {
    const json = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(json || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeData = async (filePath, data) => {
  await fs.mkdir(require('path').dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readData, writeData };
