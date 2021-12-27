import yaml from 'js-yaml';

const parser = (file, extname) => {
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.load(file);
  } if (extname === '.json') {
    return JSON.parse(file);
  }
  throw new Error(`${extname} - неподдерживаемый формат файла`);
};

export default parser;
