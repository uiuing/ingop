const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { rootPath } = require("./config");

const existsRoot = () => {
  if (!fs.existsSync(rootPath)) {
    return false;
  }
  const testFile = path.join(rootPath, "test");
  if (fs.existsSync(testFile)) {
    fs.rmdirSync(testFile);
    if (fs.existsSync(testFile)) {
      return false;
    }
    return true;
  }
  try {
    fs.mkdirSync(testFile);
  } catch (e) {
    return false;
  }
  fs.rmdirSync(testFile);

  return true;
};

const checkEnvVersion = (cmd) => {
  let outVersion;
  try {
    outVersion = execSync(`${cmd} version`).toString("utf8");
  } catch (e) {
    return false;
  }
  try {
    const reg = /[0-9]+\.[0-9]+\.[0-9]+/;
    if (!reg.test(outVersion)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return outVersion;
};

const checkVersion = (cmd, newVersion) => {
  const nowVersion = checkEnvVersion(cmd);
  const nowVersionArr = nowVersion.split(".");
  const newVersionArr = newVersion.split(".");
  return (
    nowVersionArr[0] === newVersionArr[0] &&
    nowVersionArr[1] === newVersionArr[1] &&
    nowVersionArr[2] === newVersionArr[2]
  );
};

const existsEnv = {
  go(version) {
    return checkVersion("go", version);
  },
  gop(version) {
    return checkVersion("gop", version);
  },
};

module.exports = {
  existsRoot,
  existsEnv,
};
