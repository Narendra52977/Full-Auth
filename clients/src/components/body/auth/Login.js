import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios'
import { showErrMsg,showSuccessMsg } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login';

const initialState={
    email:'',
    password:'',
    err:'',
    success:''
}


function Login() {
    const [user,setuser]=useState(initialState);
    const {email,password,err,success}=user
    const dispatch = useDispatch()
    const history=useHistory()
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setuser({...user,[name]:value,err:'',success:''})
    }
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            const res=await axios.post('/user/login',{email,password})
            setuser({...user,err:'',success:res.data.msg})
            localStorage.setItem('firstLogin',true)
            dispatch(dispatchLogin())
            history.push('/')

        }catch(err){
            err.response.data.msg&&setuser({...user,err:err.response.data.msg,success:''})
        }
    }
const responseGoogle=async (response)=>{
    console.log(response)
    try {
        const res=await axios.post('/user/google_login',{tokenId:response.tokenId})
        setuser({...user,err:'',success:res.data.msg})
        localStorage.setItem('firstLogin',true)
        dispatch(dispatchLogin())
        history.push('/')
    } catch (err) {
        err.response.data.msg&&setuser({...user,err:err.response.data.msg,success:''})
    }
}
const responseFacebook=async(response)=>{
console.log(response);
try {
    const {accessToken,userID}=response
    const res=await axios.post('/user/facebook_login',{accessToken,userID})
    setuser({...user,err:'',success:res.data.msg})
    localStorage.setItem('firstLogin',true)
    dispatch(dispatchLogin())
    history.push('/')
} catch (err) {
    err.response.data.msg&&setuser({...user,err:err.response.data.msg,success:''})
}
}

    return (
        <div className="login_page">
           <h2>Login</h2>
           {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor='email'>Email Address</label>
                    <input type="text"  placeholder="Enter your email" id="email" value={email} name="email" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor='password'>Password</label>
                    <input type="password"  placeholder="Enter your password" id="password" value={password} name="password" onChange={handleChangeInput}/>
               </div>
               <div className="row">
                   <button type="submit">Login</button>
                   <Link to="/forgot_password">Forgot your password?</Link>
               </div>
           </form>
           <div className="hr">Or Login With</div>
           <div className="social">
           <GoogleLogin
                clientId="898297638914-ad3h26di82d1k2b69fnltunnhfdeeqb1.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="401466874895197"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} />
           </div>
           <p>New Customer? <Link to='/register'>Register</Link></p>
        </div>
    )
}

export default Login