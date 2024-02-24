import { Outlet } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';
import Footer from '../../components/Footer/Footer';

export default function LanguageLayout() {
  return (
    <div className={`
      2xl:w-[1600px]
      w-[100%] mx-auto flex
    `}>
      <TopicsTab />
      <section
        className={`
        relative w-[100%] bg-[#F8F8F8]
        dark:bg-[#1E1E1E]
        `}
      >
        <Outlet />
        <Footer />
      </section>
    </div>
  )
}
