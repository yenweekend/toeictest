import React , {useState}from 'react'
import { message } from 'antd'
import icons from '../../utils/icons';
const ExamCodeCopy = ({code}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
        .then(() => {
          setCopied(true);
          message.success("Mã đề đã được sao chép!");
        })
        .catch(() => {
          message.error("Không thể sao chép mã dề, vui lòng thử lại.");
        });
    };
  
  return (
    <div className="tag flex items-center gap-2 py-2 px-3  rounded-[4px] w-fit">
    <div className="copy cursor-pointer" onClick={handleCopy}>
      {copied ?  (<div className="w-5 h-5 rounded-[50%] text-white flex items-center justify-center bg-[#2bc38d]">
    <icons.vcheck></icons.vcheck>
    </div>) : (<icons.copy></icons.copy>)}
    </div>
    </div>
  )
}

export default ExamCodeCopy
