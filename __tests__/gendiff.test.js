import { beforeAll, expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const matches = {
  emptyToEmpty: '{}',
  emptyToFile1: '{+follow:false+host:hexlet.io+proxy:123.234.53.22+timeout:50}',
  file1ToEmpty: '{-follow:false-host:hexlet.io-proxy:123.234.53.22-timeout:50}',
  file1ToFile2: '{-follow:falsehost:hexlet.io-proxy:123.234.53.22-timeout:50+timeout:20+verbose:true}',
  file1ToFile1: '{follow:falsehost:hexlet.ioproxy:123.234.53.22timeout:50}',
};

const diff = {};

beforeAll(() => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const emptyFilePath = getFixturePath('empty.json');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  diff.emptyToEmpty = genDiff(emptyFilePath, emptyFilePath).replace(/\s/g, '');
  diff.emptyToFile1 = genDiff(emptyFilePath, file1Path).replace(/\s/g, '');
  diff.file1ToEmpty = genDiff(file1Path, emptyFilePath).replace(/\s/g, '');
  diff.file1ToFile2 = genDiff(file1Path, file2Path).replace(/\s/g, '');
  diff.file1ToFile1 = genDiff(file1Path, file1Path).replace(/\s/g, '');
});

test('empty to empty', () => {
  expect(diff.emptyToEmpty).toBe(matches.emptyToEmpty);
});

test('empty to file1', () => {
  expect(diff.emptyToFile1).toBe(matches.emptyToFile1);
});

test('file1 to empty', () => {
  expect(diff.file1ToEmpty).toBe(matches.file1ToEmpty);
});

test('file1 to file2', () => {
  expect(diff.file1ToFile2).toBe(matches.file1ToFile2);
});

test('file1 to file1', () => {
  expect(diff.file1ToFile1).toBe(matches.file1ToFile1);
});
