import { createRollupConfig } from '../../config/rollup';
console.log('prcoess', process.__dirname);

const pkg = require('./package.json');
export default createRollupConfig({ pkg });
