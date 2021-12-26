/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

const formatters = ['stylish', 'plain'];
const result = {};
const files = {};

beforeAll(() => {
  result.stylish = readFile('resultStylish.txt');
  result.plain = readFile('resultPlain.txt');

  files.beforeFileJSON = getFixturePath('before.json');
  files.afterFileJSON = getFixturePath('after.json');
  files.beforeFileJSON = getFixturePath('before.json');
  files.afterFileYAML = getFixturePath('after.yaml');
});

test('findDifferencesJSON', () => {
  formatters.forEach((formatter) => {
    const diff = gendiff(files.beforeFileJSON, files.afterFileJSON, formatter);
    expect(diff).toEqual(result[formatter]);
  });
});

test('findDifferencesYAML', () => {
  formatters.forEach((formatter) => {
    const diff = gendiff(files.beforeFileJSON, files.afterFileYAML, formatter);
    expect(diff).toEqual(result[formatter]);
  });
});
