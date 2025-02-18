import { useEffect, useState } from "react";
import API from "../utils/api";

function PurchasedItems() {
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const response = await API.get("/buyer/history", { withCredentials: true });
        console.log(response.data);
        setPurchasedItems(response.data.purchasedItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchasedItems();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-neutral-950">
      {purchasedItems.length === 0 ? (
        <p className="text-center text-2xl text-gray-700">No Items available to display</p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-white">Purchased Items</h1>
          <div className="w-full max-w-4xl mx-auto h-96 overflow-y-scroll bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-4">
            <ul className="divide-y divide-gray-200">
              {purchasedItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-4 bg-sky-100 dark:bg-neutral-800 hover:bg-sky-200 dark:hover:bg-neutral-700 transition duration-300 rounded-md shadow-md mb-4"
                >
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-20 h-20 rounded-md object-cover border-2 border-sky-500"
                    />
                    
                  </div>

                  <div>
                      <h2 className="md:text-lg font-semibold text-gray-800 uppercase dark:text-white">{item.itemName}</h2>
                      
                    </div>

                  <div className="flex flex-col items-end justify-between text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Price: <span className="text-green-600 font-semibold">${item.price}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Purchased on:{" "}
                      <span className="font-bold text-pink-600">
                        {new Date(item.datePurchased).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default PurchasedItems;
