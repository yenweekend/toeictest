import axios from "axios"
import {apiUrl} from "../../configs/apiUrl"
export const create = async(formData) => {
    const response  = await axios.post(`${apiUrl}classroom/create`, formData );
    return response;
};
export const getclass = async() => {
    const response  = await axios.get(`${apiUrl}classroom/get-all-classes` );
    return response;
};
export const getTests = async(classroomId) => {
    const response  = await axios.get(`${apiUrl}test?classroomId=${classroomId}` );
    return response;
};
export const createTest = async(formData) => {
    const response  = await axios.post(`${apiUrl}test/create`, formData );
    return response;
};
export const createquestion = async(formData) => {
    const response  = await axios.post(`${apiUrl}question/create`, formData );
    return response;
};