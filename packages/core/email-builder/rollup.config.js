import { createRollupConfig } from '../../../config/rollup';
import tailwindConfig from './tailwind.config';

const pkg = require('./package.json');
export default createRollupConfig({
  pkg,
  tailwindConfig: { ...tailwindConfig, content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'] },
});
