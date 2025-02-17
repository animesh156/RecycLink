import { useEffect, useState } from "react";
import API from '../utils/api'

function Marketplace() {
    const [wastes, setWastes] = useState([]);

    useEffect(() => {
        
        const fetchWastes = async () => {
            try {
                const response = await API.get('/waste', {withCredentials: true})
                setWastes(response.data)
            } catch (error) {
                console.log(error)
            }
           
        }

        fetchWastes()
    }, []);

    return (
        <div className="h-screen mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Waste Marketplace</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wastes.map((waste) => (
                    <div key={waste._id} className="p-4 border rounded-lg shadow">
                        <img 
                            src={waste.imageUrl} 
                            alt={waste.title} 
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">{waste.title}</h3>
                        <p>{waste.description}</p>
                        <p className="font-semibold text-gray-700">{waste.category}</p>
                        <p className="font-bold text-red-600">${waste.price}</p>
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 active:scale-95 transition-all duration-200">Buy Now
    </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Marketplace;
