import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');

const parser = (filePath) => {
    let result = {};

    if (!filePath || !filePath.trim().length === 0) {
        return result;
    }

    const extname = path.extname(filePath);

    if (extname === '.yaml' || extname === '.yml') {
        result = yaml.load(getFileData(filePath));
    } else if (extname === '.json') {
        result = JSON.parse(getFileData(filePath));
    }

    return result;
};

export default parser;