import React, {useEffect, Component} from 'react';
import {Link, Routes, Route, HashRouter} from 'react-router-dom';
import {useSelector, useDispatch, Provider} from 'react-redux';
import { createRoot } from 'react-dom/client';
import Campuses from './Campuses';
import Students from './Students';
import StudentPage from './StudentPage';
import StudentCreate from './StudentCreate';
import CampusPage from './CampusPage';
import CampusCreate from './CampusCreate';
import store, {_setStudents, _setCampuses} from './store';

const App = () => {
    const {students, campuses} = useSelector(state=> state);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(_setCampuses());
        dispatch(_setStudents());
    },[]);
    
    return (
        <div>
            <nav>
                <Link to= '/'> Home </Link> 
                <Link to= '/students'> Students </Link>
                <Link to= '/campuses'> Campuses </Link>
            </nav>
            <Routes>
                <Route path='/' element={ <div> Home </div>}/>
                <Route path='/students' element={ <Students/> }/>
                <Route path='/students/:id' element={ <StudentPage/> }/>
                <Route path='/students' element={ <StudentCreate/> }/>
                <Route path='/campuses/:id' element={ <CampusPage/> }/>
                <Route path='/campuses' element={ <Campuses/> }/>
                <Route path='/campuses' element={ <CampusCreate/> }/>
            </Routes>
        </div>
    );
};

const root = createRoot(document.querySelector('#root'));


root.render(
        <Provider store={store}> 
            <HashRouter> 
                <App />
            </HashRouter>
        </Provider> 
    );
