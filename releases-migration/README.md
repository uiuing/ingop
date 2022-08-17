# Introduction

[![Language](https://img.shields.io/badge/language-Go+-blue.svg)](https://github.com/goplus/gop)
[![GitHub release](https://img.shields.io/github/v/tag/goplus/gop.svg?label=Go%2b+release)](https://github.com/goplus/gop/releases)

[中文文档](https://github.com/uiuing/ingop/releases-migration/README_ZH.md)

GitHub Releases The Latest Package Listening and Migration Tool.

> After setting up the configuration file, deploy this application to the server, download the latest Release package locally and generate a JSON file to boot for public download.

This is a small example of the Go+ language in a practical application scenario.

Served at: https://github.com/uiuing/InGop
> How will it help me?
>
> InGop needs to provide everyone with the latest version of Go+, and this little tool written using Go+ helps me to listen to the latest version of Go+ on GitHub and then provide updates to users who don't have easy access to GitHub.

Here you can see my information on gop code migration:
> - Latest version information: https://s-ingop.uiuing.com/mirrors/gop/releases.json
> - Update information log file: https://s-ingop.uiuing.com/mirrors/gop/goplus_gop_update.log


# Configuration
It's the file called `config.yaml`

**This is an example:**
```yaml
# GitHub's account and password, which you will need to freely access the GitHub api
github-oauth:
  username: your-username
  password: your-password

# Your tasks
tasks:
  -
    run-state: true   # Whether to run this task, ture: run false: do not run.
    username: goplus  # GitHub Repository Author Name.
    repository: gop   # GitHub Repository Name.
    interval-seconds: 7200  # How often to check if the latest version has been migrated, parameter is seconds.
    storage-location: /tmp/goplus/gop  # Target storage directory, including log files and configuration files, must already exist.
    public-url: https://s-ingop.uiuing.com/mirror/goplus/gop # Links to download files after migration, followed by automatically spliced file names, The implementation of the download needs to be done by you.
  - # Here is the second task and you can have many
    run-state: true
    username: goplus
    repository: c2go
    interval-seconds: 7200
    storage-location: /tmp/goplus/c2go
    public-url: https://s-ingop.uiuing.com/mirror/goplus/c2go
```

**Here are some of the files generated:**
```text
These files are generated in the storage-location configuration directory of each task.

goplus_gop_releases_id.log            <-- Repository version id, please do not delete
goplus_gop_source_code_v1.1.3.tar.gz  <-- Migrated code zip
goplus_gop_update.log                 <-- Update Log
releases.json                         <-- Generated version information
```


# Apply to your machine

## Easy to use
Download the files you need in [Releases](https://github.com/uiuing/ingop/releases-migration/releases) and upload them to your server

Run to the background
```bash
nohup ./releases-migration &
```
If you want to shut down you can find the pid and kill -9 [PID]
```bash
ps -aux | grep releases-migration
```

![image](https://user-images.githubusercontent.com/73827386/184501119-c52fdaa4-f8f6-4345-9594-b3dfe545cf0f.png)

## Manual compilation

Reproduction down
```bash
git clone git@github.com:uiuing/InGop.git
```

```bash
cd releases-migration
```

With go+ installed, go to the root directory to download and compile
```bash
go mod download && gop build
```
