import _ from 'lodash';

const getUniqSortedKeys = (a, b) => _.sortBy(_.uniq([...Object.keys(a), ...Object.keys(b)]));

const makeNode = (name, oldValue, newValue, status) => ({
  name, oldValue, newValue, status,
});

const makeList = (name, status, children = []) => ({
  name,
  status,
  children: [...children],
});

const makeTree = (oldState = {}, newState = {}) => {
  const iter = (key, oldData, newData) => {
    if (_.isPlainObject(oldData[key]) && _.isPlainObject(newData[key])) {
      const uniqKeys = getUniqSortedKeys(oldData[key], newData[key]);
      return makeList(key, 'nested', uniqKeys.map((uniqKey) => iter(uniqKey, oldData[key], newData[key])));
    }

    if (!_.has(oldData, key)) {
      return makeNode(key, oldData[key], newData[key], 'added');
    }

    if (!_.has(newData, key)) {
      return makeNode(key, oldData[key], newData[key], 'removed');
    }

    if (!_.isEqual(oldData[key], newData[key])) {
      return makeNode(key, oldData[key], newData[key], 'updated');
    }

    return makeNode(key, oldData[key], newData[key], 'unchanged');
  };

  const uniqKeys = getUniqSortedKeys(oldState, newState);

  return makeList('root', '', uniqKeys.map((key) => iter(key, oldState, newState)));
};

export default makeTree;
