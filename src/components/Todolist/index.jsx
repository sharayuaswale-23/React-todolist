import React, { useEffect, useState } from "react";
import './index.css';
import { MdDelete } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";


const TodoList = ()=> {

    const[isCompleted, setIsCompleted] = useState(false);
    const[alltodos,setTodos] = useState([]);
    const[newTitle,setTitle] = useState("");
    const[newDescription, setDescription] = useState("");
    const[completedtodos,setCompletetodos] = useState([]);

    const addtodo = ()=>{
        let newtodo = {
            title: newTitle,
            description: newDescription
        }

        setTitle("");
        setDescription("");

        let updatedtodo = [...alltodos];
        updatedtodo.push(newtodo);
        setTodos(updatedtodo);
        localStorage.setItem('todolist',JSON.stringify(updatedtodo));
    };

    const deletetodo = (index) => {
        let droptodo = alltodos.filter((_, i) => i !== index);
        localStorage.setItem('todolist', JSON.stringify(droptodo));
        setTodos(droptodo);
    }

    const deletecompletedtodo = (index)=>{
        let droptodo = completedtodos.filter((_, i) => i !== index);
        localStorage.setItem('completedtodos', JSON.stringify(droptodo));
        setCompletetodos(droptodo);
    }

    useEffect(()=>{
        let savedtodo = JSON.parse(localStorage.getItem('todolist'));  
        let savecompleted = JSON.parse(localStorage.getItem('completedtodos'))
        if(savedtodo){
            setTodos(savedtodo);
        } 
        if(savecompleted){
            setCompletetodos(savecompleted);
        }
    },[]);
    
    

    const oncompleted = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm +'-' + yyyy + ' at ' + h + ':' + m + ':' + s ;

        let filtered = {
            ...alltodos[index],
            completedOn: completedOn
        }
        let updatedcompletedtodo = [...completedtodos];
        updatedcompletedtodo.push(filtered);
        setCompletetodos(updatedcompletedtodo);
        deletetodo(index);
        localStorage.setItem('completedtodos', JSON.stringify(updatedcompletedtodo));
    }

    return(
        <div className="Todo">

            <div className="todo-main-sidebar">
            <div className="todo-main">
                    <div className="todo-cont">
                        <label>Title: </label>
                        <input type="text" value={newTitle} onChange={(e)=>setTitle(e.target.value)} placeholder="Add your task"/>
                    </div> <br/>
                    <div className="todo-cont">
                        <label>Description: </label>
                        <textarea rows={4} cols={30} type="text" value={newDescription} onChange={(e)=>setDescription(e.target.value)} placeholder="Add your description"/>
                    </div> <br/>
                    <div className="todo-cont">
                        <label>Time Period: </label>
                        <select>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                        </div> <br/>
                    <div className="todo-cont">
                        <button onClick={addtodo} className="mybtn">Add</button>
                    </div>
                </div>
            </div>

            <div className="todo-main-cont">

                <h1 style={{textAlign:"center"}}>Todo-List</h1>
                
                <div className="status-area">
                    <button style={{marginRight:"5px"}} className={`Btn ${isCompleted===false && 'active'}`} onClick={()=> setIsCompleted(false)}>Todo</button>
                    <button className={`Btn ${isCompleted===true && 'active'}`} onClick={()=> setIsCompleted(true)}>Completed</button>
                </div>
                <div className="todolist">
                   {
                    isCompleted === false && alltodos.map((item,index) =>{
                        return(
                            <div className="list-cont" key={index}>
                            <div style={{width:"90%", paddingRight:"15px"}} >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            </div>
                            <div  style={{width:"10%"}}>
                         <MdDelete onClick={()=>deletetodo(index)} className="icon" />
                         <MdCheckBox onClick={()=>oncompleted(index)} className="check-icon"/>
                         </div>
                         </div>
                        )
                    })
                   }

                  {
                    isCompleted === true && completedtodos.map((item,index) =>{
                        return(
                            <div className="list-cont" key={index}>
                            <div style={{width:"90%", paddingRight:"15px"}} >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p><small>Completed On: {item.completedOn}</small></p>
                            </div>
                            <div  style={{width:"10%"}}>
                         <MdDelete onClick={()=>deletecompletedtodo(index)} className="icon" />
                         
                         </div>
                         </div>
                        )
                    })
                   }
                </div>

                

            </div>
        </div>
    )
}

export default TodoList;