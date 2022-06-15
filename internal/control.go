package internal

import (
    "archive/zip"
    "errors"
    "fmt"
    "io"
    "net/http"
    "os"
    "os/exec"
    "path/filepath"
    "strings"
)

func CheckGoEnvironment() (string, error) {
    message, err := checkGoEnvironment("go")
    if err == nil {
        return message, err
    }
    if isWindows {
        return message, err
    }

    message, err = CorrectionGoEnvironment()
    if err != nil {
        return message, err
    }
    return "success", nil
}

func DownloadReleasePackage(rootCatalogue, zipStorageLocation, remoteURL string) error {

    if _, err := os.Stat(rootCatalogue); err != nil {
        err := os.MkdirAll(rootCatalogue, 0777)
        if err != nil {
            return err
        }
    } else {
        if _, err := os.Stat(zipStorageLocation); err == nil {
            err := os.Remove(zipStorageLocation)
            if err != nil {
                return err
            }
        }
    }

    out, err := os.Create(zipStorageLocation + ".tmp")
    defer out.Close()
    if err != nil {
        return err
    }

    resp, err := http.Get(remoteURL)
    defer resp.Body.Close()
    if err != nil {
        return err
    }

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("bad status: %s", resp.Status)
    }

    _, err = io.Copy(out, resp.Body)
    if err != nil {
        return err
    }
    out.Close()
    resp.Body.Close()

    err = os.Rename(zipStorageLocation+".tmp", zipStorageLocation)
    if err != nil {
        return err
    }

    return nil
}

func UnZip(rootCatalogue, zipStorageLocation, versionName string, autoDelete bool) (string, error) {
    r, err := zip.OpenReader(zipStorageLocation)
    defer r.Close()
    if err != nil {
        return "", err
    }

    RootCatalogueName := strings.ReplaceAll(r.File[0].Name, "/", "")

    for _, f := range r.File {
        path := filepath.Join(rootCatalogue, f.Name)
        if f.FileInfo().IsDir() {
            os.MkdirAll(path, os.ModePerm)
            continue
        }

        if err = os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
            return "", err
        }

        outFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
        if err != nil {
            return "", err
        }

        rc, err := f.Open()
        if err != nil {
            return "", err
        }
        _, err = io.Copy(outFile, rc)

        outFile.Close()
        rc.Close()
        if err != nil {
            return "", err
        }
    }
    if autoDelete {
        r.Close()
        err = os.Remove(zipStorageLocation)
        if err != nil {
            return "", err
        }
    }

    RootCatalogue := filepath.Join(rootCatalogue, RootCatalogueName)
    versionCatalogue := filepath.Join(rootCatalogue, versionName)
    if _, err := os.Stat(versionCatalogue); err == nil {
        os.RemoveAll(versionCatalogue)
    }

    err = os.Rename(RootCatalogue, versionCatalogue)
    if err != nil {
        return "", err
    }

    return versionCatalogue, nil
}

func ExecuteGoPlusScript(versionCatalogue string) error {
    cmd := exec.Command("go", "run", "cmd/make.go", "--install", "--autoproxy")
    cmd.Dir = versionCatalogue
    out, err := cmd.CombinedOutput()
    if err != nil {
        return errors.New(string(out) + err.Error())
    }

    return nil
}

func GetGoPlusInfo(versionCatalogue string) (string, error) {
    cmd := exec.Command(filepath.Join(versionCatalogue, "bin/gop"), "version")
    out, err := cmd.CombinedOutput()
    if err != nil {
        return "", err
    }

    return string(out), nil
}
