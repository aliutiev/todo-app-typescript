import React from 'react';
import { Todo } from './model';
import SingleTodo from './SingleTodo';
import "./styles.css";
import { Droppable } from 'react-beautiful-dnd';


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <div className="container">
            <Droppable droppableId="todos_list">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver?'drag_active':''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Tasks</span>
                        {
                            todos.map((todo, index) => (
                                <SingleTodo
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos}
                                    index={index}
                                ></SingleTodo>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>

            <Droppable droppableId="todos_removed">
                {(provided, snapshot) => (
                    <div className={`todos removed ${snapshot.isDraggingOver?'drag_removed':''}`}ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Completed Tasks
                        </span>
                        {
                            completedTodos.map((todo, index) => (
                                <SingleTodo
                                    todo={todo}
                                    key={todo.id}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                    index={index}
                                ></SingleTodo>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>



        </div>

        // <div className='todos'>
        //     {todos.map(t => (
        //         <SingleTodo 
        //         todo={t} 
        //         key={t.id} 
        //         todos={todos}
        //         setTodos={setTodos}
        //         ></SingleTodo>
        //     ))}
        // </div>
    )
}

export default TodoList;