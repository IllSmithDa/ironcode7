/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Outlet, useParams } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useEffect, /* useState */ } from "react";
import CookieNotice from "./components/CookieNotice/CookieNotice";
import Footer from "./components/Footer/Footer";
// import Footer from "./components/Footer/Footer";

export default function Layout() {
  const { topicId } = useParams<"topicId">();
  const { languageId } = useParams<"languageId">();
  // const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    /*
    if (localStorage.getItem('iron_man_code_dark') === null) {
      localStorage.setItem('iron_man_code_dark', JSON.stringify(true))
    }
      */
    // const dark:boolean = JSON.parse(localStorage.getItem('iron_man_code_dark') as string) as boolean;
    const dark = true;
    // setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div>
    <main
      className={`
      bg-[#AAA]
      dark:bg-[#111]
      relative
      `}
    >
      <CookieNotice />
      <Navbar /*darkMode={isDark ?? true} */ topicId={topicId} languageId={languageId} />
      <div
        className={`
          mt-[47px]
        `}
      >
        <Outlet />
      </div>
    </main>
          <div
          className={`
            bg-[#AAA]
            dark:bg-[#111]
            relative
            mt-[150px]
          `} 
        >
          <Footer /*adname="LanguageAds" */ />
        </div>
        </div>
  )
}
