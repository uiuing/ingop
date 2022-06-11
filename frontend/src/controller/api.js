import { get } from "axios";
import { getLocale } from "../utils/language/languageEncapsulation";

const RELEASES_URL = "https://uiuing.com/GoPlus-Release-Package/Releases.json"

async function checkReleasesApi() {
    const res = await get(RELEASES_URL, {
        params: {
            timestamp: (new Date()).getTime()
        }, timeout: 5000
    });
    return res;
}

async function getReleasesData() {
    const parseReleasesOptions = (data) => {
        let options = [];

        const generateChildren = (data) => {
            let children = [];
            for (const [key, value] of Object.entries(data)) {
                children.push({
                    label: key,
                    value: value
                });
            }
            return children;
        };

        for (const [key, value] of Object.entries(data)) {
            if (Object.keys(value).length !== 0) {
                options.push({
                    label: key,
                    value: key,
                    children: generateChildren(value)
                });
            }
        }
        return options;
    };

    const SHUNT_TYPE = getLocale() === "Chinese" ? "china" : "other";

    const res = await checkReleasesApi()

    return parseReleasesOptions(res.data[SHUNT_TYPE]);
};

export default {
    getReleasesData,
    checkReleasesApi
};