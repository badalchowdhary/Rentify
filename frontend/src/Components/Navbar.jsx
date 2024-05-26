import React, { useState, useEffect } from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLoginData =  () => {
        try {
            const token = localStorage.getItem('token');
            
            if(token){
              setisLoggedIn(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchLoginData();
}, []);

  const handleLogout = () => {
      localStorage.clear();
      setisLoggedIn(false);
      navigate('/');
  };

  return (
    <div className=' px-10 lg:px-20 min-h-16 lg:min-h-20 bg-indigo-600 flex justify-between'>
        <div className=' py-4 text-2xl lg:text-4xl text-gray-100 italic'>RENTIFY</div>
        {isLoggedIn && 
          <div>
            <RiLogoutCircleLine onClick={handleLogout} className=' cursor-pointer my-4 text-xl text-gray-100 lg:text-3xl'/>
          </div>
        }
    </div>
  )
}

export default Navbar