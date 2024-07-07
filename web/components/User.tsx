import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FaUser } from 'react-icons/fa';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { User as UserType } from '@/types/user';
import ConfirmDialog from '@/components/ConfirmDialog';

const User: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setUser(JSON.parse(user));
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (token: string, user: UserType) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setShowConfirmLogout(false);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  const handleCloseProfileModal = () => {
    setIsRegisterOpen(false)
  }
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="cursor-pointer outline-none hover:text-gray-500" aria-label="User">
            <FaUser />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded p-2 w-auto bg-gray-300 data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-[600]"
            sideOffset={5}
          >
            <div className="bg-gray-300">
              <div className="inset-y-0 left-0 flex items-center pl-3">
                <ul>
                  {loggedIn ? (
                    <>
                      <li className="py-2">
                        <button
                          className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200"
                          onClick={() => setIsRegisterOpen(true)}
                        >
                          Profile
                        </button>
                      </li>
                      <li className="py-2">
                        <button
                          className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="py-2">
                      <button
                        className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200"
                        onClick={handleLoginClick}
                      >
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} onLogin={handleLogin} />
      {isRegisterOpen && <RegisterModal onClose={handleCloseProfileModal} stage="profile" user={user}/>}

      {/* Confirm Logout Dialog */}
      <ConfirmDialog isOpen={showConfirmLogout} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </>
  );
};

export default User;
