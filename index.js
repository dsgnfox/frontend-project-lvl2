import _ from 'lodash';
import parser from './src/parsers.js';
import stylish from './formatter/stylish.js';

const getUniqSortedKeys = (obj1, obj2) => _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]).sort();

const makeDiffTree = (oldData = {}, newData = {}) => {
  
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

  const uniqKeys = getUniqSortedKeys(oldData, newData);

  return uniqKeys.map((key) => iter(key, oldData, newData));

};

const makeNode = (name, oldValue, newValue, status) => {
  return {
    name,
    oldValue,
    newValue,
    status,
  }
};

const makeList = (name, status, children = []) => {
  return {
    name,
    status,
    children: [...children],
  }
};

const getDiffStatus = (key, before, after) => {

  if (_.isPlainObject(before[key]) && _.isPlainObject(after[key])) return 'nested';

  if (!_.has(before, key)) return 'added';

  if (!_.has(after, key)) return 'deleted';

  if (!_.isEqual(before[key], after[key])) return 'updated';

  return 'unchanged';
}

const genDiff = (oldFilePath, newFilePath) => {
  const oldFile = parser(oldFilePath);
  const newFile = parser(newFilePath);
  const diffs = makeDiffTree(oldFile, newFile);
  const styled = stylish(diffs);
  
  return styled;
};

export default genDiff;