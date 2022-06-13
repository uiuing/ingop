import InstallationPrepare from "../pages/InstallationPrepare.vue";
import InstallationWaiting from "../pages/InstallationWaiting.vue";
import ErrorGoEnvironment from "../pages/ErrorGoEnvironment.vue";
import ErrorNetwork from "../pages/ErrorNetwork.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: "InstallationPrepare",
        path: "/",
        component: InstallationPrepare
    },
    {
        name: "InstallationWaiting",
        path: "/installation-waiting",
        component: InstallationWaiting
    },
    {
        name: "ErrorGoEnvironment",
        path: "/error-go-environment",
        component: ErrorGoEnvironment
    },
    {
        name: "ErrorNetwork",
        path: "/error-network",
        component: ErrorNetwork
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;