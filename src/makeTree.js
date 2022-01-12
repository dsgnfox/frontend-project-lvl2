import _ from 'lodash';

const getUniqSortedKeys = (a, b) => _.sortBy(_.uniq([...Object.keys(a), ...Object.keys(b)]));

const makeTree = (firstState = {}, secondState = {}) => {
  const iter = (key, firstData, secondData) => {
    if (_.isPlainObject(firstData[key]) && _.isPlainObject(secondData[key])) {
      const uniqKeys = getUniqSortedKeys(firstData[key], secondData[key]);
      return {
        name: key,
        status: 'nested',
        children: [...uniqKeys.map((uniqKey) => iter(uniqKey, firstData[key], secondData[key]))],
      };
    }

    if (!_.has(firstData, key)) {
      return {
        name: key,
        status: 'added',
        newValue: secondData[key],
      };
    }

    if (!_.has(secondData, key)) {
      return {
        name: key,
        status: 'removed',
        oldValue: firstData[key],
      };
    }

    if (!_.isEqual(firstData[key], secondData[key])) {
      return {
        name: key,
        status: 'updated',
        oldValue: firstData[key],
        newValue: secondData[key],
      };
    }

    return {
      name: key,
      status: 'unchanged',
      oldValue: firstData[key],
      newValue: secondData[key],
    };
  };

  const uniqKeys = getUniqSortedKeys(firstState, secondState);

  return {
    name: 'root',
    status: '',
    children: [...uniqKeys.map((uniqKey) => iter(uniqKey, firstState, secondState))],
  };
};

export default makeTree;
