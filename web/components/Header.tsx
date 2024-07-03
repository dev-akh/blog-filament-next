import { FaUser, FaSun, FaRegMoon } from "react-icons/fa";
import { useTheme } from 'next-themes'
import Link from "next/link";
import User from "@/components/User";

function Header() {

  const { theme, setTheme } = useTheme()

  return (
    <header className="not-prose  sm:px-4 py-2.5 w-full fixed top-0 start-0 bg-blue-200 dark:bg-blue-700 z-[500]"  >
      <div className="container flex flex-wrap items-center justify-between mx-auto px-14">

        <Link href="/" className="block font-semibold dark:text-white">WeOne Blog</Link>
        <ul className="ml-auto flex flex-wrap p-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 dark:hover:text-blue-700 rounded md:p-0 dark:text-white" aria-current="page">
            <User />
          </li>
          
          <li >
            <button className="block py-2 pl-3 pr-4 rounded md:p-0" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <FaSun /> : <FaRegMoon />}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )

}
export default Header
