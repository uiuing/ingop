package main

import (
    "github.com/uiuing/goplus_installer-online/internal"
    wRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
    "os"
)

// JavaScript State Management ---------------------------------------------------->

func sendStatus(a *App, statusKey string) {
    wRuntime.EventsEmit(a.ctx, "installation-status", statusKey)
}
func sendGoPlusVersion(a *App, message string) {
    wRuntime.EventsEmit(a.ctx, "goplus-version", message)
}

// JavaScript Events Hooks -------------------------------------------------------->

func (a *App) CloseProcess() {
    os.Exit(0)
}
func (a *App) CheckGoEnvironment() (res map[string]interface{}) {
    res = internal.InitResponse()

    defer func() {
        if err := recover(); err != nil {
            res["key"] = "abnormal"
        }
    }()

    _, err := internal.CheckGoEnvironment()
    res = internal.CheckError(err, "errorCheckGoEnvironment")
    return res
}
func (a *App) InstallGoPlus(remoteURL string) (res map[string]interface{}) {
    sendStatus(a, "init")
    res = internal.InitResponse()
    println("[func:InstallGoPlus] remoteURL: " + remoteURL)
    defer func() {
        if err := recover(); err != nil {
            res["key"] = "abnormal"
        }
    }()
    config, _ := internal.InitConfig()

    sendStatus(a, "download")
    err := internal.DownloadReleasePackage(config["rootCatalogue"], config["zipStorageLocation"], remoteURL)
    if err != nil {
        return internal.CheckError(err, "errorDownload")
    }

    config["version"], err = internal.ParseGoPlusVersion(remoteURL)
    if err != nil {
        return internal.CheckError(err, "errorDownload")
    }

    sendStatus(a, "unzip")
    config["versionCatalogue"], err = internal.UnZip(config["rootCatalogue"], config["zipStorageLocation"], config["version"], true)
    if err != nil {
        return internal.CheckError(err, "errorUnzip")
    }

    sendStatus(a, "install")
    err = internal.ExecuteGoPlusScript(config["versionCatalogue"])
    if err != nil {
        return internal.CheckError(err, "errorInstall")
    }

    sendStatus(a, "complete")
    config["currentGoPlusInfo"], err = internal.GetGoPlusInfo(config["versionCatalogue"])
    if err != nil {
        return internal.CheckError(err, "errorCurrentGoPlusInfo")
    }
    sendGoPlusVersion(a, config["currentGoPlusInfo"])

    res["status"] = true
    return res
}
