import React, { useState } from "react";
import {useCookies} from "react-cookie";
import axios from "axios";

function Auth(){
    const serverUrl = import.meta.env.VITE_SERVERURL;

    const [cookies,setCookie,removeCookie]=useCookies(null);
    const [isLogIn,setIsLogIn]=useState(true);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPassword,setConfirmPassword]=useState(null);
    const [error,setError]=useState(null);

    function viewLogin(state){
        setError(null)
        setIsLogIn(state)
    }

    async function handleSubmit(e,endpoint){
        e.preventDefault();
        if(!email || !password){
            setError("pelase fill the form !")
            return
        }
        if(!isLogIn && password !== confirmPassword){
            setError('make sure password match')
            return
        }
        const response=await axios.post(`${serverUrl}/${endpoint}`,{email:email,password:password})
        if(response.data.failed){
            setError(response.data.failed);
        }else{
            console.log(response.data)
            setCookie('Email',response.data.email);
            setCookie('AuthToken',response.data.token);
            window.location.reload();
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h1>To Do App</h1>
                    <h2>{isLogIn ? "please login " : "please sign up"}</h2>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                    {!isLogIn && <input 
                        type="password" 
                        placeholder="confirm password"
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />}
                    <input type="submit" className="create" onClick={(e)=>handleSubmit(e,isLogIn ? 'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button 
                        onClick={()=>viewLogin(false)}
                        style={{backgroundColor : !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
                        >sign up</button>
                    <button 
                        onClick={()=>viewLogin(true)}
                        style={{backgroundColor : isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
                    >Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;