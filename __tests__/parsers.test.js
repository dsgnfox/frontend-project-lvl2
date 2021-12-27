import { expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
const formats = ['json', 'yml'];

const result = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: 'too much',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
  group4: {
    default: null,
    foo: 0,
    isNested: false,
    nest: {
      bar: '',
      isNested: true,
    },
    type: 'bas',
  },
};

test.each(formats)('%s', (format) => {
  const expected = parser(getFileData(getFixturePath(`before.${format}`)), `.${format}`);
  expect(expected).toEqual(result);
});
