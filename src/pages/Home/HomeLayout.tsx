import { Outlet } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';
import Footer from '../../components/Footer/Footer';

export default function HomeLayout() {
  return (
    <div
      className={`
        2xl:w-[1600px]
        w-[100%] mx-auto flex bg-[#F1F1F1]
        dark:bg-[#1E1E1E]
      `}
    >
      <TopicsTab />
      <section className={`
        relative w-[100%] z-0
      `}>
        <Outlet />
        <Footer />
      </section>
    </div>
  )
}
