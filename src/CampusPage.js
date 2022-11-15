import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { _updateCampus } from './store';

const CampusPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { students, campuses } = useSelector(state => state);

    const campus = campuses.find( campus => campus.id === id);
    const student = students.filter( student => student.campusId === campus.id);
    
    const [name, newName] = useState('');
    const [address, newAddress] = useState('');
    const [detail, newDetail] = useState('');
    const [imageURL, newImage] = useState('');
    const [campusId, updatedCampus] = useState('');
    
    useEffect(()=> {
        const campus = campuses.find( campus => campus.id === id);
        
        newName(campus.name);
        newImage(campus.imageURL);
        newAddress(campus.address);
        newDetail(campus.detail);
        updatedCampus(campus.id);
    }, [campuses, id]);
    

    const update = (ev) => {
        ev.preventDefault();
            const saved = { id, name, imageURL, address, detail };
            dispatch(_updateCampus(saved));
    };
    
     const unregister = (ev) => { 
        ev.preventDefault();
            const unreg = student;
            dispatch(_updateCampus(unreg));
     };
     // successfully unregisters BUT! needs refreshing... will work on this ++ deletes.
    return (
        <div>
            <img src={ campus.imageURL } alt= 'Campus Photo' />
            <br/>
            <h1>{campus.name}</h1>
                <ul>
                    <h3>{campus.detail}</h3>
                    Address: {campus.address}
                    <br/>
                    
                    Currently Enrolled Students: 
                        <ul> 
                            {student.map((stu) => { 
                                return (
                                <li key={stu.id}>
                                    <form onSubmit={unregister}>
                                    <Link to={`/students/${stu.id}`}> {stu.firstName} {stu.lastName} </Link> <button value={campusId} onClick={unregister} > Unregister </button>
                                    </form>
                                </li>
                            );
                        }
                    )}
                    </ul>
                </ul>
                <br />
                <form onSubmit={update}>
                    <input value = {name} onChange={ev => newName(ev.target.value)}/>
                    <input value = {address} onChange={ev => newAddress(ev.target.value)}/>
                    <input value = {detail} placeholder= 'Description' onChange={ev => newDetail(ev.target.value)}/>
                    <input value = {imageURL} placeholder= 'Link Photo' onChange={ev => newImage(ev.target.value)}/>
                    <button> Update </button>
                </form>
                
                <Link to={'/campuses'}> Return to Campus List </Link>
        </div>
    );
};

export default CampusPage;

