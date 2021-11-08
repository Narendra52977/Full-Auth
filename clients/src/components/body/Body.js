import React from 'react'
import {Switch,Route} from 'react-router-dom'
import ActivationEmail from './auth/ActivationEmail'
import Login from './auth/Login'
import Register from './auth/Register'
import {useSelector} from 'react-redux'
import NotFound from '../utils/NotFound'
import ForgetPassword from './auth/ForgetPassword'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile/Profile'
import EditUser from './profile/EditUser'
import Home from './Home/Home'
function Body() {
    const auth=useSelector(state=>state.auth)
    const {isLogged,isAdmin}=auth
    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged?NotFound:Login} exact/>
                <Route path="/register" component={isLogged?NotFound:Register} exact/>
                <Route path="/forgot_password" component={ForgetPassword} exact/>
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
                <Route path="/user/reset/:token" component={ResetPassword} exact/>
                <Route path="/profile" component={isLogged?Profile:NotFound} exact/>
                <Route path="/edit_user/:id" component={isAdmin?EditUser:NotFound} exact/>
                <Route path="/" component={Home}/>
            </Switch>
        </section>
    )
}

export default Body
