import { get } from "axios";
import { getLocale } from "../utils/language/languageEncapsulation";

async function getReleasesData() {
    const SHUNT_TYPE = getLocale() === "Chinese" ? "china" : "other";

    const res = await get("https://uiuing.com/GoPlus-Release-Package/Releases.json", {
        params: {
            timestamp: (new Date()).getTime()
        }, timeout: 5000
    });
    return res.data[SHUNT_TYPE];
};

export default {
    getReleasesData
};