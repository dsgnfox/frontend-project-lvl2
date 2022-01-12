import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getStringifyLine = (node, path) => {
  switch (node.status) {
    case 'removed':
      return `Property '${path.join('.')}' was removed`;
    case 'updated':
      return `Property '${path.join('.')}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
    case 'added':
      return `Property '${path.join('.')}' was added with value: ${stringify(node.newValue)}`;
    default:
      return '';
  }
};

const plain = (data) => {
  const rootChildren = data.children;
  const iter = (node, path = []) => {
    const { children } = node;
    const ancestry = path.length === 0 ? [node.name] : [...path, node.name];
    switch (node.status) {
      case 'nested':
        return children.flatMap((child) => iter(child, ancestry));
      default:
        return getStringifyLine(node, ancestry);
    }
  };
  return rootChildren.flatMap((node) => iter(node))
    .filter((str) => str !== '')
    .join('\n');
};

export default plain;
