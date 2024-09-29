
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const CONFIG_FILE_NAME = './assets/config.yml'

export default () => {
  return yaml.load(readFileSync(join(__dirname, CONFIG_FILE_NAME), 'utf8'));
}
