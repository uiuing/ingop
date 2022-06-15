const startRun = (res, router, remoteURL) => {
    if (res.status) {
        router.push({
            name: "InstallationWaiting",
            params: {
                remoteURL: remoteURL
            }
        });
        return;
    }
    router.push({
        name: "ErrorGoEnvironment",
        params: {
            key: res.key,
            remoteURL: remoteURL
        }
    });
};

const errorNetwork = (router) => {
    router.push({
        name: "ErrorNetwork",
        params: {}
    });
};

const callBackIndex = (router) => {
    router.push({
        name: "InstallationPrepare",
        params: {}
    });
};

export default {
    startRun, errorNetwork,
    callBackIndex
};