import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import StageSelect from './pages/stageSelect';
import Stage1 from './pages/stage1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/stage" element={<StageSelect />} />
        <Route path="/stage/1" element={<Stage1 />} />
      </Routes>
    </Router>
  );
}

export default App;
