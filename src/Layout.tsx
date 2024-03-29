import {  Outlet, useParams } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from "react";
import CookieNotice from "./components/CookieNotice/CookieNotice";

export default function Layout() {
  const { topicId } = useParams<"topicId">();
  const { languageId } = useParams<"languageId">();
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    if (localStorage.getItem('iron_man_code_dark') === null) {
      localStorage.setItem('iron_man_code_dark', JSON.stringify(true))
    }
    const dark:boolean = JSON.parse(localStorage.getItem('iron_man_code_dark') as string) as boolean;
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <main
      className={`
      bg-[#AAA]
      dark:bg-[#111]
      relative
      `}
    >
      <CookieNotice />
      <Navbar darkMode={isDark ?? true} topicId={topicId} languageId={languageId} />
      <div
        className={`
          mt-[47px]
        `}
      >
        <Outlet />
      </div>
    </main>
  )
}
