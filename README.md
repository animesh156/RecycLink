
# RecycLink
A MERN stack platform for transforming waste into valuable resources.


## 🚀 OverView
RecycLink is a full-stack web application that connects waste producers with buyers to promote upcycling, recycling, and sustainable trade. 
## Features

### 1️⃣ User Roles
- **Sellers**: Can list waste items, add new waste for sale, and manage order.
- **Buyers**: Can browse waste listings and express interest in purchasing.


### 2️⃣ Waste Listing & Management
- Sellers can add waste items with details (title, description, price, location, category, and images).
- Waste images are uploaded and stored using Cloudinary.

### 3️⃣ Bidding System
- Buyers can express interest in waste items.
- Sellers can view interested buyers and confirm sales.

### 4️⃣ Seller Dashboard
- Overview of waste listings and manage waste items.
- Add new listings, and track marketplace activity.

### 5️⃣ Authentication & Security
- JWT-based authentication.
- Users can log in, register, and manage their profiles.
- Role-based access control (only sellers can add waste).
## Tech Stack

**Frontend:** React, TailwindCSS, DaisyUI, Chart.js, Cloudinary

**Backend:** Node, Express, JWT Authentication

**Database:** MongoDB, Mongoose

**Deployment:** Vercel


## Installation & Setup

### 🔹 Prerequisites
- Node.js (v18+)
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account (for image uploads)

### 🔹 Clone the Repository

```bash
  git clone https://github.com/animesh156/RecycLink.git
  cd RecycLink
```
### 🔹 Backend Setup

```bash
   cd server
  npm install
  ```
#### 🔹 Environment Variables (.env)
Create a .env file in the backend directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### 🔹 Start the Backend Server
```bash
 node index.js(your backend index file)
 ```

### 🔹 Frontend Setup
```bash
 cd client
 npm install
 ```

#### 🔹 Environment Variables (.env)
Create a .env file in the backend directory:

```bash
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset
```

#### 🔹 Start the Frontend Server
```bash
npm start
```










## Usage/Examples

### 🔹 Register & Login
- Sign up as a seller or buyer.
- Only sellers can post waste listings

### 🔹  Add a Waste Item
- Sellers can add a waste listing with an image.


### 🔹 Browse & Buy
- Buyers can browse waste listings and express interest.

### 🔹 Seller Dashboard
- Manage waste listings and track sales.


## Contributing

#### Want to improve the project? Contributions are welcome!

- Fork the repository.
- Create a feature branch (git checkout -b feature-xyz).
- Commit your changes (git commit -m "Added feature XYZ").
- Push to the branch (git push origin feature-xyz).
- Open a pull request.



## License

This project is open-source and available under the [MIT License](https://choosealicense.com/licenses/mit/)

