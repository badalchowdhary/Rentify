import React, { useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isBuyer, setIsBuyer] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    

    const handleBuyerClick = () => {
        setIsBuyer(true);
        setIsSeller(false);
    };

    const handleSellerClick = () => {
        setIsSeller(true);
        setIsBuyer(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(firstName,lastName, phone,email, password, isBuyer, isSeller);
            const response = await publicRequest.post('auth/register', { 
                firstname: firstName,
                lastname: lastName,
                email: email,
                phone: phone,
                password: password,
                isBuyer: isBuyer,
                isSeller: isSeller 
            });
            console.log(response);
            if(response) setMessage("User created! Please login to continue.")
            console.log("Registration Successful")
            // Redirect to the dashboard or another protected route
            // window.location.href = '/dashboard';
            
        } catch (err) {
            setError("Something went wrong, please try again");
        }
    };
    

  return (
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-10 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-8'>
            <div className=' mx-8 mt-6 lg:my-8'>
                <h1 className=' text-center font-bold text-2xl text-indigo-700 lg:py-2 lg:px-4'>Create your account</h1>
                {error && <p className="text-red-500 text-center my-5">{error}</p>}
                {message && <p className="text-green-500 text-center my-5">{message}</p>}
                <div className=' flex flex-col mx-4 mt-2'>
                    <input placeholder='First Name' type='name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></input>
                    <input placeholder='Last Email' type='name' value={lastName} onChange={(e) => setLastName(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></input>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></input>
                    <input placeholder='Phone' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></input>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'></input>
                    <span className=' flex justify-evenly'>
                        <button onClick={handleBuyerClick} className={` my-3 py-2 px-5 rounded-md 
                        ${ isBuyer ? 'bg-green-500 text-white' : 'bg-gray-100 border border-gray-400 text-gray-700'} `}>
                                Buyer
                        </button>
                        <button onClick={handleSellerClick} className={` my-3 py-2 px-5 rounded-md
                        ${ isSeller ? 'bg-green-500 text-white' : 'bg-gray-100 border border-gray-400 text-gray-700'}`}>
                            Seller
                        </button>
                    </span>
                    <button onClick={handleRegister} className=' my-3 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>Register</button>
                    <a onClick={()=>navigate('/login')} className='text-center underline text-indigo-700'>Go to Login Page</a>
                </div>
            </div>
            <div className=' mx-10 mb-10 lg:my-10'>
                <img src="https://img.freepik.com/free-vector/business-man-working-hard-stock-financial-trade-market-diagram-vector-illustration-flat-design_1150-39773.jpg?size=626&ext=jpg&ga=GA1.1.1854925931.1649082367&semt=sph" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Register