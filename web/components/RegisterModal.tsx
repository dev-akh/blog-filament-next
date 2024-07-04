import React, { useState } from 'react';
import * as api from '@/services/api';
import { register as registerEndpoint } from "@/services/endpoints";

interface RegisterProps {
  onClose: () => void;
  stage: string
}

const Register: React.FC<RegisterProps> = ({ onClose , stage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      return;
    }
    const response = await api.post(registerEndpoint, {
      name,
      email,
      password,
      password_confirmation: confirmPassword
    });
    const data = await response.json();
    if (data.success) {
      onClose();
    } else {
      // Handle registration error
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4"> {stage == 'register' ? "Create an account":"User Profile"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-white"
            />
          </div>
          {stage == 'register' && (
            <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-white"
                />
            </div>
          )}
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {stage == 'register' ? "Register":"Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
