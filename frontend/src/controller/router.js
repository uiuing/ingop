import { CheckGoEnvironment } from "../../wailsjs/go/main/App";

const checkGoEnvironment = (router) => {
    CheckGoEnvironment().then((res) => {
        if (res.status) {
            router.push({
                name: "InstallationWaiting",
                params: {}
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
    checkGoEnvironment,errorNetwork,
    callBackIndex
};