package internal

import (
    "os"
    "path/filepath"
    "runtime"
)

/*
   CONFIG_ANNOTATION := map[string]string{
    // Fixed ---------------------------------------------------------------------------------------------------------------------
        "rootCatalogue":                "GoPlus at the root of the user directory",
        "zipStorageLocation":           "Location of the zip file",
        "errorStorageLocation":         "Location of the error log file",
    // Generated ---------------------------------------------------------------------------------------------------------------
        "version":                      "GoPlus version",
        "versionCatalogue":             "GoPlus at the version directory",
        "currentGoPlusInfo":         "Version information of the GoPlus output just installed",
   }
*/
var (
    errorStorageLocation string
)

const (
    isWindows = runtime.GOOS == "windows"
)

func InitConfig() (map[string]string, error) {
    config := map[string]string{}

    homeDir, _ := os.UserHomeDir()

    config["rootCatalogue"] = filepath.Join(homeDir, "GoPlus")
    config["zipStorageLocation"] = filepath.Join(config["rootCatalogue"], "GoPlus_Releases_Tmp.zip")
    config["errorStorageLocation"] = filepath.Join(config["rootCatalogue"], "InstallErrorLogs.log")
    errorStorageLocation = config["errorStorageLocation"]

    return config, nil
}

func InitResponse() map[string]interface{} {
    targetMap := map[string]interface{}{
        "status": false,
        "key":    "",
    }
    return targetMap
}
