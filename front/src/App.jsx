import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './scss/global.scss';
import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Signin';
import NewPicture from './page/NewPicture';
import User from './page/User';
import Picture from './page/Picture';
import { createContext, useState } from 'react';
import Header from './layout/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './layout/Footer';
import Auth  from './components/Auth';

const AuthContext = createContext(null);

function App(){
    
    return(
        <Auth>
            <Header/>
            <Routes>
                <Route index element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                } />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/user" element={
                    <ProtectedRoute>
                        <User/>
                    </ProtectedRoute>
                }/>
                <Route path="/new" element={
                    <ProtectedRoute>
                        <NewPicture/>
                    </ProtectedRoute>
                }/>
                <Route path="/picture" element={
                    <ProtectedRoute>
                        <Picture/>
                    </ProtectedRoute>
                }/>
            </Routes>
            <Footer/>
        </Auth>

    )
}
export { AuthContext };
export default App