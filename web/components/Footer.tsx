import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";


function Footer() {

  return (

    <footer className="px-2 sm:px-4 py-2.5 w-full bg-blue-200 dark:bg-blue-700">

      <div className="container flex flex-wrap items-center justify-between mx-auto px-14">

        <Link href="#" className=" text-gray-700 text-sm font-semibold whitespace-nowrap dark:text-white">2024, copyright
        </Link>

        <ul className="ml-auto flex p-4 flex-row md:space-x-8 md:mt-0 md:text-sm font-medium">
          <li>
            <Link href="https://github.com/dev-akh" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white" aria-current="page">
              <FaGithub />
            </Link>
          </li>
          <li>
            <Link href="https://linkedin.com/in/aung-kyaw-htwe" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white ">
              <FaLinkedin />
            </Link>
          </li>

        </ul>
      </div>

    </footer>

  )
}

export default Footer
