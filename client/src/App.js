import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';
import TodoList from './TodoList';

import './App.css';

function App() {

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState('');
    const [todoList, setTodoList] = useState({});
    const [taskCount, settaskCount] = useState(0);
    const [tasks, settasks] = useState([]);

    useEffect(() => {
        loadBlockChainData();
    }, []);

    const loadBlockChainData = async () => {

        // loading blockchain
        const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:8545');

        // getting acoount
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // creating contract instance
        const todoListContract = await new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setTodoList(todoListContract);

        // getting the task count
        const taskCountLocal = await todoListContract.methods.taskCount().call();
        settaskCount(taskCountLocal);

        // getting all the tasks
        for (var i = 1; i <= taskCountLocal; i++) {
            const tasksLocal = await todoListContract.methods.tasks(i).call();
            settasks([...tasks, tasksLocal]);
        }

        // blockchain data loaded
        setLoading(false);

    };

    const createTask = async (content) => {
        setLoading(true);

        // calling the blockchain function to create task
        await todoList.methods.createTask(content).send({ from: account });

        setLoading(false);
    };


    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://imahmedalibhatti.surge.sh" target="_blank" rel="noopener noreferrer">
                    Ahmed Ali | Todo List
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-sm-block">
                        <small className="nav-link"><span id="account"></span></small>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex justify-content-center">
                        {loading ? 
                            <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                            : 
                            <TodoList
                                tasks={tasks}
                                createTask={createTask}
                            />
                        }
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
