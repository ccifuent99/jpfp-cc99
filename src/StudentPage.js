import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {_updateStudent} from './store';

const StudentPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { students, campuses } = useSelector(state => state);
    
    const student = students.find( student => student.id === id);
    const campus = campuses.find( campus => campus.id === student.campusId);
   
    const [firstName, newFirstName] = useState('');
    const [lastName, newLastName] = useState('');
    const [email, newEmail] = useState('');
    const [campusId, newCampus] = useState('');
    const [imageURL, newImage] = useState('');
    
    useEffect(()=> {
        const student = students.find( student => student.id === id);
        
        newFirstName(student.firstName);
        newLastName(student.lastName);
        newEmail(student.email);
        newCampus(student.campusId);
        newImage(student.imageURL);
    }, [students, id]);
    
     const update = (ev) => {
        ev.preventDefault();
            const saved = {id, firstName, lastName, email, campusId, imageURL};
            dispatch(_updateStudent(saved));
    };
    
    
    return (
        <div>
            <img src={ student.imageURL } />
            <br/>
            <h1>{student.firstName} {student.lastName}</h1>
                <ul>
                   <Link to={`/campuses/${campus.id}`}><h3>{campus.name}</h3></Link>
                    Email: {student.email}
                    <br/>
                    GPA: {student.gpa}
                </ul>
                <br />
                <form onSubmit={update}>
                  <input value = {firstName} onChange={ev => newFirstName(ev.target.value)}/>
                    <input value = {lastName} onChange={ev => newLastName(ev.target.value)}/>
                    <input value = {email} onChange={ev => newEmail(ev.target.value)}/>
                    <input value = {imageURL} placeholder = 'Link Your Photo' onChange={ev => newImage(ev.target.value)}/>
                    
                    <select onChange={ ev => newCampus(ev.target.value)}>
                        <option value={campusId}> Your Campus </option>
                        {campuses.map(campus => {
                                return (
                                    <option key = {campus.id} value={campus.id}> {campus.name} </option>
                                    );
                        })}
                        </select>
                    <button> Update </button> 
                </form>
                <Link to={'/students'}> Student List </Link>
        </div>
    );
};

export default StudentPage;