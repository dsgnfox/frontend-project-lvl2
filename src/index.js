import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import formatter from './formatter/index.js';
import makeTree from './makeTree.js';

const getFileData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');

const genDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstFileExtname = path.extname(firstFilePath);
  const secondFileExtname = path.extname(secondFilePath);
  const firstData = parser(getFileData(firstFilePath), firstFileExtname);
  const secondData = parser(getFileData(secondFilePath), secondFileExtname);
  const diffs = makeTree(firstData, secondData);
  const styled = formatter(diffs, format);

  return styled;
};

export default genDiff;
