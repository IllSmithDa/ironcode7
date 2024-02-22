import {  Outlet, useParams } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';

export default function Layout() {
  const { topicId } = useParams<"topicId">();
  const { languageId } = useParams<"languageId">();

  return (
    <main>
      <Navbar topicId={topicId} languageId={languageId} />
      <Outlet />
    </main>
  )
}
