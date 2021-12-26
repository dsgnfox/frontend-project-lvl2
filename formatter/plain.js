import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getStringifyLine = (node, path) => {
  const changedStatus = ['added', 'removed', 'updated'];
  if (!changedStatus.includes(node.status)) {
    return '';
  }
  switch (node.status) {
    case 'removed':
      return `Property '${path}' was removed`;
    case 'updated':
      return `Property '${path}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
    case 'added':
      return `Property '${path}' was added with value: ${getValue(node.newValue)}`;
    default:
      return '';
  }
};

const plain = (data) => {
  const iter = (node, path = '') => {
    const { children } = node;
    const ancestry = path === '' ? node.name : `${path}.${node.name}`;
    if (!children) {
      return getStringifyLine(node, ancestry);
    }
    return children.flatMap((child) => iter(child, ancestry));
  };
  return data.flatMap((node) => iter(node))
    .filter((str) => str !== '')
    .join('\n');
};

export default plain;
