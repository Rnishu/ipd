'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface MouseEventData {
  x: number;
  y: number;
  time: number;
}

interface KeystrokeEventData {
  key: string;
  keydown: number;
  keyup: number;
}

interface TempData {
    key: string;
    keydown: number;
  }

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const [mouseData, setMouseData] = useState<MouseEventData[]>([]);
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [keystrokeData, setKeystrokeData] = useState<KeystrokeEventData[]>([]);

//    let keystrokeData: KeystrokeEventData[] = [];
   let tempData: { [key: string]: number } = {};
  useEffect(() => {
    
    const handleKeyDown = (e: KeyboardEvent) => {
      tempData[e.key] = Date.now();
      console.log("hello");
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleKeyUp = (e: KeyboardEvent) => {
        setKeystrokeData((prev) => [...prev, {key: e.key, keydown: tempData[e.key], keyup: Date.now()}]);
        // console.log(JSON.stringify(keystrokeData));
    };
  
      window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const payload = {
    //   formData,
    //   mouseData,
    //   keystrokeData,
    // };

    // try {
    //   await axios.post('https://example.com/api/collect', payload);
    //   alert('Data submitted successfully!');
    // } catch (error) {
    //   console.error('Error submitting data:', error);
    //   alert('Failed to submit data.');
    // }
    console.log(JSON.stringify(keystrokeData));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-black-700 mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
