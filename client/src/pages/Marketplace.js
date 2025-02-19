import { useEffect, useState } from "react";
import API from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from '../components/Loader'

function Marketplace() {
    const [wastes, setWastes] = useState([]);
    const navigate = useNavigate();
    const UserRole = localStorage.getItem("role");
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (UserRole === "seller") {
            toast.info("Only buyers can access the marketplace.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [UserRole, navigate]);

    useEffect(() => {
        setLoading(true)
        const fetchWastes = async () => {
            try {
                const response = await API.get('/waste', { withCredentials: true });
                setWastes(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load waste items.");
            } finally {
                setLoading(false)
            }
        };

        if (UserRole === "buyer") {
            fetchWastes();
        }
    }, [UserRole]);

    const handleBidSubmit = async (wasteId, price) => {
        const amount = price;
        if (!amount || amount <= 0) {
            toast.error("Invalid bid amount.");
            return;
        }

        try {
             await API.post(`/buyer/add/${wasteId}`, { bidAmount: amount }, { withCredentials: true });
            toast.success("Bid placed successfully!");
        } catch (error) {
            toast.error("There was an error placing your bid. Please try again.");
            console.error(error);
        }
    };

    if (UserRole === "seller") return null;


    if(isLoading) return <Loader />

    return (
        <div className="h-screen md:mt-14 bg-white mx-auto p-6">
            <ToastContainer />
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-6 text-center text-blue-900"
            >
                Waste Marketplace
            </motion.h2>
            {wastes.length === 0 ? (
                <p className="text-center text-3xl font-semibold text-blue-900">No Items Available</p>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-x-3 gap-y-2 flex-wrap justify-evenly"
                >
                    {wastes.map((waste) => (
                        <motion.div 
                            key={waste._id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="card bg-white w-96 shadow-xl border border-blue-100 rounded-xl overflow-hidden"
                        >
                            <img 
                                src={waste.imageUrl} 
                                alt={waste.title} 
                                className="w-full h-48 object-cover rounded-t-lg" 
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{waste.title}</h3>
                                <p className="text-gray-600 mb-2">{waste.description}</p>
                                <p className="font-semibold text-blue-600 mb-1">{waste.category}</p>
                                <p className="font-bold text-blue-900 text-xl mb-4">${waste.price}</p>
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleBidSubmit(waste._id, waste.price)}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
                                >
                                    Buy Now
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default Marketplace;