import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { _createStudent } from './store';
import { useNavigate } from 'react-router-dom';


const StudentCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {campuses} = useSelector(state => state);
    
    const [firstName, newFirstName] = useState('');
    const [lastName, newLastName] = useState('');
    const [email, newEmail] = useState('');
    const [campusId, newCampus] = useState('');
    const [imageURL, newImage] = useState('');
    
    const save = (ev) => {
        ev.preventDefault();
        dispatch(_createStudent({firstName, lastName,email, campusId}, navigate));
    };
    
    return (
            <div id = 'col2'>
                <h1> New Student Registration </h1>
                <form onSubmit={save}>
                    <input
                        placeholder= 'First Name'
                        value = {firstName}
                        onChange={ev => newFirstName(ev.target.value)}
                        required ={true}
                    />
                    <input
                        placeholder= 'Last Name'
                        value = {lastName}
                        onChange={ev => newLastName(ev.target.value)}
                        required ={true}
                    />
                    <input
                        placeholder= 'Email'
                        value = {email}
                        onChange={ev => newEmail(ev.target.value)}
                       required ={true}
                    />
                    <input
                        placeholder= 'Upload a Photo! Paste URL.'
                        value = {imageURL}
                        onChange={ev => newImage(ev.target.value)}
                    />
                    <select onChange={ ev => newCampus(ev.target.value)}>
                        <option value={campuses.name}> Campus List </option>
                        {campuses.map(campus => {
                                return (
                                    <option key = {campus.id} value={campus.id}> {campus.name} </option>
                                    );
                        })}
                    </select>
                    <button disabled ={!campusId}> Register </button>
                </form>
            </div>
        );
};

export default StudentCreate;