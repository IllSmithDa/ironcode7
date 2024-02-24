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
import FooterLinkLayout from "./pages/FooterLinkPages/FooterLinkLayout";
import About from "./pages/FooterLinkPages/About";
import Cookies from "./pages/FooterLinkPages/Cookies";
import Privacy from "./pages/FooterLinkPages/Privacy";
import Terms from "./pages/FooterLinkPages/Terms";
import Login from "./components/Login/Login";
import Auth from "./components/Auth/Auth";
import Admin from "./pages/Admin/Admin";
import './index.css';
import ScrollToTop from "./ScrollTop";

function App() {

  return (
    <Router>
      <ScrollToTop />
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
          <Route element={<FooterLinkLayout/>}>
            <Route path="/about" element={<About />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>
          <Route element={<Auth />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
