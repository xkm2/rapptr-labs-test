import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

interface Props {
    item: any;
    index: number;
    del: boolean;
    editItem: any;
    deleteItem: any;
}

const ToDoItem: React.FC<Props> = ({ item, index, del, editItem, deleteItem }) => {

    const [edit, setEdit] = useState(item === '' ? true : false);
    const [todo, setTodo] = useState(item);
    const [deleted, setDel] = useState(del);

    const saveEdit = (e: any) => {
        e.preventDefault();
        if (todo.length > 0) {
            editItem(index, todo);
            setEdit(false);
        }
    }
    const Edit = (e: any) => {
        e.preventDefault();
        setEdit(true);
    }
    const Delete = (e: any) => {
        e.preventDefault();
        deleteItem(index);
        setDel(true);
    }

    return (
        <div className='item' style={{ display: deleted ? 'none' : 'inherit' }} >
            {

                edit ?
                    <form onSubmit={saveEdit}>
                        <input className="text"
                            type="text"
                            value={todo}
                            maxLength={50}
                            placeholder={'List Item Cannot Be Empty'}
                            onChange={e => setTodo(e.target.value)}
                        />

                        <FontAwesomeIcon className="save" icon={faSave} onClick={saveEdit} />
                    </form>
                    :
                    <div className="todo">
                        <p>{item}</p>
                        <FontAwesomeIcon icon={faEdit} onClick={Edit} />
                        <FontAwesomeIcon icon={faTrash} onClick={Delete} />
                    </div>
            }
        </div>


    )


}

export default ToDoItem;