from flask import Flask, request, jsonify
from transformers import CLIPProcessor, CLIPModel

from PIL import Image
import torch
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load CLIP model
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Predefined recycling categories
labels = [
    "Plastic Bottle - Recyclable into new plastic items.",
    "Glass Jar - Can be melted and reshaped.",
    "Paper - Can be pulped and recycled.",
    "Metal Can - Melted into new metal products.",
    "Electronic Waste - Requires special disposal."
]

@app.route('/analyze', methods=['POST'])
def analyze_waste():
    print("📩 Received request at /analyze")

    if 'image' not in request.files:
        print("⚠ Error: No image uploaded")
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    print(f"✅ Image saved: {filepath}")

    # Process image
    try:
        image = Image.open(filepath).convert("RGB")
        inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)

        # Get similarity scores
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)

        best_match_idx = torch.argmax(probs, dim=1).item()
        suggestion = labels[best_match_idx]
        print(f"🔍 AI Suggestion: {suggestion}")

        return jsonify({"suggestion": suggestion})

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
