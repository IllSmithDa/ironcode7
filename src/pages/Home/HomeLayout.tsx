import { Outlet } from 'react-router-dom'
import TopicsTab from '../../components/TopicsTab/TopicsTab';
import Footer from '../../components/Footer/Footer';

export default function HomeLayout() {
  return (
    <div>
      <TopicsTab />
      <Outlet />
      <Footer />
    </div>
  )
}
