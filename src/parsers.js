import yaml from 'js-yaml';

const parser = (file, extname) => {
  switch (extname) {
    case '.yaml':
      return yaml.load(file);
    case '.yml':
      return yaml.load(file);
    case '.json':
      return JSON.parse(file);
    default:
      throw new Error(`${extname} - неподдерживаемый формат файла`);
  }
};

export default parser;
