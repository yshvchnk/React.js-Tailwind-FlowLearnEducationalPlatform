import axios from "axios";

import { host, version } from "../api/apiInfo";

const hostApi = host;
const versionApi = version;

async function getNewToken() {
    if (
        !localStorage.getItem("genToken") ||
        localStorage.getItem("genToken") === ""
    ) {
        const response = await axios.get(
            `${hostApi}/${versionApi}/auth/anonymous?platform=subscriptions`
        );
        const token = response.data.token;
        localStorage.setItem("genToken", token);
        return token;
    } else {
        const token = localStorage.getItem("genToken");
        return token;
    }
}

export async function getAllCourses() {
    try {
        const token = await getNewToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
            `${hostApi}/${versionApi}/core/preview-courses`,
            {
                headers,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCourse(courseId) {
    try {
        const token = await getNewToken();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
            `${hostApi}/${versionApi}/core/preview-courses/${courseId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
