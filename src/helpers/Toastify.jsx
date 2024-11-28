import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const successToastify = (text) => {
    toast.success(text);
}
const errorToastify = (text) => {
    toast.error(text);
}
const warnToastify = (text) => {
    toast.warn(text);
}
export {successToastify, errorToastify, warnToastify}