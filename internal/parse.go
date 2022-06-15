package internal

import (
    "errors"
    "os"
    "os/exec"
    "regexp"
    "strings"
    "time"
)

func CheckError(err error, errKey string) map[string]interface{} {
    req := InitResponse()
    if err != nil {
        if _, err := os.Stat(errorStorageLocation); err == nil {
            os.Remove(errorStorageLocation)
        }
        errorLogFile, _ := os.OpenFile(errorStorageLocation, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
        defer errorLogFile.Close()

        t := time.Now()
        errorLogFile.WriteString(t.String() + ":  Error: " + errKey + "; " + err.Error() + "\n")

        req["key"] = errKey
        return req
    }
    req["status"] = true
    return req
}

func CorrectionGoEnvironment() (message string, err error) {
    fuzzyPaths, _ := exec.Command("find", "/usr", "-path", "*/bin/go").CombinedOutput()
    if len(fuzzyPaths) > 0 {
        for _, line := range strings.Split(string(fuzzyPaths), "\n") {
            if strings.Contains(line, "bin/go") {
                message, err = checkGoEnvironment(line)
                if err == nil {
                    path := os.Environ()
                    catalog := strings.Replace(line, "bin/go", "bin", -1)
                    path = append(path, catalog)
                    os.Setenv("PATH", strings.Join(path, ":"))
                    return message, err
                }
            }
        }
    }
    if err == nil {
        return "errorEnvironment", errors.New("[func CorrectionGoEnvironment] can't find */bin/go")
    }
    return message, err
}

func ParseGoPlusVersion(FuzzyStrings string) (string, error) {
    rules := regexp.MustCompile(`[0-9]+\.[0-9]+\.[0-9]+`)
    params := rules.FindStringSubmatch(FuzzyStrings)
    if len(params) == 0 {
        return "", errors.New("[func:parseGoPlusVersion] can't find version , params is empty")
    }

    return params[0], nil
}

func checkGoEnvironment(goPath string) (string, error) {
    cmd := exec.Command(goPath, "version")
    out, err := cmd.CombinedOutput()
    if err != nil {
        return "errorEnvironment", err
    }
    versionNumber, err := ParseGoPlusVersion(string(out))
    if err != nil {
        return "errorEnvironment", err
    }

    goVersions := strings.Split(versionNumber, ".")
    if len(goVersions) < 2 {
        return "errorVersion", errors.New("[func checkGoVersion] go version is not correct")
    }
    if goVersions[0] >= "1" && goVersions[1] >= "16" {
        return "success", nil
    }
    return "errorVersion", errors.New("[func checkGoVersion] go version is not correct")
}
