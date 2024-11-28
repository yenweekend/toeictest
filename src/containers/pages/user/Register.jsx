import React from 'react'
import { useState , useCallback} from "react"
import {Logo,Loading} from "../../components";
import styled from 'styled-components';
import icons from '../../../utils/icons';
const Register = () => {
    const [formData, setFormData] = useState({
        email: "", password: ""
      });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const handleChange = useCallback((e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      },[formData]);
  return (
    // <div className="font-[sans-serif]">
    //     <div className="min-h-screen flex flex-col items-center justify-center">
    //         <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_0_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
    //             <div className="md:max-w-md w-full px-4 py-4">
    //             <form>
    //                 <div className="mb-12">
    //                 <h3 className="text-gray-800 text-3xl font-extrabold">Đăng ký</h3>
    //                 <p className="text-sm mt-4 text-gray-800">You have had an account <a href="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a></p>
    //                 </div>

    //                 <div>
    //                 <label className="text-gray-800 text-xs block mb-2">Email</label>
    //                 <div className="relative flex items-center">
    //                     <input name="email" type="text" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" autoComplete='off' onChange={handleChange}/>
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
    //                     <defs>
    //                         <clipPath id="a" clipPathUnits="userSpaceOnUse">
    //                         <path d="M0 512h512V0H0Z" data-original="#000000"></path>
    //                         </clipPath>
    //                     </defs>
    //                     <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
    //                         <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
    //                         <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
    //                     </g>
    //                     </svg>
    //                 </div>
    //                 </div>

    //                 <div className="mt-8">
    //                 <label className="text-gray-800 text-xs block mb-2">Password</label>
    //                 <div className="relative flex items-center">
    //                     <input name="password"  type={isPasswordVisible ? 'text' : 'password'} required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" autoComplete='off' onChange={handleChange} />
    //                     <div className="hidden_password absolute right-2 cursor-pointer" onClick={() => {
    //                     setIsPasswordVisible((state) => !state)
    //                     }}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] " viewBox="0 0 128 128">
    //                         <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
    //                     </svg>
    //                     {isPasswordVisible ? "" : <span className={`absolute w-[18px] h-[2px] bg-[#bbb] rotate-45 top-[8px]`}></span>}
    //                     </div>
    //                 </div>
    //                 </div>

    //                 <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
    //                 <div className="flex items-center">
    //                     <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
    //                     <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
    //                     Remember me
    //                     </label>
    //                 </div>
    //                 <div>
    //                     <a href="/login/identify" className="text-blue-600 font-semibold text-sm hover:underline">
    //                     Forgot Password?
    //                     </a>
    //                 </div>
    //                 </div>

    //                 <div className="mt-12">
    //                 <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
    //                     Đăng ký
    //                 </button>
    //                 </div>

    //                 <div className="space-x-6 flex justify-center mt-6">
    //                 <button type="button"
    //                     className="border-none outline-none">
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="32px" className="inline" viewBox="0 0 512 512">
    //                     <path fill="#fbbd00"
    //                         d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
    //                         data-original="#fbbd00" />
    //                     <path fill="#0f9d58"
    //                         d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
    //                         data-original="#0f9d58" />
    //                     <path fill="#31aa52"
    //                         d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
    //                         data-original="#31aa52" />
    //                     <path fill="#3c79e6"
    //                         d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
    //                         data-original="#3c79e6" />
    //                     <path fill="#cf2d48"
    //                         d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
    //                         data-original="#cf2d48" />
    //                     <path fill="#eb4132"
    //                         d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
    //                         data-original="#eb4132" />
    //                     </svg>
    //                 </button>
    //                 <button type="button"
    //                     className="border-none outline-none">
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="32px" fill="#007bff" viewBox="0 0 167.657 167.657">
    //                     <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
    //                     </svg>
    //                 </button>
    //                 </div>
    //             </form>
    //             </div>
    //             <div className="flex-auto flex-shrink-0 flex flex-col gap-3">
    //             <div className="flex items-center justify-center"
    //             >
    //             <Logo/>
    //             </div>
    //             <h2 className="slogan text-[20px] text-center">Nền tảng kiểm tra, đánh giá được tin dùng <br></br> bởi hơn 300.000+ giáo viên</h2>
    //             </div>
    //         </div>
    //     </div>
    //     <Loading/>
    // </div>
    <RegisterStyled >
        <header className='px-[20px] py-2 flex items-center justify-between'>
            <div className="logo w-[95px]">
                <img src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo.svg" alt="" className="logo w-full h-full object-cover" />
            </div>
            <div className="theme flex items-center cursor-pointer">
                <lucide-icon name="moon" size="20" class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" key="a7tn18"></path></svg></lucide-icon>
                <span>Chế độ tối</span>
            </div>
        </header>
        <div className="container  mx-auto w-[500px] border rounded-[4px] p-5 flex items-center justify-center flex-col mt-[100px] ">
            <div className="font-bold text-[20px] text-center mb-[30px]">Đăng ký</div>
            <div className="flex gap-3">
                <div className="role flex flex-col gap-3 items-center cursor-pointer p-5 border rounded-[4px] hover:scale-105 bg-white transition-all ease-linear duration-200 ">
                <lucide-icon name="graduation-cap"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" key="j76jl0"></path><path d="M22 10v6" key="1lu8f3"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" key="1r8lef"></path></svg></lucide-icon>
                <span>Tôi là học sinh</span>
                </div>
                <div className="role flex flex-col gap-3 items-center cursor-pointer p-5 border rounded-[4px] hover:scale-105 bg-white transition-all ease-linear duration-200 ">
                <div className="">
                    <icons.teacher className='text-[100px] w-[128px] h-[128px]'></icons.teacher>
                </div>
                <span>Tôi là giáo viên</span>
                </div>

            </div>
        </div>
    </RegisterStyled>
  )
}
const RegisterStyled = styled.div`
    .container{
        box-shadow:0 3px 20px #0000000b ;
    }
    .role{
        padding: 0 30px;
    }
    .role:hover{
         box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`   
export default Register
