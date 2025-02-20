import { useEffect, useState } from "react";
import API from "../utils/api";
import Loader from '../components/Loader'

function PurchasedItems() {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchPurchasedItems = async () => {
      try {
        const response = await API.get("/buyer/history", {
          withCredentials: true,
        });
        setPurchasedItems(response.data.purchasedItems);
      } catch (error) {
        console.log(error);
      } finally{
        setIsLoading(false)
      }
    };
    fetchPurchasedItems();
  }, []);

  return (
    <div className=" h-screen">

    {isLoading ? <Loader /> : <div className=" mt-20  flex flex-col  ">
      {purchasedItems.length === 0 ? (
        <p className="text-center text-2xl text-blue-900 mt-10">
          No Items available to display
        </p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mb-6 text-blue-900">
            Your Purchase History
          </h1>
          <div className="w-full max-w-4xl mx-auto h-[calc(100vh-200px)] overflow-y-auto bg-white dark:bg-neutral-950 shadow-xl rounded-lg p-6">
            <ul className="space-y-4">
              {purchasedItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition duration-300 rounded-xl shadow-md"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-blue-300 shadow-md"
                    />
                  </div>

                  <div className="flex-grow text-center">
                    <h2 className="text-xl font-semibold text-blue-900 uppercase mb-2">
                      {item.itemName}
                    </h2>
                    <div className="flex justify-center gap-8 text-sm">
                      <p className="text-blue-800">
                        Price:{" "}
                        <span className="font-semibold">${item.price}</span>
                      </p>
                      <p className="text-blue-800">
                        Purchased:{" "}
                        <span className="font-semibold">
                          {new Date(item.datePurchased).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>}



    </div>
  
  );
}

export default PurchasedItems;
