import { Outlet } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';

export default function LanguageLayout() {
  return (
    <div className={`
      2xl:w-[1600px]
      w-[100%] mx-auto flex
    `}>
      <TopicsTab />
      <section
        className={`
        relative w-[100%] bg-[#FDFDFD]
        dark:bg-[#1B1B1B]
        `}
      >
        <Outlet />
      </section>
    </div>
  )
}
