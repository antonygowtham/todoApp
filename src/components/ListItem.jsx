import React,{useState} from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./Ticklcon";
import Modal from "./Modal";
import axios from "axios";


function ListItem({task,getData}){ 
    const [showModal,setShowModal]=useState(false);

    async function deleteItem(){
        try {
            const response=await axios.delete(`http://localhost:4000/todos/${task.id}`);
            if(response.status===200){
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <li className="list-item">
            <div className="info-container">
                <TickIcon/>
                <p className="task-title">{task.title}</p>
                <ProgressBar progress={task.progress}/> 
            </div>
            <div className="button-container">
                <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
                <button className="delete" onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode='edit' setShowModal={setShowModal} task={task} getData={getData}/>}
        </li>
    )
}

export default ListItem;