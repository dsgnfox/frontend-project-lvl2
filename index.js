import _ from 'lodash';
import parser from './src/parsers.js';

const getUniqKeys = (obj1, obj2) => _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);


const makeDiffTree = (key, oldData = {}, newData = {}) => {

  const oldValue = oldData[key];
  const newValue = newData[key];
  const status = getStatus(key, oldData, newData);
  const isNode = _.isObject(oldValue) === false || _.isObject(newValue) === false;

  if (status === 'removed') {
    const uniqKeys = Object.keys(oldValue) ?? [];
    return isNode ? makeNode(key, oldValue, newValue, status) : makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, oldValue)))
  }

  if (status === 'added') {
    const uniqKeys = Object.keys(newValue) ?? [];
    return isNode ? makeNode(key, oldValue, newValue, status) : makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, {}, newValue)))
  }

  if (isNode) {
    return makeNode(key, oldValue, newValue, status);
  }

  const uniqKeys = getUniqKeys(oldValue, newValue) ?? [];

  return makeList(key, status, uniqKeys.map((uniqKey) => makeDiffTree(uniqKey, oldValue, newValue)))

};

const makeNode = (name, oldValue, newValue, status) => {
  return {
    name,
    oldValue,
    newValue,
    status
  }
};

const makeList = (name, status, children = []) => {
  return {
    name,
    status,
    children: [...children]
  }
};

const getStatus = (key, oldFile, newFile) => {

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
  
  return diffs;
};

export default genDiff;
