import React from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom';


const Landing = () => {
    const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className=' flex flex-col'>
        <div className=' mx-10 my-10 lg:my-10 flex justify-center'>
            <img src="https://img.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg?size=626&ext=jpg&ga=GA1.1.1854925931.1649082367&semt=sph" alt="" />
        </div>

        <span className=' flex justify-evenly'>
            <button onClick={()=>navigate('/login')} className=' my-4 w-44 bg-indigo-500 text-white text-lg py-2 rounded-md hover:bg-indigo-600 transition duration-300'>
                Login
            </button>
            <button onClick={()=>navigate('/register')} className=' my-4 w-44 bg-indigo-500 text-white text-lg py-2 rounded-md hover:bg-indigo-600 transition duration-300'>
                Register
            </button>
        </span>
    </div>
    </>
  )
}

export default Landing