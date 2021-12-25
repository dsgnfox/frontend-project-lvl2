/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);

const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

let resultStylish;

beforeAll(() => {
  resultStylish = readFile('resultStylish.txt');
});

test('findDifferencesJSON', () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileJSON = getFixturePath('after.json');

  const differenceStylish = gendiff(beforeFileJSON, afterFileJSON);
  expect(differenceStylish).toEqual(resultStylish);
});
test('findDifferencesYAML', () => {
  const beforeFileJSON = getFixturePath('before.json');
  const afterFileYAML = getFixturePath('after.yaml');

  const differenceStylish = gendiff(beforeFileJSON, afterFileYAML);
  expect(differenceStylish).toEqual(resultStylish);
});
