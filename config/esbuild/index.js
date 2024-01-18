const esbuild = require('esbuild');
const path = require('path');

class ESBuild {
  static get projectPath() {
    return process.cwd();
  }

  static cjs(options = {}) {
    const { projectPath } = this;
  }
}