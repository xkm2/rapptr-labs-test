import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/to-do.scss';
import ToDoList from "../components/to-do/ToDoList";


const ToDoPage = () => {
    const [search, setSearch] = useState("");
    const [list, setList] = useState(() => {
        const localList = localStorage.getItem('list');
        if (localList) {
            const initialValue: any[] = JSON.parse(localList);
            return initialValue
        }
        return [{ todo: '', del: true }]
    })

    const addToDo = () => {
        setList(list.concat([{ todo: '', del: false }]));
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list])

    return (
        <div className='todo-container' style={{ backgroundImage: "url('./IMG_0235.jpg')" }}>
            <h1>My To-Do List</h1>
            <Link className='logout' to='/'>
                Logout
            </Link>
            <div className='to-do'>
                <div className='top'>

                    <input
                        type="text"
                        value={search}
                        placeholder="search"
                        onChange={e => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className='search' icon={faSearch} />
                    <FontAwesomeIcon className='new' icon={faPlus} size="2x" onClick={addToDo} />
                </div>
                <ToDoList list={list} setList={setList} search={search} />

            </div>
        </div>
    );
};

export default ToDoPage;