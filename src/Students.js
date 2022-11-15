import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import StudentCreate from './StudentCreate';
import {_deleteStudent} from './store';

const Students = () => {
    const {students, campuses} = useSelector(state => state);
    const dispatch = useDispatch();
 
    const remove = ev => {
      ev.preventDefault;
      const removed = students.find(student => student.id);
      dispatch(_deleteStudent(removed)); 
    };
   
    return (
        <div>
            <ul>
                {
                    students.map( student => {
                        const camp = campuses.find(campus => campus.id === student.campusId) || '' ;
                        return(
                        <li key={student.id}>
                            <Link to={student.id}> {student.firstName}  {student.lastName} </Link> | {camp.name}
                            <span><button onClick={remove}>x</button></span>

                        </li>
                         );
                    })
                }
            </ul>
                   <StudentCreate/>
        </div>
 
    );
};

export default Students;