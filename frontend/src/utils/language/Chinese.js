export default {
    installationPrepare: {
        title: '欢迎使用 Go+ 在线安装程序',
        start: '开始安装',
        selectRelease: '选择发行版本',
        check: '正在检查环境中 ...',
    },
    errorGoEnvironment: {
        error: '环境错误',
        reason: '原因',
        errorEnvironment: '请先安装 Go，并确定已经将 GO 添加到了PATH环境变量中',
        errorVersion: '需要 Go1.16 或更高版本',
        recheck: '重新检查 Go 环境',
        downloadGo: '下载 Go',
        abnormal: '内部异常，请检查您的Go以及GoPATH环境变量是否正确，如果不能解决请前往 Github 反馈给我们'
    },
    errorNetwork: {
        error: '网络错误',
        recheck: '重新检查网络'
    },
    installationWaiting: {
        start: '正在安装',
        end: '安装完成',
        error: '安装失败',
        close:'退出'
    },
    installStatus: {
        init: '正在初始化配置中...',
        download: '正在下载安装包...',
        unzip: '正在解压安装包...',
        install: '正在执行安装脚本...',
        complete: 'Go+ 安装完成 ~',
        error: {
            reason: '原因',
            abnormal: '内部异常，请前往 Github 反馈给我们',
            apiError: 'API 异常, 请前往 Github 反馈给我们',
            errorDownload: '下载安装包失败, 请检查网络, 如果仍然无法解决请前往 Github 反馈给我们',
            errorUnzip: '解压安装包失败, 请检查安装包是否被损坏, 如果仍然无法解决请前往 Github 反馈给我们',
            errorInstall: '执行安装脚本失败, 请检查安装包是否被损坏, 如果仍然无法解决请前往 Github 反馈给我们',
            errorCurrentGoPlusInfo:'Go+ 版本号获取失败, 请检查安装包是否被损坏, 如果仍然无法解决请前往 Github 反馈给我们'
        }
    }
};