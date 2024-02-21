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

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="topic/:topicId" element={<Topics />} />
          <Route path="language/:languageId" element={<Languages />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
