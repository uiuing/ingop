const Path = require("path");

const IS_WIN = process.platform === "win32";

const ROOT_PATH = {
  win32: "C:/Program Files/GoPlus",
  unix: "/usr/local/goplus",
};

const USER_NAME = process.env.USER || process.env.USERNAME;

// --------------------------------------------------------------------------------------------------------------------

const rootPath = (() => {
  const key = IS_WIN ? "win32" : "unix";
  return ROOT_PATH[key];
})();

const authorizationCommand = (() => {
  if (IS_WIN) {
    return `icacls "${ROOT_PATH.win32}" /grant ${USER_NAME}:(OI)(CI)(F) /T`;
  }
  return `chown -R ${USER_NAME} ${ROOT_PATH.unix}`;
})();

const envGoPath = {
  dir: Path.join(rootPath, "env", "go"),
  bin: Path.join(rootPath, "env", "go", "bin"),
};

const gopPath = {
  dir: Path.join(rootPath, "gop"),
  bin: Path.join(rootPath, "gop", "bin"),
};

const releases = {
  remote: {
    go(goReleasesJSON) {
      const { go } = goReleasesJSON;
      return go[process.platform][process.arch];
    },
    gop(gopReleasesJSON) {
      const { gop } = gopReleasesJSON;
      return gop[process.platform][process.arch];
    },
  },
  version: {
    go(goReleasesJSON) {
      const { go } = goReleasesJSON;
      return go.version;
    },
    gop(gopReleasesJSON) {
      const { gop } = gopReleasesJSON;
      return gop.version;
    },
  },
};

// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  rootPath,
  authorizationCommand,
  envGoPath,
  gopPath,
  releases,
};
