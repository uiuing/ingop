export default {
    installationPrepare: {
        title: 'Welcome to the Go+ online installer',
        start: 'Start install',
        selectRelease: 'Select release',
    },
    errorGoEnvironment: {
        error: 'Environmental errors',
        reason: 'Reason',
        errorEnvironment: 'Please install Go first and make sure it is added to the PATH environment variable',
        errorVersion: 'Need Go1.16 or higher version',
        recheck: 'Recheck Go environment',
        downloadGo: 'Download Go',
        abnormal: 'Internal error, please check your Go and GoPATH environment variable, if it cannot be resolved, please contact us through Github'
    },
    errorNetwork: {
        error: 'Network error',
        recheck: 'Recheck network',
    },
    installationWaiting: {
        start: 'Installing',
        end: 'Install complete',
        error:'Install failed',
        close:'Close'
    },
    installStatus: {
        init: 'Initializing configuration...',
        download: 'Downloading install package...',
        unzip: 'Unzipping install package...',
        install: 'Executing install script...',
        complete: 'Go+ Install complete ~',
        error: {
            reason: 'Reason',
            abnormal: 'Internal error, please contact us through Github',
            apiError: 'API error, please contact us through Github',
            errorDownload: 'Download install package failed, please check network, if it still cannot be resolved, please contact us through Github',
            errorUnzip: 'Unzip install package failed, please check install package is not damaged, if it still cannot be resolved, please contact us through Github',
            errorGetUnzipPath: 'Get unzip path failed, please check install package is not damaged, if it still cannot be resolved, please contact us through Github',
            errorInstall: 'Execute install script failed, please check install package is not damaged, if it still cannot be resolved, please contact us through Github',
            errorGetGoPlusVersion: 'Get Go+ version failed, please check install package is not damaged, if it still cannot be resolved, please contact us through Github',
        }
    }
};