import React, { useRef } from 'react';

function TodoList({ tasks, createTask }) {

    const inputValue = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(inputValue.current.value);
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
            <ul id="taskList" className="list-unstyled">
                {
                    tasks.map((task, index) => (
                        <div className="taskTemplate" className="checkbox" key={index} >
                            <label>
                                <input type="checkbox" />
                                {' '}
                                <span className="content">{task.content}</span>
                            </label>
                        </div>
                    ))
                }
            </ul>

            {/* Completed Tasks displayer */}
            <ul id="completedTaskList" className="list-unstyled"></ul>
        </div>
    );
};

export default TodoList;
