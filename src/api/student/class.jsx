import axios from "axios"
import {apiUrl} from "../../configs/apiUrl"

export const getclass = async() => {
    const response  = await axios.get(`${apiUrl}classroom/get-all-classes` );
    return response;
};
export const findClass = async(classroomId) => {
    const response  = await axios.get(`${apiUrl}classroom?id=${classroomId}` );
    return response;
};
export const getTests = async(classroomId) => {
    const response  = await axios.get(`${apiUrl}test?classroomId=${classroomId}` );
    return response;
};