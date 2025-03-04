import React from 'react'

const MainNotLogedin = () => {
  return (
    <main className='flex-1 w-full bg-white flex flex-col justify-center items-center' >
                <div className=' font-light text-6xl text-black'>Sign in</div>
                <div className=' font-light text-6xl text-black'>to use notes</div>
                <a href="/signUp"><button type="button" className=" mt-10 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-4xl px-7 py-4 text-center me-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button></a>
            </main>
  )
}

export default MainNotLogedin