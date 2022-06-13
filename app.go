package main

import (
  "archive/zip"
  "context"
  "fmt"
  wRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
  "io"
  "net/http"
  "os"
  "os/exec"
  "path/filepath"
  "runtime"
  "strings"
  "time"
)

type App struct {
  ctx context.Context
}

func NewApp() *App {
  return &App{}
}

func (a *App) startup(ctx context.Context) {
  a.ctx = ctx
}

var errorLogAddress string

func initRequest() map[string]interface{} {
  targetMap := map[string]interface{}{
    "status": false,
    "key":    "",
  }
  return targetMap
}

func initDirConfig() map[string]string {

  config := map[string]string{}

  homeDir, _ := os.UserHomeDir()

  config["osType"] = runtime.GOOS
  config["rootAddress"] = filepath.Join(homeDir, "GoPlus")
  config["downloadAddress"] = filepath.Join(config["rootAddress"], "gop.zip")
  config["unzipAddress"] = filepath.Join(config["rootAddress"], "gop")
  config["errorLogAddress"] = filepath.Join(config["rootAddress"], "InstallErrorLogs.log")
  errorLogAddress = config["errorLogAddress"]

  return config
}

func checkError(err error, errKey string) map[string]interface{} {
  req := initRequest()

  if err != nil {
    errorLogFile, _ := os.OpenFile(errorLogAddress, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    defer errorLogFile.Close()

    t := time.Now()
    errorLogFile.WriteString(t.String() + ":  Error: " + errKey + "; " + err.Error() + "\n")

    req["key"] = errKey
    return req
  }
  req["status"] = true
  return req
}

// Check the environment of go ---------------------------------------------------->
func getCheckGoEnvScriptConfig(osType string) map[string]string {
  if osType == "windows" {
    return map[string]string{
      "name":    "CheckGoEnvironment.bat",
      "content": `go version`,
    }
  }
  return map[string]string{
    "name": "CheckGoEnvironment.bash",
    "content": `#! /usr/bin/env bash
source /etc/profile
go version`,
  }
}

func makeScript(scriptConfig map[string]string, rootAddress string) (string, error) {

  scriptName := scriptConfig["name"]
  scriptContent := scriptConfig["content"]

  scriptAddress := filepath.Join(rootAddress, scriptName)
  if _, err := os.Stat(scriptAddress); err == nil {
    os.Remove(scriptAddress)
  }

  scriptFile, err := os.Create(scriptAddress)
  if err != nil {
    return "", err
  }
  defer scriptFile.Close()

  scriptFile.WriteString(scriptContent)
  scriptFile.Chmod(0777)

  return filepath.Join(rootAddress, scriptName), nil
}

func compileCheckGoEnvScript(scriptAddress string) (string, error) {
  cmd := exec.Command(scriptAddress)
  out, err := cmd.CombinedOutput()

  if err != nil {
    return string(out), err
  }
  return string(out), nil
}

func checkGoVersion(goVersion string) bool {

  versionNumber := strings.Split(goVersion, " ")[2][2:]

  goVersions := strings.Split(versionNumber, ".")
  if goVersions[0] >= "1" && goVersions[1] >= "16" {
    return true
  }

  return false
}

// CheckGoEnvironment ------------- Hooks: Check if Go is installed --------------------->
func (a *App) CheckGoEnvironment() (req map[string]interface{}) {

  req = initRequest()

  defer func() {
    if err := recover(); err != nil {
      req["key"] = "abnormal"
    }
  }()

  config := initDirConfig()
  scriptAddress, _ := makeScript(getCheckGoEnvScriptConfig(config["ostype"]), config["rootAddress"])
  goVersion, _ := compileCheckGoEnvScript(scriptAddress)

  errorLogFile, _ := os.OpenFile("/Users/uiu/GoPlus/log.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
  defer errorLogFile.Close()

  t := time.Now()
  errorLogFile.WriteString(t.String() + ": " + goVersion + "\n")

  isGo := checkGoVersion(goVersion)

  if isGo {
    req["status"] = true
    req["key"] = "success"
  } else {
    req["key"] = "errorVersion"
  }

  return req
}

// <------------------ Hooks: Check if Go is installed ---------------------

// Online install GoPlus --------------------------------------------------------------------->
func getInstallGoPlusScriptConfig(osType string) map[string]string {
  if osType == "windows" {
    return map[string]string{
      "name":    "InstallGoPlus.bat",
      "content": `go run cmd/make.go --install --autoproxy`,
    }
  }
  return map[string]string{
    "name": "InstallGoPlus.bash",
    "content": `#! /usr/bin/env bash
source /etc/profile
go run cmd/make.go --install --autoproxy`,
  }
}

func downloadReleasePackage(rootAddress, downloadAddress, remoteAddress string) error {

  if _, err := os.Stat(rootAddress); err == nil {
    os.Remove(rootAddress)
  }
  os.Mkdir(rootAddress, 0777)

  out, err := os.Create(downloadAddress + ".tmp")
  if err != nil {
    return err
  }
  defer out.Close()

  resp, err := http.Get(remoteAddress)
  if err != nil {
    return err
  }
  defer resp.Body.Close()

  if resp.StatusCode != http.StatusOK {
    return fmt.Errorf("bad status: %s", resp.Status)
  }

  _, err = io.Copy(out, resp.Body)
  if err != nil {
    return err
  }

  err = os.Rename(downloadAddress+".tmp", downloadAddress)
  if err != nil {
    return err
  }

  return nil
}

func unZip(downloadAddress string, unzipAddress string) error {

  r, err := zip.OpenReader(downloadAddress)

  if err != nil {
    return err
  }

  defer r.Close()

  for _, f := range r.File {
    path := filepath.Join(unzipAddress, f.Name)
    if f.FileInfo().IsDir() {
      os.MkdirAll(path, os.ModePerm)
      continue
    }

    if err = os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
      return err
    }

    outFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
    if err != nil {
      return err
    }

    rc, err := f.Open()
    if err != nil {
      return err
    }
    _, err = io.Copy(outFile, rc)

    outFile.Close()
    rc.Close()
    if err != nil {
      return err
    }
  }

  err = os.Remove(downloadAddress)
  if err != nil {
    return err
  }

  return nil
}

func getUnzipRootAddress(unzipAddress string) (string, error) {

  dirs, err := filepath.Glob(unzipAddress + "/*")

  var dir string
  for _, path := range dirs {
    if info, err := os.Stat(path); err == nil && info.IsDir() {
      dir = path
      break
    }
  }
  if dir == "" {
    return "", fmt.Errorf("can't find the installation directory")
  }
  if err != nil {
    return "", err
  }

  return dir, nil
}

func installGoPlus(osType, unzipRootAddress string) error {

  scriptAddress, err := makeScript(getInstallGoPlusScriptConfig(osType), unzipRootAddress)
  if err != nil {
    return err
  }

  cmd := exec.Command(scriptAddress)
  cmd.Dir = unzipRootAddress
  out, err := cmd.CombinedOutput()
  if err != nil {
    return fmt.Errorf("combined out: %s ; cmd.Run() failed with %s", string(out), err)
  }

  return nil
}

func getGoPlusVersion(unzipRootAddress string) (string, error) {
  cmd := exec.Command("gop", "version")
  cmd.Dir = filepath.Join(unzipRootAddress, "bin")
  out, err := cmd.CombinedOutput()
  if err != nil {
    return "", err
  }

  return string(out), nil
}

func sendStatus(ctx context.Context, statusKey string) {
  wRuntime.EventsEmit(ctx, "installation-status", statusKey)
}
func sendGoPlusVersion(ctx context.Context, message string) {
  wRuntime.EventsEmit(ctx, "goplus-version", message)
}

// StartInstall ------------- Hooks: Start GoPlus installation ---------------->
func (a *App) StartInstall(remoteAddress string) (req map[string]interface{}) {

  sendStatus(a.ctx, "init")

  req = initRequest()

  // init dir config
  //
  config := initDirConfig()

  defer func() {
    if err := recover(); err != nil {
      req["status"] = false
      req["key"] = "abnormal"
    }
  }()

  // download release package
  //
  sendStatus(a.ctx, "download")
  err := downloadReleasePackage(config["rootAddress"], config["downloadAddress"], remoteAddress)
  if err != nil {
    return checkError(err, "errorDownload")
  }

  // unzip release package
  //
  sendStatus(a.ctx, "unzip")
  err = unZip(config["downloadAddress"], config["unzipAddress"])
  if err != nil {
    return checkError(err, "errorUnzip")
  }

  // get unzip root address
  //
  sendStatus(a.ctx, "install")
  config["unzipRootAddress"], err = getUnzipRootAddress(config["unzipAddress"])
  if err != nil {
    return checkError(err, "errorGetUnzipRootAddress")
  }

  // install GoPlus
  //
  err = installGoPlus(config["osType"], config["unzipRootAddress"])
  if err != nil {
    return checkError(err, "errorInstall")
  }
  sendStatus(a.ctx, "complete")

  message, err := getGoPlusVersion(config["unzipRootAddress"])
  if err != nil {
    return checkError(err, "errorGetGoPlusVersion")
  }

  sendGoPlusVersion(a.ctx, message)

  req["status"] = true
  return req
}

// CloseProcess ------------- Hooks: Close GoPlus installation process ---------------->
func (a *App) CloseProcess() {
  os.Exit(0)
}

// <---------------- Hooks: Close GoPlus installation process ----------------
