'use client';
import { useState, useEffect } from 'react';

const ACCESS_CODE = '12345';

export default function AdminPage() {
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (code === ACCESS_CODE) {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/submit');
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f4ea] p-6">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Buy Submissions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
                <img
                  src={`http://localhost:5000/uploads/${item.screenshot}`}
                  alt="screenshot"
                  className="w-full h-48 object-contain rounded mb-3 border"
                />
                <p><span className="font-semibold">Name:</span> {item.name}</p>
                <p><span className="font-semibold">Email:</span> {item.email}</p>
                <p><span className="font-semibold">Title:</span> {item.offerTitle}</p>
                <p><span className="font-semibold">Category:</span> {item.category || 'Other'}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted: {new Date(item.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
