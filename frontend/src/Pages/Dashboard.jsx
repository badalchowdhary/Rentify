import { useEffect, useState } from 'react'
import React from 'react'
import Navbar from '../Components/Navbar'
import { publicRequest } from '../requestMethods';
import { FaFilter } from "react-icons/fa";



const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sizeRange, setSizeRange] = useState({ min: '', max: '' });
    const [bedrooms, setBedrooms] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await publicRequest.get('buyer/properties', {
                    headers: {
                        token: `Bearer ${token}`
                    }
                });
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
    };

    const [sellerData, setSellerData] = useState(null);
    const handleInterested = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await publicRequest.patch(`buyer/properties/${id}`, {}, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            setSellerData(response.data.seller);
            console.log(sellerData);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    const handleFilter = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const filterProperties = () => {
        let filtered = properties;
        if (priceRange.min) {
            filtered = filtered.filter(property => property.price >= priceRange.min);
        }
        if (priceRange.max) {
            filtered = filtered.filter(property => property.price <= priceRange.max);
        }
        if (sizeRange.min) {
            filtered = filtered.filter(property => property.area >= sizeRange.min);
        }
        if (sizeRange.max) {
            filtered = filtered.filter(property => property.area <= sizeRange.max);
        }
        if (bedrooms) {
            filtered = filtered.filter(property => property.bedrooms === parseInt(bedrooms));
        }
        setFilteredProperties(filtered);
    };

    useEffect(() => {
        filterProperties();
    }, [priceRange, sizeRange, bedrooms, properties]);


    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 grid grid-cols-1 lg:grid-cols-2">
            <div className=" m-10 lg:m-16">
                <div className=' flex justify-between'>
                    <h2 className="text-xl my-2 mx-3 lg:text-2xl font-bold mb-4 text-center">Properties List</h2>

                    <div className="relative inline-block text-left">
                    <div>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            onClick={handleFilter}
                        >
                            <FaFilter className="mr-2" />
                            Filters
                        </button>
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute top-36 right-10 lg:left-80 lg:top-44 mt-2 w-1/3 lg:w-1/6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="px-4 py-2">
                                <label className="block text-sm font-medium text-gray-700">Min Price</label>
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <label className="block text-sm font-medium text-gray-700">Max Price</label>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <label className="block text-sm font-medium text-gray-700">Min Size (sq ft)</label>
                                <input
                                    type="number"
                                    value={sizeRange.min}
                                    onChange={(e) => setSizeRange({ ...sizeRange, min: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <label className="block text-sm font-medium text-gray-700">Max Size (sq ft)</label>
                                <input
                                    type="number"
                                    value={sizeRange.max}
                                    onChange={(e) => setSizeRange({ ...sizeRange, max: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                                <input
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

                <div className='flex flex-col mx-4 my-4'>
                    {filteredProperties.map((property) => (
                        <div
                            key={property._id}
                            className="cursor-pointer my-2 p-4 border rounded-md shadow-md bg-slate-50 hover:bg-indigo-200"
                            onClick={() => handlePropertyClick(property)}
                        >
                            <div className='flex justify-between'>
                                <span>{property.title}</span>
                                <span>Rs. {property.price}/per Sq.Ft</span>
                            </div>
                        </div>
                    ))}
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
                                <h2 className="text-xl font-bold py-2 px-2 lg:py-4">{selectedProperty.title}</h2>
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
                                <button onClick={() => handleInterested(selectedProperty._id)} className=' my-6 px-20 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>I am interested !</button>
                            </div>
                        </div>
                    ) : (
                        <p className=' text-md lg:text-l font-bold mb-4 text-center m-10 lg:m-16'>Please select a property to view its details.</p>
                    )}
                </div>

                <div>
                    {sellerData ? (
                        <div>
                            <div className=' my-4 mx-4 lg:my-8 lg:mx-8'>
                                <h2 className="text-xl font-bold py-2 px-2 lg:py-4">Seller Data</h2>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Name:</span> {sellerData.firstname} {sellerData.lastname}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Email:</span> {sellerData.email}</p>
                                <p className=' px-2 py-1'><span className=' font-semibold'>Phone:</span> {sellerData.phone}</p>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            
            </div>
            
        </div>
        </>
    );
}

export default Dashboard