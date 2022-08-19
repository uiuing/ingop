# 介绍

[![Language](https://img.shields.io/badge/language-Go+-blue.svg)](https://github.com/goplus/gop)
[![GitHub release](https://img.shields.io/github/v/tag/goplus/gop.svg?label=Go%2b+release)](https://github.com/goplus/gop/releases)

GitHub发布最新的软件包监听和迁移工具。

> 设置好配置文件后，将这个应用程序部署到服务器上，在本地下载最新的Release包，并生成一个JSON文件，之后供公众下载。

这是我使用 Go+ 语言在实际应用场景中的一个小例子。

服务于: https://github.com/uiuing/InGop
> 它是如何帮助我的？
>
> ingop需要为每个人提供Go+的最新版本，这个用Go+编写的小工具可以帮助我监听GitHub上Go+的最新版本，然后为那些不方便访问GitHub的用户提供更新。

这里你可以看到我关于 GO+ 代码迁移的信息:
> - 最新版本信息: https://s-ingop.uiuing.com/mirrors/gop/releases.json
> - 更新的日志文件: https://s-ingop.uiuing.com/mirrors/gop/goplus_gop_update.log


# 配置参数
就是那个叫做 `config.yaml` 的文件

**这是一个事例:**
```yaml
# GitHub的账户和密码，你将需要它来自由访问GitHub的api
github-oauth:
  username: your-username
  password: your-password

# 你的所有任务
tasks:
  -
    run-state: true   # 是否运行这个任务，ture：运行 false：不运行
    username: goplus  # GitHub存储库 作者账号名称
    repository: gop   # GitHub存储库 名称
    interval-seconds: 7200  # 检查是否有最新的版本需要迁移，参数是秒
    storage-location: /tmp/goplus/gop  # 目标存储目录，包括日志文件和配置文件，需要已经存在
    public-url: https://s-ingop.uiuing.com/mirror/goplus/gop # 迁移后下载文件的链接，后面是自动拼接的文件名，下载的实现需要你来完成
  - # 这里是第二个任务，你可以有很多个
    run-state: true
    username: goplus
    repository: c2go
    interval-seconds: 7200
    storage-location: /tmp/goplus/c2go
    public-url: https://s-ingop.uiuing.com/mirror/goplus/c2go
```

**下面是生成的一些文件:**
```text
这些文件是在每个任务的 `storage-location` 参数配置的目录下生成的

goplus_gop_releases_id.log            <-- 存储库最新的版本ID，请不要删除
goplus_gop_source_code_v1.1.3.tar.gz  <-- 迁移后的代码压缩包
goplus_gop_update.log                 <-- 更新日志
releases.json                         <-- 生成的版本信息
```


# 在你的机器上运行

## 简单使用
在 [Releases](https://github.com/uiuing/ingop/releases-migration/releases) 中下载你需要的文件，并将它们上传到你的服务器上

运行到后台
```bash
nohup ./releases-migration &
```
如果你需要关闭它，那么你可以运行下面的命令找到PID，然后关掉 `kill -9 [PID]`
```bash
ps -aux | grep releases-migration
```

![image](https://user-images.githubusercontent.com/73827386/184501119-c52fdaa4-f8f6-4345-9594-b3dfe545cf0f.png)

## 编译使用

克隆下来
```bash
git clone git@github.com:uiuing/InGop.git
```

```bash
cd releases-migration
```

下载一些包，然后编译
```bash
go mod download && gop build
```
