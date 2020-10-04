import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState';


function TodoList() {

    const { tasks, createTask, toggleCompleted } = useContext(GlobalContext);

    const inputValue = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(inputValue.current.value);
    };

    const handleClick = (taskId) => {
        toggleCompleted(taskId);
        console.log(taskId);
    };


    return (
        <div id="content">

            {/* Task Creater */}
            <form onSubmit={handleSubmit}>
                <input id="newTask" ref={inputValue} type="text" className="form-control" placeholder="Add task..." required />
                <input type="submit" hidden={true} />

                <button className="btn btn-outline-primary btn-sm" type="submit">Submit</button>
            </form>

            {/* Tasks List displayer */}
            <ul className="list-unstyled">
                {tasks.map((task, index) => (
                    <li id={task.completed ? 'completedTaskList' : 'taskList'} className="taskTemplate checkbox" key={index} >
                        <label>
                            <input
                                type="checkbox"
                                name={task.id}
                                defaultChecked={task.completed}
                                onClick={() => handleClick(task.id)}
                            />

                            {' '}

                            <span className="content">{task.content}</span>
                        </label>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default TodoList;
