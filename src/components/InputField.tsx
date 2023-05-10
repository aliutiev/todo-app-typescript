import React, { useRef } from 'react'
import "./styles.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void; // since function returns nothing, function void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <form className="input" onSubmit={(e) => {
                handleAdd(e)
                inputRef.current?.blur(); // getting the screen to unblur when we hit enter
            }}>
                <input type="input" placeholder='Enter a task' className='input__box'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    ref={inputRef}>
                </input>
                <button className='input__submit' type="submit">Go</button>


            </form>
        </div>
    )
}

export default InputField