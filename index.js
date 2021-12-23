import _ from 'lodash';
import parser from './src/parsers.js';
import stylish from './formatter/stylish.js';

const getUniqKeys = (obj1, obj2) => _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);


const makeDiffTree = (key, oldData = {}, newData = {}) => {

  const oldValue = oldData[key];
  const newValue = newData[key];
  const status = getDiffStatus(key, oldData, newData);

  if (status === 'removed') {
    const uniqKeys = Object.keys(oldValue) ?? [];
    return _.isObject(oldValue) === false ? makeNode(key, oldValue, newValue, status) : makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, oldValue)))
  }

  if (status === 'added') {
    const uniqKeys = Object.keys(newValue) ?? [];
    return _.isObject(newValue) === false ? makeNode(key, oldValue, newValue, status) : makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, {}, newValue)))
  }

  if (_.isObject(oldValue) === false || _.isObject(newValue) === false) {
    return makeNode(key, oldValue, newValue, status);
  }

  const uniqKeys = getUniqKeys(oldValue, newValue) ?? [];

  return makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, oldValue, newValue)))

};

const makeNode = (name, oldValue, newValue, status) => {
  return {
    name,
    isNode: true,
    oldValue,
    newValue,
    status,
  }
};

const makeList = (name, status, children = []) => {
  return {
    name,
    status,
    isList: true,
    children: [...children],
  }
};

const getDiffStatus = (key, oldFile, newFile) => {

  const oldValue = oldFile[key];
  const newValue = newFile[key];

    if (oldValue === newValue) {
      return 'unchanged';
    }

    if (_.has(oldFile, key) && _.has(newFile, key)) {
      return 'changed';
    }

    if (_.has(oldFile, key) && _.has(newFile, key) === false) {
      return 'removed';
    }

    if (_.has(oldFile, key) === false && _.has(newFile, key)) {
      return 'added'
    }
}

const genDiff = (oldFilePath, newFilePath) => {
  const oldFile = parser(oldFilePath);
  const newFile = parser(newFilePath);
  const uniqKeys = getUniqKeys(oldFile, newFile) ?? [];
  const diffs = uniqKeys.map((key) => makeDiffTree(key, oldFile, newFile));
  const diffsWithRoot = makeList('root', '', diffs);
  const styled = stylish(diffs);
  
  return styled;
};

export default genDiff;