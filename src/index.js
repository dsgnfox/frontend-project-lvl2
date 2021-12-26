import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatter/index.js';

const getUniqSortedKeys = (a, b) => _.uniq([...Object.keys(a), ...Object.keys(b)]).sort();

const makeNode = (name, oldValue, newValue, status) => ({
  name, oldValue, newValue, status,
});

const makeList = (name, status, children = []) => ({
  name,
  status,
  children: [...children],
});

const getDiffStatus = (key, before, after) => {
  if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) return 'nested';

  if (!_.has(before, key)) return 'added';

  if (!_.has(after, key)) return 'removed';

  if (!_.isEqual(before[key], after[key])) return 'updated';

  return 'unchanged';
};

const makeDiffTree = (oldState = {}, newState = {}) => {
  const iter = (key, oldData, newData) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    const status = getDiffStatus(key, oldData, newData);
    const isNode = _.isObject(oldValue) === false || _.isObject(newValue) === false;

    if (isNode) {
      return makeNode(key, oldValue, newValue, status);
    }

    const uniqKeys = getUniqSortedKeys(oldValue, newValue);
    return makeList(key, status, uniqKeys.map((uniqKey) => iter(uniqKey, oldValue, newValue)));
  };

  const uniqKeys = getUniqSortedKeys(oldState, newState);

  return uniqKeys.map((key) => iter(key, oldState, newState));
};

const genDiff = (oldFilePath, newFilePath, format) => {
  const oldFile = parser(oldFilePath);
  const newFile = parser(newFilePath);
  const diffs = makeDiffTree(oldFile, newFile);
  const styled = formatter(diffs, format);

  return styled;
};

export default genDiff;
