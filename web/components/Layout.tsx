import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
  <>
    <Header />
    <div className="py-6"></div>
    <div className="dark:bg-gray-800">
      {children}
    </div>
    <Footer />
  </>)

}
export default Layout
