import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Footer from '../../components/Footer/Footer';
import TopicsTab from '../../components/TopicsTab/TopicsTab';
import HomeAds from '../../components/Ads/HomeAds';

export default function HomeLayout() {
  return (
    <div
      className={`
        2xl:w-[1600px]
        w-[100%] mx-auto flex bg-[#FDFDFD]
        dark:bg-[#1B1B1B]
      `}
    >
      <Helmet>
        <title>IronCodeMan | Home</title>
        <meta name="description" content="Ironcodeman: A reference for Programmers. Select topic or language"/>
      </Helmet>
      <TopicsTab />
      <section
        data-testid="main-content"
        className={`
        relative w-[100%] z-0
        `}
      >      
        <section
          className='flex justify-center w-[100%] px-[5px]'
        >
          <HomeAds />
        </section>
        <Outlet />
        <Footer />
      </section>
    </div>
  )
}
