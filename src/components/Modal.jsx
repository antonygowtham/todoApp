import React ,{useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

function Modal({mode,setShowModal,getData,task}){
    const serverUrl = import.meta.env.VITE_SERVERURL;

    const [cookies,setCookie,removeCookie]=useCookies(null);
    const editMode = mode == 'edit' ? true : false;

    const [data, setData] = useState({
        user_email : editMode ? task.user_email : cookies.Email,
        title : editMode ? task.title : null,
        progress : editMode ? task.progress : null,
        date: editMode ? task.date: new Date()
    })

    async function postData(e){
        e.preventDefault();
        try {
            const response=await fetch(`${serverUrl}/todos`,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status === 200){
                getData();
                setShowModal(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function editData(e){
        e.preventDefault();
        try {
            const response=await axios.patch(`${serverUrl}/todos/${task.id}`,data);
            if(response.status === 200){
                getData();
                setShowModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e){
        const {name,value}=e.target;
        setData(data => ({
            ...data,[name]:value
        }))
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={()=>setShowModal(false)}>X</button>
                </div>
                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder=" Your task goes here"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br/>
                    <label for="range">drag to select your current progress</label>
                    <input
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={data.progress}
                        onChange={handleChange}
                    />
                    <input className={mode} type="submit" onClick={editMode ? editData : postData} />
                </form>
            </div>
        </div>
    )
}

export default Modal;