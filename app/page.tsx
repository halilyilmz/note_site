'use client'

import React, { useState, useEffect } from 'react';
import NavbarLogedin from './components/navbarLogedin';
import NavbarNotlogedin from './components/navbarnotlogedin';
import MainNotLogedin from './components/mainNotLogedin';
import MainLogedin from './components/mainLogedin';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cookie'den token'ı al
  useEffect(() => {
    const cookieToken = getCookie("token");
    setToken(cookieToken);
  }, []);

  // Login kontrolünü yapmak
  useEffect(() => {
    if (token) {
      logedinCheck(token).then((res) => {
        console.log("token : "+token)
        setIsLoggedIn(res);
      });
    }
  }, [token]);

  // Render edilecek Navbar ve Main bileşenlerini belirle
  let Navbar, Main;

  if (isLoggedIn === true) {
    Navbar = NavbarLogedin;
    Main = MainLogedin;
  } else {
    Navbar = NavbarNotlogedin;
    Main = MainNotLogedin;
  }

  console.log("islogedin: "+ isLoggedIn)

  return (
    <div className='flex flex-col min-h-screen'>
      {Navbar && <Navbar />}
      {Main && <Main />}
    </div>
  );
};

// Token doğrulaması yapacak fonksiyon
async function logedinCheck(token: string) {
  let islogedin = false;

  const res = await fetch("/api/logedinCheck", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    islogedin = true;
  }
  return islogedin;
}

function getCookie(name: string): string | null {
  if (typeof window !== "undefined") {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))
      [0] || null;
  }
  return null; // Eğer sunucu tarafında isek, null döner
}

export default Page;
