import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


// function TodoReducer(state: Todo[], action: ACTIONS) {
//   switch (action.type) {
//     case 'add':
//       return [
//         ...state,
//         { id: Date.now(), todo: action.payload, isDone: false }
//       ];
//     case "remove":
//       return state.filter((todo) => todo.id !== action.payload);
//     case 'done':
//       return state.map((todo) => todo.id !== action.payload ? {...todo, isDone: !todo.isDone} : todo);
//     default:
//       return state;
//   }
// }


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, 
      active = todos, 
      complete = completedTodos;

    if(source.droppableId === 'todos_list'){
      add = active[source.index];
      active.splice(source.index, 1); // manipulate arrays, at index # and how many items #
    } else if (source.droppableId === 'todos_removed'){
      add = complete[source.index];
      complete.splice(source.index, 1); // manipulate arrays, at index # and how many items #
    } else return;

    if(destination.droppableId === 'todos_list'){
      active.splice(destination.index,0,add);
    } else if (destination.droppableId === 'todos_removed'){
      complete.splice(destination.index, 0, add); // manipulate arrays, at index # and how many items #
    } else return;

    setCompletedTodos(complete);
    setTodos(active);
  }

  console.log(todos)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        ></TodoList>
      </div>
    </DragDropContext>
  );
}

export default App;
