import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../Components/Navbar'
import { publicRequest } from '../requestMethods';

import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const SellerDashboard = () => {

    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [interestedBuyers, setInterestedBuyers] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProperty, setNewProperty] = useState({
        title: '',
        desc: '',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        location: '',
        amenities: [],
        nearby: [],
    });

    const fetchSellerProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await publicRequest.get('seller/properties', {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        fetchSellerProperties();
    }, [properties]);


    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
        setMessage("");
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await publicRequest.delete(`seller/properties/${id}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            setProperties(properties.filter(property => property.id !== id));
            setMessage("Property has been Deleted !");
            setSelectedProperty(null);
        } catch (error) {
            console.error('Error deleting property:', error);
            setError(error);
        }
    }

    const handleEdit = async (id) => {

    }

    const handleShowInterested = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await publicRequest.get(`seller/properties/interestedbuyers/${id}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            setInterestedBuyers(response.data);
        } catch (error) {
            console.error('Error fetching interested buyers:', error);
        }
    }
    
    const handleAddNewProperty = () => {
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await publicRequest.post('seller/properties', newProperty, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            setProperties((prevProperties) => [...prevProperties, response.data]);
            setIsModalOpen(false);
            setNewProperty({
                title: '',
                desc: '',
                price: '',
                area: '',
                bedrooms: '',
                bathrooms: '',
                location: '',
                amenities: [],
                nearby: [],
            });
            setMessage("Property added successfully !");
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 grid grid-cols-1 lg:grid-cols-2">
            <div className=" m-10 lg:m-16">
                {message && <p className="text-green-500 text-center mb-5">{message}</p>}
                <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center">Your Listed Properties</h2>
                <div className='flex flex-col mx-4 my-4'>
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="cursor-pointer my-2 p-4 border rounded-md hover:bg-indigo-200"
                            onClick={() => handlePropertyClick(property)}
                        >
                            <div className='flex justify-between'>
                                <span>{property.title}</span>
                                <span>Rs. {property.price}/per Sq.Ft</span>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddNewProperty} className=' my-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>Add new Property</button>

                </div>
            </div>
            
            <div className=' mx-6 my-4 bg-white shadow-xl rounded-lg lg:mx-8 lg:my-8'>
                <div>
                    {selectedProperty ? (
                        <div>
                            <div className=' flex justify-center'>
                                <img src="https://img.freepik.com/free-vector/hand-drawn-cost-living-illustration_23-2150892213.jpg?t=st=1716648678~exp=1716652278~hmac=77c4ecbb4250b743a59f57f38f405ab87a6430cef540417bd04844b882efa29d&w=1060" className=' max-h-40 lg:max-h-80' alt="" />
                            </div>
                            <div className=' my-4 mx-4 lg:my-8 lg:mx-8'>
                                <div className=' grid grid-cols-2'>
                                    <h2 className="text-xl font-bold py-2 px-2 lg:py-4">{selectedProperty.title}</h2>
                                    <div className=' flex justify-end py-2 px-2 lg:py-4 gap-4'>
                                        <MdDeleteOutline onClick={() => handleDelete(selectedProperty._id)} className='text-xl text-red-500 lg:text-2xl cursor-pointer'/>
                                        <CiEdit onClick={() => handleEdit(selectedProperty._id)} className='text-xl text-blue-600 lg:text-2xl cursor-pointer'/>
                                    </div>
                                </div>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Description:</span> {selectedProperty.desc}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Price:</span> ${selectedProperty.price}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Area:</span> {selectedProperty.area} sqft</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Bedrooms:</span> {selectedProperty.bedrooms}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Bathrooms:</span> {selectedProperty.bathrooms}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Location:</span> {selectedProperty.location}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Amenities:</span> {selectedProperty.amenties.join(', ')}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Nearby:</span> {selectedProperty.nearby.join(', ')}</p>
                            </div>
                            <div className=' flex justify-center'>
                                <button onClick={() => handleShowInterested(selectedProperty._id)} className=' my-6 px-20 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>Show Interested Buyers</button>
                            </div>
                        </div>
                    ) : (
                        <p className=' text-md lg:text-l font-bold mb-4 text-center m-10 lg:m-16'>Please select a property to view its details.</p>
                        
                    )}
                </div>

                <div>
                    {interestedBuyers ? (
                        <div>
                            <div className=' my-4 mx-4 lg:my-8 lg:mx-8'>
                                <h2 className="text-xl font-bold py-2 px-2 lg:py-4">Interested Buyers Data</h2>
                                <div>
                                    {interestedBuyers.map((buyer)=>(
                                        <div key={buyer._id}>
                                            <p className=' px-2 py-1'><span className=' font-semibold'>Name:</span> {buyer.firstname} {buyer.lastname}</p>
                                            <p className=' px-2 py-1'><span className=' font-semibold'>Email:</span> {buyer.email}</p>
                                            <p className=' px-2 py-1'><span className=' font-semibold'>Phone:</span> {buyer.phone}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-md w-2/3 lg:w-1/2">
                        <h2 className="text-xl font-bold mb-4">Add New Property</h2>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newProperty.title}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <textarea
                                name="desc"
                                placeholder="Description"
                                value={newProperty.desc}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newProperty.price}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="area"
                                placeholder="Area"
                                value={newProperty.area}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="bedrooms"
                                placeholder="Bedrooms"
                                value={newProperty.bedrooms}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="bathrooms"
                                placeholder="Bathrooms"
                                value={newProperty.bathrooms}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={newProperty.location}
                                onChange={handleInputChange}
                                className="block w-full mb-2 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="amenities"
                                placeholder="Amenities (comma-separated)"
                                value={newProperty.amenities}
                                onChange={(e) =>
                                    setNewProperty({
                                        ...newProperty,
                                        amenities: e.target.value.split(',').map(item => item.trim())
                                    })
                                }
                                className="block w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="nearby"
                                placeholder="Nearby (comma-separated)"
                                value={newProperty.nearby}
                                onChange={(e) =>
                                    setNewProperty({
                                        ...newProperty,
                                        nearby: e.target.value.split(',').map(item => item.trim())
                                    })
                                }
                                className="block w-full mb-2 p-2 border rounded"
                            />
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="mr-4 p-2 bg-gray-500 text-white rounded">Cancel</button>
                                <button type="submit" onClick={handleAddProperty} className="p-2 bg-blue-500 text-white rounded">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        </>
  )
}

export default SellerDashboard