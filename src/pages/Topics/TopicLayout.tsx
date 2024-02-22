import { Outlet, useParams } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';

export default function TopicLayout() {
  const { topicId } = useParams<"topicId">();
  return (
    <div>
      <TopicsTab 
        selectedId={topicId}
      />
      <Outlet />
    </div>
  )
}
