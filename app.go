package main

import (
  "context"
  "runtime"
  "os"
  "strings"
// 	"github.com/wailsapp/wails/v2/pkg/runtime"
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

func checkSystemType() string {
  return runtime.GOOS
}

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