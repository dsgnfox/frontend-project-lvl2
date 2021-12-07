import _ from 'lodash';
import parser from './src/parsers.js';

const getUniqKeys = (obj1, obj2) => _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

const genDiff = (oldFilePath, newFilePath) => {
  const oldFile = parser(oldFilePath);
  const newFile = parser(newFilePath);
  const uniqKeys = getUniqKeys(oldFile, newFile) ?? [];
  const diffs = [];

  uniqKeys.forEach((key) => {
    const oldValue = oldFile[key];
    const newValue = newFile[key];

    // unchange
    if (oldValue === newValue) {
      diffs.push(['   ', `${key}:`, oldValue]);
      return;
    }

    // change
    if (_.has(oldFile, key) && _.has(newFile, key)) {
      diffs.push(['  -', `${key}:`, oldValue]);
      diffs.push(['  +', `${key}:`, newValue]);
      return;
    }

    // remove
    if (_.has(oldFile, key) && _.has(newFile, key) === false) {
      diffs.push(['  -', `${key}:`, oldValue]);
    }

    // added
    if (_.has(oldFile, key) === false && _.has(newFile, key)) {
      diffs.push(['  +', `${key}:`, newValue]);
    }
  });

  const result = diffs
    .sort((a, b) => {
      if (a[1] === b[1]) {
        return 0;
      }
      return a[1] > b[1] ? 1 : -1;
    })
    .map((i) => i.join(' '))
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
