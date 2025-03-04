import React from 'react'

const navbarnotlogedin = () => {
  return (
    <><nav className='w-full bg-orange-500 h-[60px] flex justify-end items-center '>
                        <a href="/userLogin"><button type="button" className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">login</button></a>
                        <a href="/signUp"><button type="button" className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">sign up</button></a>
            </nav></>
  )
}

export default navbarnotlogedin