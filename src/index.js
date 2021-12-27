import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import formatter from './formatter/index.js';
import makeTree from './makeTree.js';

const getFileData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');

const genDiff = (oldFilePath, newFilePath, format = 'stylish') => {
  const oldFileExtname = path.extname(oldFilePath);
  const newFileExtname = path.extname(newFilePath);
  const oldData = parser(getFileData(oldFilePath), oldFileExtname);
  const newData = parser(getFileData(newFilePath), newFileExtname);
  const diffs = makeTree(oldData, newData);
  const styled = formatter(diffs, format);

  return styled;
};

export default genDiff;
