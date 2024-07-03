import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

function User() {
  const [loggedIn, setLoggedIn ] = useState<Boolean>(false);
  return (
  <Popover.Root>
    <Popover.Trigger asChild>

      <button className="cursor-pointer outline-none hover:text-gray-500" aria-label="User">
        <FaUser />
      </button>
    </Popover.Trigger>

    <Popover.Portal>
      <Popover.Content className="rounded p-2 w-auto bg-gray-300  data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-[600]"
        sideOffset={5}>
        <div className=" bg-gray-300">
          <div className="inset-y-0 left-0 flex items-center pl-3">
            <ul>
                {loggedIn ? (
                  <>
                    <li className="py-2">
                      <button className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200">Profile</button>
                    </li>
                    <li className="py-2">
                      <button className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200">Logout</button>
                    </li>
                  </>
                ) : (
                  <li className="py-2">
                    <button className="px-4 cursor-pointer hover:-translate-x-1 hover:scale-102 duration-300 hover:bg-indigo-200">Login</button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
  )
}

export default User;
