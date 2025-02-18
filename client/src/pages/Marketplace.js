import { useEffect, useState } from "react";
import API from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Marketplace() {
    const [wastes, setWastes] = useState([]);
    const navigate = useNavigate();

    const UserRole = localStorage.getItem("role");

    useEffect(() => {
        if (UserRole === "seller") {
            // Show the error toast first, then redirect after a short delay
            toast.info("Only buyers can access the marketplace.");
            
            // Redirect after the toast has been displayed
            setTimeout(() => {
                navigate("/"); // Redirect to homepage or wherever
            }, 1000); // 3 seconds delay to allow the toast to show
        }
    }, [UserRole, navigate]);

    useEffect(() => {
        // Fetch the waste data
        const fetchWastes = async () => {
            try {
                const response = await API.get('/waste', { withCredentials: true });
                setWastes(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load waste items.");
            }
        };

        if (UserRole === "buyer") {
            fetchWastes();
        }
    }, [UserRole]);

    const handleBidSubmit = async (wasteId, price) => {
        const amount = price; // Automatically use the waste price as the bid amount
        if (!amount || amount <= 0) {
            toast.error("Invalid bid amount.");
            return;
        }

        try {
            const response = await API.post(`/buyer/add/${wasteId}`, { bidAmount: amount }, { withCredentials: true });
            toast.success("Bid placed successfully!");
        } catch (error) {
            toast.error("There was an error placing your bid. Please try again.");
            console.error(error);
        }
    };

    // If UserRole is "seller", don't render the marketplace
    if (UserRole === "seller") return null;

    return (
        <div className=" mx-auto p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold mb-6 text-center">Waste Marketplace</h2>
            {wastes.length === 0 ? (
                <p className="text-center font-semibold">No Items Available</p>
            ) : (
                <div className="flex gap-x-3 gap-y-2 flex-wrap justify-evenly">
                    {wastes.map((waste) => (
                        <div key={waste._id} className="card dark:bg-neutral-900 p-4 w-96 shadow-xl">
                            <img 
                                src={waste.imageUrl} 
                                alt={waste.title} 
                                className="w-full h-48 object-cover rounded-lg mb-4" 
                            />
                            <h3 className="text-xl font-bold">{waste.title}</h3>
                            <p>{waste.description}</p>
                            <p className="font-semibold text-gray-700">{waste.category}</p>
                            <p className="font-bold text-red-600">${waste.price}</p>
                            <div className="flex flex-col mt-4">
                                <button
                                    onClick={() => handleBidSubmit(waste._id, waste.price)} // Pass price as bid amount
                                    className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 active:scale-95 transition-all duration-200"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Marketplace;
