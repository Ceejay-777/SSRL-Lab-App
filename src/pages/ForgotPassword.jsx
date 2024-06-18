import React from 'react'
import SignupImage from "../assets/Sgnup-image.jpg"; // Importing the image

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 w-screen shadow-md">

            <div className='max-w-screen-md m-auto bg-white rounded-md '>
                <div className='flex flex-col md:flex-row relative'>
                    {/* image block */}
                    <div className="relative w-full md:w-1/2 hidden md:block" >

                        <img
                            className="object-cover w-full h-full rounded-md"
                            src={SignupImage}
                            alt="Sign Up"
                        />

                        <div className="absolute top-0 left-0 mt-4 ml-4">
                            <img src="/vite.svg" alt="Small Logo" className="w-10 h-10 rounded-md" />
                        </div>

                        <div className="absolute top-0 left-14 mt-5 ml-2">
                            <h2 className="text-2xl font-bold text-[#FFA500] tracking-wide">SSRL</h2>
                        </div>

                    </div>

                    {/* forgot password tab */}
                    <div className="md:w-1/2 space-y-5 w-full flex justify-center items-center p-4 mt-12">

                        <div className='w-full max-w-md space-y-5 p-6 mt-12 pt-4 '>
                            <div className='flex justify-center items-center'>
                                <svg width="49" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M24.4771 45C29.6705 45 34.6512 42.8929 38.3235 39.1421C41.9958 35.3914 44.0588 30.3043 44.0588 25C44.0588 19.6957 41.9958 14.6086 38.3235 10.8579C34.6512 7.10714 29.6705 5 24.4771 5C19.2837 5 14.3031 7.10714 10.6308 10.8579C6.95849 14.6086 4.89542 19.6957 4.89542 25C4.89542 30.3043 6.95849 35.3914 10.6308 39.1421C14.3031 42.8929 19.2837 45 24.4771 45ZM24.4771 50C10.9584 50 0 38.8075 0 25C0 11.1925 10.9584 0 24.4771 0C37.9958 0 48.9542 11.1925 48.9542 25C48.9542 38.8075 37.9958 50 24.4771 50ZM22.0294 35H26.9248V40H22.0294V35ZM22.0294 10H26.9248V30H22.0294V10Z" fill="#111111" />
                                </svg>
                            </div>

                            <h2 className=" text-center text-3xl font-semibold text-[#333333] leading-10"> Forgot Password</h2>
                            <p className=' text-center text-[#666666] opacity-75 font-medium text-sm  py-1'>
                                Enter your Email and we'll send you a link to reset your password
                            </p>

                            <form className=" space-y-6" >
                                <div className="rounded-md shadow-sm text-base font-normal opacity-80">

                                    <div className=''>
                                        <label htmlFor="email" className="text-[#666666]">
                                            Email:

                                        </label>

                                        <input type="email" className=" appearance-none relative block w-full px-3 py-1 border border-[#666666] rounded-lg opacity-35 text-[#111111] focus:outline-none focus:opacity-100 focus:text-black" >


                                        </input>
                                    </div>


                                </div>



                                <div className='text-center mt-2'>
                                    <button type="submit" className="bg-[#053F05F0] text-white mt-6 px-1 py-2 font-bold text-xl capitalize rounded-xl w-full block" >Submit</button>
                                    <div className='text-center  font-medium text-base flex justify-center items-center mt-2 gap-3'>
                                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 1L1 8.5L11 16" fill="#111111" />
                                            <path d="M11 1L1 8.5L11 16" stroke="black" stroke-width="0.444444" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11 1L1 8.5L11 16" stroke="black" stroke-width="0.444444" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11 1L1 8.5L11 16" stroke="#111111" stroke-width="0.444444" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        <a href="/" className="text-[#666666] opacity-75 font-medium text-base">Back to Sign in </a>
                                    </div>
                                </div>
                            </form>
                        </div>



                    </div >
                </div>
            </div>
        </div >
    )
}

export default ForgotPassword