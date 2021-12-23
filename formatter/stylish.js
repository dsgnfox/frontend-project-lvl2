const getChildren = (tree) => tree?.children;

const getStatus = (tree) => tree?.status;

const getStatusSymbol = (status) => {
  const statuses = 

unchanged
changed
removed
added
};

const getName = (tree) => tree?.name;

const getNewValue = (tree) => tree?.newValue;

const getOldValue = (tree) => tree?.oldValue;

const stylish = (tree) => {

  const iter = (currentValue, depth) => {

    const currentIndent = ' '.repeat(depth);
    const children = getChildren(currentValue);
    const name = getName(currentValue);

    if (currentValue.isNode) {

      const status = getStatus(currentValue);
      const oldValue = getOldValue(currentValue);
      const newValue = getNewValue(currentValue);

      switch (status) {
        case 'unchanged':
          return `${currentIndent}  ${name}: ${oldValue}\n`;
        case 'changed':
          return `${currentIndent}- ${name}: ${oldValue}\n+ ${name}: ${newValue}\n`;
        case 'removed':
          return `${currentIndent}- ${name}: ${oldValue}\n`;
        case 'added':
          return `${currentIndent}+ ${name}: ${newValue}\n`;
        default:
          return false;
      }
    }

    const bracketIndent = ' '.repeat(depth - 1);
    const iterator = children ? children : currentValue;
    const lines = `${currentIndent}${name}: {\n${iterator.flatMap(i => iter(i, depth += 1))}`;

  
    // console.log("lines", lines)
    // const lines = `${name && name}: {${iter(children, depth += 1)}`;
  

    // // console.log('currentValue', currentValue)
    // 
    // const children = getChildren(currentValue);

    // // console.log('name', name)
    // // console.log('children', children)
    // 

    return [
      lines,
      `${bracketIndent}}`,
    ].join('\n');

  };


  return iter(tree, 1);

};

export default stylish;