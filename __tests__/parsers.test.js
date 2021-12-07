import { beforeAll, expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const matches = {
  empty: {},
  filled: {
    follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
  },
};

const result = {};

beforeAll(() => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  result.empty = parser();
  result.yaml = parser(getFixturePath('file1.yaml'));
  result.json = parser(getFixturePath('file1.json'));
});

test('empty', () => {
  expect(result.empty).toEqual(matches.empty);
});

test('yaml', () => {
  expect(result.filled).toEqual(matches.yaml);
});

test('json', () => {
  expect(result.filled).toEqual(matches.json);
});
