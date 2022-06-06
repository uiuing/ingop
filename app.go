package main

import (
  "archive/zip"
  "context"
  "fmt"
  "io"
  "net/http"
  "os"
  "os/exec"
  "path/filepath"
  "runtime"
  "strings"
)
import (
  wRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App ------------- Wails: LifeCycle ---------------->
type App struct {
  ctx context.Context
}

func NewApp() *App {
  return &App{}
}

func (a *App) startup(ctx context.Context) {
  a.ctx = ctx
}

// <-------------- Wails: LifeCycle -------------------

func deepCopyMap(originalMap map[string]interface{}) map[string]interface{} {
  targetMap := make(map[string]interface{})
  for key, value := range originalMap {
    targetMap[key] = value
  }
  return targetMap
}

var requestStruct = map[string]interface{}{
  "status":  nil,
  "message": nil,
}

// CheckGoEnvironment ------------- Hooks: Check if Go is installed --------------------->
func (a *App) CheckGoEnvironment() (req map[string]interface{}) {
  req = deepCopyMap(requestStruct)

  _, status := os.LookupEnv("GOROOT")
  req["status"] = status

  if status {
    goVersion := runtime.Version()
    defer func() {
      if err := recover(); err != nil {
        req["status"] = false
        req["message"] = "abnormal"
      }
    }()

    goVersions := strings.Split(goVersion[2:], ".")
    if goVersions[0] >= "1" && goVersions[1] >= "16" {
      req["message"] = "success"
    } else {
      req["message"] = "errorVersion"
    }
  } else {
    req["message"] = "errorEnvironment"
  }

  return req
}

// <------------------ Hooks: Check if Go is installed ---------------------

func checkError(err error, errorLogsPath string) {
  if err != nil {
    if _, e := os.Stat(errorLogsPath); os.IsNotExist(e) {
      os.Create(errorLogsPath)
    }
    errorLogs, _ := os.OpenFile(errorLogsPath, os.O_APPEND|os.O_WRONLY, 0644)
    errorLogs.WriteString(err.Error())
    defer errorLogs.Close()
  }
}

/* ------------------------------------------------------------------------------------------------->
Installation configuration for different clients
Required parameters: osType, rootAddress, decompressionAddress, storageAddress, errorLogs
Follow the installationFor[More] method to add more clients
*/
var osTypeData = map[string]map[string]string{
  "windows": {
    "osType":               "windows",
    "rootAddress":          "C:/ProgramData/GoPlus",
    "decompressionAddress": "C:/ProgramData/GoPlus/gop",
    "storageAddress":       "C:/ProgramData/GoPlus/gop.zip",
    "errorLogs":            "C:/ProgramData/GoPlus/gop/errorLogs.log",
    "environmentAddress":   "C:/ProgramData/GoPlus/gop/environmentVariableConfiguration.bat",
  },
}

// <-------------------------------------------------------------------------------------------------

func getSystemConfig() map[string]string {
  osType := runtime.GOOS

  if _, ok := osTypeData[osType]; ok {
    return osTypeData[osType]
  }
  return nil
}

func downloadReleasePackage(rootAddress, storageAddress, remoteAddress string) error {
  if _, err := os.Stat(rootAddress); os.IsNotExist(err) {
    os.Mkdir(rootAddress, 0777)
  } else {
    os.RemoveAll(rootAddress)
    os.Mkdir(rootAddress, 0777)
  }

  out, err := os.Create(storageAddress + ".tmp")
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

  err = os.Rename(storageAddress+".tmp", storageAddress)
  if err != nil {
    return err
  }

  return nil
}

func unZip(storageAddress, decompressionAddress string) error {
  reader, err := zip.OpenReader(storageAddress)
  if err != nil {
    return err
  }

  if err := os.MkdirAll(decompressionAddress, 0755); err != nil {
    return err
  }

  for _, file := range reader.File {
    path := filepath.Join(decompressionAddress, file.Name)
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
  err = os.Remove(storageAddress)
  if err != nil {
    return err
  }

  return nil
}

func removeDuplicateStr(strSlice []string) []string {
  allKeys := make(map[string]bool)
  var list []string
  for _, item := range strSlice {
    if _, value := allKeys[item]; !value {
      allKeys[item] = true
      if item != "%%GOPROOT%%\\bin" {
        list = append(list, item)
      }
    }
  }

  return list
}

func installationForWindows(decompressionAddress, environmentAddress string) error {
  dirs, err := filepath.Glob(decompressionAddress + "/*")
  var dir string
  for _, path := range dirs {
    if info, err := os.Stat(path); err == nil && info.IsDir() {
      dir = path
      break
    }
  }
  if dir == "" {
    return fmt.Errorf("can't find the installation directory")
  }
  if err != nil {
    return err
  }

  cmd := exec.Command(dir + "\\all.bat")
  cmd.Dir = dir
  err = cmd.Run()
  if err != nil {
    return err
  }

  Paths := removeDuplicateStr(strings.Split(os.Getenv("PATH"), ";"))
  Paths = append(Paths, "%%GOPROOT%%\\bin")
  Path := strings.Join(Paths, ";")

  batFile, err := os.Create(environmentAddress)
  if err != nil {
    return err
  }
  gopEnv := "setx GOPROOT " + dir
  gopPathEnv := "reg add HKEY_CURRENT_USER\\Environment /v path /t REG_EXPAND_SZ /d \"" + Path + "\" /f"
  _, err = batFile.WriteString(gopEnv + " & " + gopPathEnv)
  batFile.Close()
  if err != nil {
    return err
  }

  environmentAddress = strings.ReplaceAll(environmentAddress, "/", "\\")
  err = exec.Command(environmentAddress).Run()
  if err != nil {
    return err
  }

  err = os.Remove(environmentAddress)
  if err != nil {
    return err
  }
  return nil
}

/* ------------------------------------------------------------------------------------------------->
    Different installation commands for each type of client
   - The GoPlus all.* installation script was executed here
   - Added separate environment variables
   To be added mac or linux ?
*/
func startInstall(config map[string]string) error {
  if config["osType"] == "windows" {
    err := installationForWindows(config["decompressionAddress"], config["environmentAddress"])
    if err != nil {
      return err
    }
  }
  return nil
}

// <-------------------------------------------------------------------------------------------------

// StartInstallation ------------- Hooks: Start GoPlus installation ---------------->
func (a *App) StartInstallation(remoteAddress string) (req map[string]interface{}) {
  req = deepCopyMap(requestStruct)
  req["status"] = false

  config := getSystemConfig()
  if config != nil {
    wRuntime.EventsEmit(a.ctx, "InstallationProgress", "Downloading...")
    err := downloadReleasePackage(config["rootAddress"], config["storageAddress"], remoteAddress)
    checkError(err, config["errorLogs"])

    wRuntime.EventsEmit(a.ctx, "InstallationProgress", "Decompressing...")
    err = unZip(config["storageAddress"], config["decompressionAddress"])
    checkError(err, config["errorLogs"])

    wRuntime.EventsEmit(a.ctx, "InstallationProgress", "Installing...")
    err = startInstall(config)
    checkError(err, config["errorLogs"])

    wRuntime.EventsEmit(a.ctx, "InstallationProgress", "Installation complete")
  }

  req["status"] = true
  return req
}

// <---------------- Hooks: Start GoPlus installation ----------------
