import React, { useRef, useState, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";


const recyclingSuggestions = {
  bottle: "Recycle plastic bottles at a recycling center or repurpose them for DIY projects.",
  plastic: "Sort plastics by type and drop them at a plastic recycling facility.",
  paper: "Reuse paper for crafts or send it for paper recycling.",
  metal: "Metal can be sold to scrap dealers or used in upcycling projects.",
  cardboard: "Flatten and recycle cardboard at a waste management facility.",
  glass: "Glass bottles and jars can be reused or recycled at a glass recycling plant.",
  wood: "Reuse wooden items for DIY projects or donate them if still usable.",
  "food waste": "Compost food waste or use it for biogas generation.",
  textile: "Donate old clothes to charity or recycle fabric into new materials.",
  electronics: "E-waste should be dropped at certified e-waste recycling centers.",
  battery: "Take batteries to special disposal centers to prevent hazardous waste.",
  rubber: "Recycle rubber at a tire recycling facility or repurpose it for crafts.",
  styrofoam: "Drop styrofoam at designated recycling centers or reuse it for packaging.",
  aluminum: "Recycle aluminum cans or sell them to scrap dealers.",
  steel: "Steel scraps can be repurposed or sent to metal recycling plants.",
  copper: "Copper wires and pipes can be sold for recycling.",
  ceramics: "Broken ceramics can be used in landscaping or taken to specialty recyclers.",
  leather: "Donate old leather goods or repurpose them for DIY projects.",
  oil: "Used oil should be disposed of at hazardous waste centers.",
  pharmaceuticals: "Expired medicines should be returned to pharmacies for proper disposal.",
};

const WasteImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const imageRef = useRef(null);

 
  
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    toast.info("⚠️ This model might not always provide suggestions.", {
      position: "top-center",
      autoClose: 3000,
    });

    if (file.size > 200 * 1024) {
    toast.error("Image must be below 200 KB.", {
      position: "top-center",
      autoClose: 5000,
    });
      return;
    }

    if (!["image/jpeg", "image/jpg"].includes(file.type)) {
      toast.error("Only JPG and JPEG formats are allowed.", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setObjects([]);
    setAnalyzed(false);
  };

  const analyzeImage = async () => {
    if (!imageRef.current) return;
    setLoading(true);
    setAnalyzed(false);

    await tf.ready();
    const model = await cocoSsd.load();
    const predictions = await model.detect(imageRef.current);

    const detectedWaste = predictions.filter((obj) =>
      Object.keys(recyclingSuggestions).includes(obj.class)
    );

    setObjects(detectedWaste);
    setAnalyzed(true);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-100">

      <ToastContainer />

<div className=" flex flex-col items-center p-6">
      
      <h1 className="md:text-3xl text-lg font-bold mt-12 text-gray-800 mb-4">Waste Image Analysis</h1>

      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md">
        Upload Image
        <input type="file" accept="image/jpeg, image/jpg" onChange={handleImageUpload} className="hidden" />
      </label>

      {!analyzed && image && (
        <div className="mt-6">
          <img
            src={image}
            alt="Uploaded Waste"
            ref={imageRef}
            className="w-72 h-72 object-cover rounded-lg shadow-md border-2 border-gray-300"
          />
        </div>
      )}

      {!analyzed && image && !loading && (
        <button
          onClick={analyzeImage}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Analyze Waste
        </button>
      )}

      {loading && (
        <div className="mt-6 flex items-center text-blue-600">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
          <p className="ml-2 text-lg">Analyzing image...</p>
        </div>
      )}

      {analyzed && (
        <div className="mt-4 w-full max-w-md">
          {objects.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Detected Waste:</h2>
              <div className="grid gap-4">
                {objects.map((obj, index) => (
                  <div key={index} className="bg-sky-200 p-4 shadow-md rounded-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-800 capitalize">{obj.class}</h3>
                    <p className="text-gray-600 text-sm">Confidence: {(obj.score * 100).toFixed(2)}%</p>
                    <p className="text-sm text-gray-500 mt-2">{recyclingSuggestions[obj.class] || "No suggestion available"}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 mt-2 text-lg text-center font-bold">No relevant waste detected.</p>
          )}
        </div>
      )}
    </div>

    </div>
   
  );
};

export default WasteImageAnalyzer;
