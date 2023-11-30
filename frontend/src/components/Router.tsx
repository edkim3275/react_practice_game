import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main';
import Stage1 from '../pages/stage1';
import Stage2 from '../pages/stage2';
import StageSelector from '../pages/StageSelector';
import Test from '../pages/Test';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Main />} />
                <Route path="stage">
                    <Route path="" element={<StageSelector />}/>
                    <Route path="1" element={<Stage1 />} />
                    <Route path="2" element={<Stage2 />} />
                </Route>
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<div>error</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;