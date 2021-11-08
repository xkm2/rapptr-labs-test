import React from "react";
import ToDoItem from "./ToDoItem";

interface Props {
    search: string;
    list: any[];
    setList: any;
}

const ToDoList: React.FC<Props> = ({ list, setList, search }) => {


    const editItem = (i: number, todo: string) => {
        var newlist: any[] = [''];
        setList(() => {
            newlist = list.map((item, j) => {
                if (j === i) {
                    return { todo: todo, del: item.del }
                } else {
                    return item
                }
            });
            return newlist
        })
    }
    const deleteItem = (i: number) => {
        var newlist: any[] = [''];
        setList(() => {
            newlist = list.map((item, j) => {
                if (j === i) {
                    return { todo: item.todo, del: true }
                } else {
                    return item
                }
            });
            return newlist
        });
    }

    return (
        <div className='list'>
            {
                list.map((item, index) => {
                    if (item.todo.toLowerCase().includes(search) && !item.del) {
                        return (
                            <ToDoItem
                                key={index}
                                del={item.del}
                                index={index}
                                item={item.todo}
                                editItem={editItem}
                                deleteItem={deleteItem}
                            />
                        )
                    } else {
                        return (<></>)
                    }
                })
            }
        </div>
    )
}

export default ToDoList;