import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main';
import StageSelect from '../pages/stageSelect';
import Stage1 from '../pages/stage1';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/stage" element={<StageSelect />} >
                </Route>
                <Route path="stage/1" element={<Stage1 />} />
                <Route path="*" element={<div>ErrorPage</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;