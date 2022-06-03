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

func checkSystemType() string {
  return runtime.GOOS
}

func (a *App) CheckGoEnvironment() map[string]interface{} {
  request := make(map[string]interface{})

  _, status := os.LookupEnv("GOROOT")
  request["status"] = status

  if status {
    goVersion := runtime.Version()
    goVersions := strings.Split(goVersion[2:], ".")
    if goVersions[0] >= "1" && goVersions[1] >= "16" {
      request["message"] = "success"
    } else {
      request["message"] = "errorVersion"
    }
  } else {
    request["message"] = "errorEnvironment"
  }

  return request
}