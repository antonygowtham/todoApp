import React from "react";
import ListHeader from "./components/ListHeader";
import ListItem from  "./components/ListItem";
import Auth from "./components/Auth";
import {useEffect ,useState } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";

function App(){
    const serverUrl = import.meta.env.VITE_SERVERURL;


    const [cookies,setCookie,removeCookie]=useCookies(null);
    const authToken=cookies.AuthToken;
    const userEmail = cookies.Email;
    
    const [tasks,setTasks] = useState(null);

    const getData = async () => {
        try {
            const response =  await axios.get(`${serverUrl}/todos/${userEmail}`);
            setTasks(response.data);
        } catch (err) { 
            console.error(err);
        }
    } 

    useEffect (() => {
        if(authToken){
            getData();
        }}
        , []);

    //sort by date
    const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date));

    return (
        <div className="app">
            {!authToken && <Auth/>}
            {authToken && 
                <>
                <ListHeader listName='Holiday tick list' getData={getData}/>
                <p className="user-email">welcome {userEmail}</p>
                {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
                </>}
            <p className="copyright">@ Antony gowtham , 8754741802</p>
        </div>
    )
}

export default App;