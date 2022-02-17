import { createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Auth  from './components/Auth';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './layout/Header';
import Footer from './layout/Footer';

import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Signin';
import NewPicture from './page/NewPicture';
import User from './page/User';
import Picture from './page/Picture';
import Users from './page/Users';
import DeletedPictures from './page/DeletedPictures';

import LogoAlt from './components/LogoAlt';

import './scss/global.scss';

const AuthContext = createContext(null);

function App(){
    const location = useLocation();
    return(
        <Auth>
            {(location.pathname !== "/signup" && location.pathname !== "/signin") ? <Header/> : <LogoAlt/>}
            <Routes>
                <Route index element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                } />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/user/:id" element={
                    <ProtectedRoute>
                        <User/>
                    </ProtectedRoute>
                }/>
                <Route path="/new" element={
                    <ProtectedRoute>
                        <NewPicture/>
                    </ProtectedRoute>
                }/>
                <Route path="/picture/:id" element={
                    <ProtectedRoute>
                        <Picture/>
                    </ProtectedRoute>
                }/>
                <Route path="/users" element={
                    <RoleProtectedRoute>
                        <Users/>
                    </RoleProtectedRoute>
                }/>
                <Route path="/deleted-pictures" element={
                    <RoleProtectedRoute>
                        <DeletedPictures/>
                    </RoleProtectedRoute>
                }/>
            </Routes>
            <Footer/>
        </Auth>
    )
}
export { AuthContext };
export default App