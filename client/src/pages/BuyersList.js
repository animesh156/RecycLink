import React, { useState, useEffect } from "react";
import API from "../utils/api";
import {ToastContainer, toast} from 'react-toastify'

const BuyersList = () => {
  const [buyersData, setBuyersData] = useState([]);
 

  useEffect(() => {
    const fetchBuyersList = async () => {
      try {
        const response = await API.get("/buyer/list", { withCredentials: true });
        console.log(response.data); // Debugging: Check API response

        setBuyersData(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchBuyersList();
  }, []);

  // Handle Accept or Reject action
  const handleAction = async (wasteId, buyerId, action,price) => {
    try {
       await API.put(
        `/buyer/accept-or-reject/${wasteId}`,
        { buyerId, action,price },
        { withCredentials: true }
      );

     
      // If accepted, remove the entire waste item
      if (action === "accept") {
        setBuyersData(buyersData.filter((waste) => waste._id !== wasteId));
        toast.success("accepeted")
      } else {
        // If rejected, remove only the buyer from the list
        
        setBuyersData((prevData) =>
          prevData.map((waste) => ({
            ...waste,
            buyers: waste.buyers.filter((buyer) => buyer.buyerId._id !== buyerId),
          }))
        );
        toast.info("Rejected")
      }
    } catch (error) {
      toast.error("Error processing the action.");
    }
  };

  return (
    <div className="buyers-list h-screen p-4">

      <ToastContainer />
      <h3 className="text-xl font-semibold mb-4 text-center">Buyers List</h3>
      {buyersData.length === 0 ? (
        <p className="text-center">No buyers available.</p>
      ) : (
        <ul className="space-y-4">
          {buyersData.map((waste) => (
            <li key={waste._id} className="border justify-evenly p-4 rounded-lg shadow-md flex gap-4">
              {/* Waste Image */}
              <img
                src={waste.imageUrl}
                alt={waste.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <strong>Waste Item:</strong> {waste.title} <br />
                <strong>Price:</strong> ${waste.price} <br />
                <strong>Interested Buyers:</strong>
                <ul className="mt-2 list-disc pl-4">
                  {waste.buyers.map((buyer) => (
                    <li key={buyer.buyerId._id} className="mb-2">
                      {buyer.buyerId.name} - Offered: ${buyer.amount}
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => handleAction(waste._id, buyer.buyerId._id, "accept",waste.price)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(waste._id, buyer.buyerId._id, "reject")}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuyersList;
