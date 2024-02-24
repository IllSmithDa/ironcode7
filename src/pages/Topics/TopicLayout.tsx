import { Outlet, useParams } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';
import Footer from '../../components/Footer/Footer';

export default function TopicLayout() {
  const { topicId } = useParams<"topicId">();
  return (
    <div
      className={`
      2xl:w-[1600px]
      w-[100%] mx-auto flex
      `}
    >
      <TopicsTab 
        selectedId={topicId}
      />
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
