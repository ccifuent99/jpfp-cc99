import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import CampusCreate from './CampusCreate';
import {_deleteCampus} from './store';


const Campuses = () => {
    const {campuses, students} = useSelector(state => state);
    const dispatch = useDispatch();
    
    const remove = ev => {
      ev.preventDefault;
      const removed = campuses.find(campus => campus.id);
      dispatch(_deleteCampus(removed)); 
    };
    
    return (
        <div>
            <ul>
                {
                    campuses.map( campus => {
                    const stu = students.filter(student=> student.campusId === campus.id);
                        return(
                        <li key={campus.id}>
                             <span><Link to={campus.id}> {campus.name} </Link> | {stu.length} Student(s) </span>
                             <span><button onClick={remove}>x</button></span>

                        </li>
                         );
                    })
                }
            </ul>
            <CampusCreate />
        </div>
    );
};

export default Campuses;