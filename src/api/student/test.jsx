import axios from "axios"
import {apiUrl} from "../../configs/apiUrl"
export const doTest = async(testId) => {
    const response  = await axios.get(`${apiUrl}test/get-test?testId=${testId}` );
    return response;
};
export const submitTest = async(formData) => {
    const response  = await axios.post(`${apiUrl}attempt/create`, formData );
    return response;
};
export const viewResult = async(attemptId) => {
    const response  = await axios.get(`${apiUrl}attempt/view-result?attemptId=${attemptId}` );
    return response;
};
