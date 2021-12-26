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

const formatters = ['stylish', 'plain', 'json'];

test('findDifferencesJSON', () => {
  const result = {
    stylish: readFile('resultStylish.txt'),
    plain: readFile('resultPlain.txt'),
    json: '[{"name":"common","status":"nested","children":[{"name":"follow","newValue":false,"status":"added"},{"name":"setting1","oldValue":"Value 1","newValue":"Value 1","status":"unchanged"},{"name":"setting2","oldValue":200,"status":"removed"},{"name":"setting3","oldValue":true,"newValue":{"key":"value"},"status":"updated"},{"name":"setting4","newValue":"blah blah","status":"added"},{"name":"setting5","newValue":{"key5":"value5"},"status":"added"},{"name":"setting6","status":"nested","children":[{"name":"doge","status":"nested","children":[{"name":"wow","oldValue":"too much","newValue":"so much","status":"updated"}]},{"name":"key","oldValue":"value","newValue":"value","status":"unchanged"},{"name":"ops","newValue":"vops","status":"added"}]}]},{"name":"group1","status":"nested","children":[{"name":"baz","oldValue":"bas","newValue":"bars","status":"updated"},{"name":"foo","oldValue":"bar","newValue":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","status":"updated"}]},{"name":"group2","oldValue":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name":"group3","newValue":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"},{"name":"group4","status":"nested","children":[{"name":"default","oldValue":null,"newValue":"","status":"updated"},{"name":"foo","oldValue":0,"newValue":null,"status":"updated"},{"name":"isNested","oldValue":false,"newValue":"none","status":"updated"},{"name":"key","newValue":false,"status":"added"},{"name":"nest","status":"nested","children":[{"name":"bar","oldValue":"","newValue":0,"status":"updated"},{"name":"isNested","oldValue":true,"status":"removed"}]},{"name":"someKey","newValue":true,"status":"added"},{"name":"type","oldValue":"bas","newValue":"bar","status":"updated"}]}]',
  };

  const beforeFileJSON = getFixturePath('before.json');
  const afterFileJSON = getFixturePath('after.json');

  formatters.forEach((formatter) => {
    const diff = gendiff(beforeFileJSON, afterFileJSON, formatter);
    expect(diff).toEqual(result[formatter]);
  });
});

test('findDifferencesYAML', () => {
  const result = {
    stylish: readFile('resultStylish.txt'),
    plain: readFile('resultPlain.txt'),
    json: '[{"name":"common","status":"nested","children":[{"name":"follow","newValue":false,"status":"added"},{"name":"setting1","oldValue":"Value 1","newValue":"Value 1","status":"unchanged"},{"name":"setting2","oldValue":200,"status":"removed"},{"name":"setting3","oldValue":true,"newValue":{"key":"value"},"status":"updated"},{"name":"setting4","newValue":"blah blah","status":"added"},{"name":"setting5","newValue":{"key5":"value5"},"status":"added"},{"name":"setting6","status":"nested","children":[{"name":"doge","status":"nested","children":[{"name":"wow","oldValue":"too much","newValue":"so much","status":"updated"}]},{"name":"key","oldValue":"value","newValue":"value","status":"unchanged"},{"name":"ops","newValue":"vops","status":"added"}]}]},{"name":"group1","status":"nested","children":[{"name":"baz","oldValue":"bas","newValue":"bars","status":"updated"},{"name":"foo","oldValue":"bar","newValue":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","status":"updated"}]},{"name":"group2","oldValue":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name":"group3","newValue":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"},{"name":"group4","status":"nested","children":[{"name":"default","oldValue":null,"newValue":"","status":"updated"},{"name":"foo","oldValue":0,"newValue":null,"status":"updated"},{"name":"isNested","oldValue":false,"newValue":"none","status":"updated"},{"name":"key","newValue":false,"status":"added"},{"name":"nest","status":"nested","children":[{"name":"bar","oldValue":"","newValue":0,"status":"updated"},{"name":"isNested","oldValue":true,"status":"removed"}]},{"name":"someKey","newValue":true,"status":"added"},{"name":"type","oldValue":"bas","newValue":"bar","status":"updated"}]}]',
  };

  const beforeFileYML = getFixturePath('before.yml');
  const afterFileYML = getFixturePath('after.yml');

  formatters.forEach((formatter) => {
    const diff = gendiff(beforeFileYML, afterFileYML, formatter);
    expect(diff).toEqual(result[formatter]);
  });
});
