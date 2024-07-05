import React, { useState } from 'react';
import * as api from '@/services/api';
import RegisterModal from '@/components/RegisterModal';
import { csrfCookie as csrfCookieEndpoint, login as loginEndpoint } from "@/services/endpoints";
import { User } from '@/types/user';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (token: string, user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    await api.get(csrfCookieEndpoint);
    const response = await api.post(loginEndpoint,{
        email,
        password 
    });
    const data = response.data;
    const token = data?.token;
    if (token?.access_token && data.user) {
      onLogin(token.access_token, data.user);
      onClose();
    } else {
      console.error(response);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              min={1}
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
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <span>
                  Logging in . . .
                </span>
              ) : (
                <span> Login </span>
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
            <button className="text-blue-600" onClick={() => setIsRegisterOpen(true)}>
              Create an account?
            </button>
          </div>
      </div>
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} stage="register"/>}
    </div>
  );
};

export default LoginModal;
