import _ from 'lodash';

const indent = ' '.repeat(4);

const getIndent = (count) => indent.repeat(count);

const getStringifyTree = (lines, spaces) => (
  [
    '{',
    ...lines,
    `${spaces}}`,
  ].join('\n')
);

const getValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      const preparedValue = getValue(value, depth + 1);
      return `${getIndent(depth)}${indent}${key}: ${preparedValue}`;
    });
  return getStringifyTree(lines, getIndent(depth));
};

const getStringifyLine = (depth, sign, key, value) => ` ${getIndent(depth)} ${sign} ${key}: ${getValue(value, depth + 1)}`;

const mapping = {
  added: (depth, { name, newValue }) => getStringifyLine(depth, '+', name, newValue),
  removed: (depth, { name, oldValue }) => getStringifyLine(depth, '-', name, oldValue),
  unchanged: (depth, { name, oldValue }) => getStringifyLine(depth, ' ', name, oldValue),
  updated: (depth, { name, oldValue, newValue }) => [getStringifyLine(depth, '-', name, oldValue), getStringifyLine(depth, '+', name, newValue)],
  nested: (depth, { name, children }, iter) => getStringifyLine(depth, ' ', name, iter(children, depth + 1)),
};

const stylish = (data) => {
  const rootChildren = data.children;
  const iter = (tree, depth) => {
    const lines = tree.flatMap((node) => mapping[node.status](depth, node, iter));
    return getStringifyTree(lines, getIndent(depth));
  };
  return iter(rootChildren, 0);
};

export default stylish;
