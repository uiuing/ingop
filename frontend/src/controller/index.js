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
                    message: res.message
                }
            });
        }
    });
};

export default {
    checkGoEnvironment
};