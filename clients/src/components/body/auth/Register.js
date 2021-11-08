import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios'
import { showErrMsg,showSuccessMsg } from '../../utils/notification/Notification';
import { isEmpty,isEmail,isMatch,isLength } from '../../utils/validation/validation';
const initialState={
    name:'',
    email:'',
    password:'',
    cf_password:'',
    err:'',
    success:''
}


function Register() {
    const [user,setuser]=useState(initialState);
    const {name,email,password,cf_password,err,success}=user
    
    
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setuser({...user,[name]:value,err:'',success:''})
    }
    const handleSubmit=async e=>{
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
        return setuser({...user , err :"Please fill in all fields",success:''})
        if(!isEmail(email))
            return setuser({...user , err :"Invalid email",success:''})
        if(isLength(password))
            return setuser({...user , err :"Password must be at least 6 characters",success:''})
        if(!isMatch(password,cf_password))
            return setuser({...user,err:"password did not match",success:''})

        try{
           const res=await axios.post('/user/register',{
               name,email,password
           })
           setuser({...user,success:res.data.msg})
        }catch(err){
            err.response.data.msg&&setuser({...user,err:err.response.data.msg,success:''})
        }
    }
    return (
        <div className="login_page">
           <h2>Register</h2>
           {err && showErrMsg(err)}
           {success && showSuccessMsg(success)}
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor='name'>Name</label>
                    <input type="text"  placeholder="Enter your name" id="name" value={name} name="name" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor='email'>Email Address</label>
                    <input type="text"  placeholder="Enter your email" id="email" value={email} name="email" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor='password'>Password</label>
                    <input type="password"  placeholder="Enter your password" id="password" value={password} name="password" onChange={handleChangeInput}/>
               </div>
               <div>
                   <label htmlFor='cf_password'>Confirm Password</label>
                    <input type="password"  placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput}/>
               </div>
               <div className="row">
                   <button type="submit">Register</button>
                  
               </div>
           </form>
           <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    )
}

export default Register
