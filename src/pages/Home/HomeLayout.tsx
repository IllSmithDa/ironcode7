import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer/Footer';
import TopicsTab from '../../components/TopicsTab/TopicsTab';

export default function HomeLayout() {
  return (
    <div
      className={`
        2xl:w-[1600px]
        w-[100%] mx-auto flex bg-[#F1F1F1]
        dark:bg-[#1B1B1B]
      `}
    >
      <Helmet>
        <title>IronCodeMan | Home</title>
      </Helmet>
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
