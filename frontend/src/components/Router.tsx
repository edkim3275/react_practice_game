import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main';
import Stage1 from '../pages/stage1';
import StageSelector from '../pages/StageSelector';
import Test from '../pages/Test';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Main />} />
                < Route path="/stage" element={< StageSelector />} >
                </Route>
                <Route path="stage/1" element={< Stage1 />} />
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<div>error</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;