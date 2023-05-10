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


        {/* {todos.map((t) => (<li>{t.todo}</li>))} */}

      </div>
    </DragDropContext>
  );
}

export default App;


// let name: string;
// let age: number | string;
// let isStudent: boolean;
// let hobbies: string [];
// let role: [number, string];

// let personName:unknown;

// interface Person {
//   name: string;
//   age?: number;
// }

// interface Guy extends Person{
//   profession: string;
// }

// type X = {
//   a: string;
//   b: number;
// }

// type Y = {
//   c: string;
//   d: number;
// }

// let y: Y = {
//   c: "efdas",
//   d: 42,
// };

// function printName(name : string){
//   console.log(name);
// }

// let printName: (name:string) => never;

//void returns undefined, never returns nothing

// let person: Person = {
//   name: "Piyush",
//   age: 22,
// };

// let people: Person[];
