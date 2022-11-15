import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const students = (state = [], action) => {
    if(action.type === 'SET_STUDENTS'){
         state = action.students;
    }
    if (action.type === 'CREATE_STUDENT'){
        state = [...state, action.student];
    }
    if (action.type === 'DELETE_STUDENT'){
        state = state.filter(student =>  student.id !== action.student.id);
    }
    if(action.type === 'UPDATE_STUDENT'){
        state = state.map(student => student.id === action.student.id ? action.student : student);
    }
    return state;
};

const campuses = (state = [], action) => {
    if(action.type === 'SET_CAMPUSES'){
        state = action.campuses;
    }
     if (action.type === 'CREATE_CAMPUS'){
        state = [...state, action.campus];
    }
    if (action.type === 'DELETE_CAMPUS'){
        state = state.filter(campus =>  campus.id !== action.campus.id);
    }
    if (action.type === 'UPDATE_CAMPUS'){
        state = state.map(campus => campus.id === action.campus.id ? action.campus : campus);
    }
    return state;
};


const setStudents = students => { return { type: 'SET_STUDENTS', students }};
const createStudent = student => { return { type: 'CREATE_STUDENT', student}};
const deleteStudent = student => { return { type: 'DELETE_STUDENT', student}};
const updateStudent = student => { return { type: 'UPDATE_STUDENT', student}};


const setCampuses = campuses => { return { type: 'SET_CAMPUSES', campuses }};
const createCampus = campus => { return { type: 'CREATE_CAMPUS', campus}};
const deleteCampus = campus => { return { type: 'DELETE_CAMPUS', campus}};
const updateCampus = campus => { return { type: 'UPDATE_CAMPUS', campus}};


//thunks
export const _setStudents = () => {
    return async(dispatch) => {
        const students = (await axios.get('/api/students'));
        dispatch(setStudents(students.data));
    };
};

export const _createStudent = (student) => {
     return async(dispatch) => {
        const newStudent = (await axios.post('/api/students', student));
        dispatch(createStudent(newStudent.data));
    };
};
export const _deleteStudent = (student) => {
     return async(dispatch) => {
        await axios.delete(`/api/students/${student.id}`, student);
        dispatch(deleteStudent(student));
    };
};

export const _updateStudent = (student) => {
    return async(dispatch) => {
        const updated = await axios.put(`/api/students/${student.id}`, student);
        dispatch(updateStudent(updated.data));
    };
};

export const _setCampuses = () => {
    return async(dispatch) => {
        const campuses = (await axios.get('/api/campuses'));
        dispatch(setCampuses(campuses.data));
    };
};

export const _createCampus = (campus) => {
     return async(dispatch) => {
        const newCampus = (await axios.post('/api/campuses', campus));
        dispatch(createCampus(newCampus.data));
    };
};

export const _deleteCampus = (campus) => {
     return async(dispatch) => {
        await axios.delete(`/api/campuses/${campus.id}`, campus);
        dispatch(deleteCampus(campus));
    };
};

export const _updateCampus = (campus) => {
    return async(dispatch) => {
        const updated = await axios.put(`/api/campuses/${campus.id}`, campus);
        dispatch(updateCampus(updated.data));
    };
};

const reducer = combineReducers({students, campuses});

const store = createStore(reducer, applyMiddleware(thunk,logger));

export default store; 