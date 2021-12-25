import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');

const parseData = (data, extname) => {
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.load(data);
  } if (extname === '.json') {
    return JSON.parse(data);
  }
  throw new Error(`${extname} - неподдерживаемый формат файла`);
};

const parser = (filePath) => {
  if (!filePath || !filePath.trim().length === 0) {
    return {};
  }

  const extname = path.extname(filePath);
  const data = getFileData(filePath);
  const result = parseData(data, extname);

  return result;
};

export default parser;
