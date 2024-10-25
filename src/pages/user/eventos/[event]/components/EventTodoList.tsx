import { useContext, useEffect, useState } from "react"
import NewTodoItem from "./NewTodoItem"
import TodoItem from "./TodoItem"
import { api } from "@/utils/api"


type Props = {
    todoList:
        {
        todoItem: number,
        todoStatus: boolean,
        todoDescription: string,
    }[]
}



const EventTodoList = ({todoList}:Props) => {

    return(
    <div className="w-full h-full mt-3 bg-white rounded-md flex flex-col">

        <div className="flex justify-between mx-5 mt-2">  
            <h1 className="text-xl">Tarefas</h1>
            <NewTodoItem/>
        </div>

        <div className="flex flex-col items-center max-w-full mt-2 overflow-hidden">
        {todoList.map((key, index) => (
         <TodoItem key={index} todoDescription={key.todoDescription} todoItem={key.todoItem} todoStatus={key.todoStatus}/>
            
        ))}
        
        </div>
        
    </div>
    )
}

export default EventTodoList;