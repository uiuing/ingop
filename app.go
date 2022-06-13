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

func initRequest() map[string]interface{} {
  targetMap := map[string]interface{}{
    "status": false,
    "key":    "",
  }
  return targetMap
}

var errorLogAddress string

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

// CheckGoEnvironment ------------- Hooks: Check if Go is installed --------------------->
func (a *App) CheckGoEnvironment() (req map[string]interface{}) {

  req = initRequest()

  defer func() {
    if err := recover(); err != nil {
      req["key"] = "abnormal"
    }
  }()

  cmd := exec.Command("go", "version")
  out, err := cmd.CombinedOutput()
  req = checkError(err, "errorEnvironment")

  goVersion := strings.Split(string(out), " ")[2][2:]
  goVersions := strings.Split(goVersion[2:], ".")
  if goVersions[0] >= "1" && goVersions[1] >= "16" {
    req["status"] = true
    req["key"] = "success"
  } else {
    req["key"] = "errorVersion"
  }

  return req
}

// <------------------ Hooks: Check if Go is installed ---------------------

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

func unZip(downloadAddress, unzipAddress string) error {

  reader, err := zip.OpenReader(downloadAddress)
  if err != nil {
    return err
  }

  if err := os.MkdirAll(unzipAddress, 0755); err != nil {
    return err
  }

  for _, file := range reader.File {
    path := filepath.Join(unzipAddress, file.Name)
    if file.FileInfo().IsDir() {
      os.MkdirAll(path, file.Mode())
      continue
    }

    fileReader, err := file.Open()
    if err != nil {
      return err
    }
    defer fileReader.Close()

    targetFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
    if err != nil {
      return err
    }
    defer targetFile.Close()

    if _, err := io.Copy(targetFile, fileReader); err != nil {
      return err
    }
  }

  reader.Close()
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

func getInstallerScriptName(osType string) string {
  if osType == "windows" {
    return "all.bat"
  }
  return "all.bash"
}

func installGoPlus(unzipRootAddress, buildScriptName string) error {

  buildScriptAddress := filepath.Join(unzipRootAddress, buildScriptName)

  cmd := exec.Command(buildScriptAddress)
  cmd.Dir = unzipRootAddress
  out, err := cmd.CombinedOutput()
  if err != nil {
    return fmt.Errorf("combined out: %s ; cmd.Run() failed with %s", string(out), err)
  }

  return nil
}

func sendStatus(ctx context.Context, statusKey string) {
  wRuntime.EventsEmit(ctx, "installation-status", statusKey)
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
  req = checkError(err, "errorDownload")

  // unzip release package
  //
  sendStatus(a.ctx, "unzip")
  err = unZip(config["downloadAddress"], config["unzipAddress"])
  req = checkError(err, "errorUnzip")

  // get unzip root address
  //
  sendStatus(a.ctx, "install")
  config["unzipRootAddress"], err = getUnzipRootAddress(config["unzipAddress"])
  req = checkError(err, "errorGetUnzipRootAddress")
  config["installerScriptName"] = getInstallerScriptName(config["osType"])

  // install GoPlus
  //
  err = installGoPlus(config["unzipRootAddress"], config["installerScriptName"])
  req = checkError(err, "errorInstall")

  sendStatus(a.ctx, "complete")

  req["key"] = "errorDownload"
  return req
}

// CloseProcess ------------- Hooks: Close GoPlus installation process ---------------->
func (a *App) CloseProcess() {
  os.Exit(0)
}

// <---------------- Hooks: Close GoPlus installation process ----------------
