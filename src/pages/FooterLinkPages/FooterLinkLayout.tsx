import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function FooterLinkLayout() {
  return (
    <div>
      <section
        className={`
          relative w-[100%] bg-[#F8F8F8]
          dark:bg-[#1B1B1B]
        `}
      >
        <Outlet />
        <Footer />
      </section>
    </div>
  )
}
