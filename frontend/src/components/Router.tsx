import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main';
import Stage1 from '../pages/stage1';
import StageSelect from '../pages/StageSelector';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Main />} />
                < Route path="/stage" element={< StageSelect />} >
                </Route>
                <Route path="stage/1" element={< Stage1 />} />
                <Route path="*" element={<div>error</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;