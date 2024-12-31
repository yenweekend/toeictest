import axios from "axios"
import {apiUrl} from "../../configs/apiUrl"
export const requestJoin = async(id) => {
    const response  = await axios.post(`${apiUrl}membership/request?classroomId=${id}` );
    return response;
};
export const viewProgress = async() => {
    const response  = await axios.get(`${apiUrl}attempt/view-progress` );
    return response;
};
export const viewAllResult = async(testId) => {
    const response  = await axios.get(`${apiUrl}attempt/view-all-results?testId=${testId}` );
    return response;
};
