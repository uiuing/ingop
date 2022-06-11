import { CheckGoEnvironment } from "../../wailsjs/go/main/App";

const startRun = (router, remoteAddress) => {
    CheckGoEnvironment().then((res) => {
        if (res.status) {
            router.push({
                name: "InstallationWaiting",
                params: {
                    remoteAddress: remoteAddress
                }
            });
        } else {
            router.push({
                name: "ErrorGoEnvironment",
                params: {
                    key: res.key
                }
            });
        }
    }).then((err) => {
        console.error("checkGoEnvironment error: ", err);
    });
};

const errorNetwork = (router) => {
    router.push({
        name: "ErrorNetwork",
        params: {}
    });
}

const callBackIndex = (router) => {
    router.push({
        name: "InstallationPrepare",
        params: {}
    });
}

export default {
    startRun,errorNetwork,
    callBackIndex
};