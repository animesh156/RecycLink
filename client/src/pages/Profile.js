import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full p-2 border rounded" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm New Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;