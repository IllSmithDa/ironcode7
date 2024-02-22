import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home/Home';
import Topics from './pages/Topics/Topics';
import NoMatch from './NoMatch';
import Languages from './pages/Languages/Languages';
import TopicLayout from "./pages/Topics/TopicLayout";
import HomeLayout from "./pages/Home/HomeLayout";
import LanguageLayout from "./pages/Languages/LanguageLayout";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route  element={<LanguageLayout />}>
            <Route path="language/:languageId" element={<Languages />} />
          </Route>
          <Route element={<TopicLayout />}>
            <Route path="topic/:topicId" element={<Topics />} /> 
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
