'use client'
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState(""); 
  const [newpassword, setNewPassword] = useState("");
  const [response, setResponse] = useState<string>("");

  async function getmessage(event: React.FormEvent) {
    event.preventDefault();

    const res =await fetch("/api/resetPassword", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email":email,"password":newpassword })
  });

    const data = await res.json(); // JSON olarak parse et
    console.log(data);
    setResponse(data.message); // data.message doğru şekilde alınacak
    setInterval(() => {
      window.location.href="/"
    }, 3000);
  }

  return (
    <div>
      <section className="bg-white h-screen">
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Reset Password</h2>

              <form onSubmit={getmessage} className="mt-8">
                <div className="space-y-5">

                  <div>
                    <label className="text-base font-medium text-gray-900"> Email </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-4 text-black border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-base font-medium text-gray-900"> New Password </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name="newpassword"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full p-4 text-black border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="w-full px-4 py-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign up</button>
                  </div>
                </div>
              </form>

              {response && (
                <p className="mt-4 text-yellow-400 bg-gray-800 p-2 rounded">{response}</p>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page;
