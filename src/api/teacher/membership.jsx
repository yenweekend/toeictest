import axios from "axios"
import {apiUrl} from "../../configs/apiUrl"

export const accept = async(studentId) => {
    const response  = await axios.put(`${apiUrl}membership/accept?membershipId=${studentId}` );
    return response;
};
export const getRequestMembership = async(id) => {
    const response  = await axios.get(`${apiUrl}membership?classroomId=${id}` );
    return response;
};
export const putRequest = async(membershipId) => {
    const response  = await axios.put(`${apiUrl}membership/accept?membershipId=${membershipId}` );
    return response;
}
export const viewStudentProgress = async(classroomId) => {
    const response  = await axios.get(`${apiUrl}attempt/view-student-progress?classroomId=${classroomId}` );
    return response;
}
