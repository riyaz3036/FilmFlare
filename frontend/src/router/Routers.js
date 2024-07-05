import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../Pages/Home';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import EditMovie from '../Pages/EditMovie';
import AddMovie from '../Pages/AddMovie';
import AddCast from '../Pages/AddCast';
import Movie from './../Pages/Movie';
import AddProducer from '../Pages/AddProducer';
import AddActor from '../Pages/AddActor';





const Routers = () =>{
return (
    <Routes>

        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/edit-task/:id' element={<EditMovie/>} />
        <Route path='/add-movie' element={<AddMovie/>} />
        <Route path='/edit-movie/:id' element={<EditMovie/>} />
        <Route path='/add-cast' element={<AddCast/>} />
        <Route path='/add-actor' element={<AddActor/>} />
        <Route path='/add-producer' element={<AddProducer/>} />
        <Route path='/movie/:id' element={<Movie/>} />
    
    </Routes>
);
};

export default Routers;