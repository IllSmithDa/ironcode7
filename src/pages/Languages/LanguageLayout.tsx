import { Outlet } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';

export default function LanguageLayout() {
  return (
    <div>
      <TopicsTab />
      <Outlet />
    </div>
  )
}
