import { beforeAll, expect, test } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const matches = {
  empty: {},
  filled: {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
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
  },
};

const result = {};

beforeAll(() => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  result.json = parser(getFixturePath('before.json'));
  result.yaml = parser(getFixturePath('before.yaml'));
});

test('yaml', () => {
  expect(result.yaml).toEqual(matches.filled);
});

test('json', () => {
  expect(result.json).toEqual(matches.filled);
});
