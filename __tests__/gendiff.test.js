import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

const formats = ['json', 'yml'];
const formatters = ['stylish', 'plain', 'json'];

const result = {
  stylish: readFile('resultStylish.txt'),
  plain: readFile('resultPlain.txt'),
  json: readFile('resultJson.txt'),
};

test.each(formats)('%s', (format) => {
  const beforeFile = getFixturePath(`before.${format}`);
  const afterFile = getFixturePath(`after.${format}`);

  formatters.forEach((formatter) => {
    const diff = gendiff(beforeFile, afterFile, formatter);
    expect(diff).toEqual(result[formatter]);
  });
});
