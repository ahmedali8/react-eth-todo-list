import React, { createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contract/TodoListContract';

const initialState = {
    loading: true,
    web3: {},
    account: '',
    todoList: {},
    tasks: [],
};

// create Global Context
export const GlobalContext = createContext(initialState);

// create context provider
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);


    useEffect(() => {
        loadBlockChainData();
        // eslint-disable-next-line
    }, []);

    const loadBlockChainData = async () => {

        // loading blockchain
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
        await Web3.givenProvider.enable();
        setupWeb3(web3);

        // getting acoount
        const accounts = await web3.eth.getAccounts();
        setupAccount(accounts[0]);

        // creating contract instance
        const todoListContract = await new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setupContract(todoListContract);

        // getting the task count
        let taskCount = await todoListContract.methods.taskCount().call();

        // getting all the tasks
        for (var i = 1; i <= taskCount; i++) {
            const { id, content, completed } = await todoListContract.methods.tasks(i).call();

            let taskObj = {
                id: parseInt(id),
                content,
                completed
            };

            addTask(taskObj);
        }

        // blockchain data loaded
        setLoading(false);
    };


    async function createTask(task) {
        const { account, todoList } = state;

        setLoading(true);

        // calling the blockchain function to create task
        await todoList.methods.createTask(task).send({ from: account });
        window.location.reload();

        // adding the task we just created
        addTask(task);
    }

    async function toggleCompleted(taskId) {
        const { account, todoList } = state;

        setLoading(true);

        // setting the task to completed state
        await todoList.methods.toggleCompleted(taskId).send({ from: account });
        window.location.reload();

        setLoading(false);
    };


    // Actions

    function setupWeb3(web3) {
        dispatch({
            type: 'SETUP_WEB3',
            payload: web3
        });
    }

    function setupAccount(account) {
        dispatch({
            type: 'SETUP_ACCOUNT',
            payload: account
        });
    }

    function setupContract(contract) {
        dispatch({
            type: 'SETUP_CONTRACT',
            payload: contract
        });
    }

    function addTask(task) {
        dispatch({
            type: 'ADD_TASK',
            payload: task
        });
    }

    function addCompletedTask(task) {
        dispatch({
            type: 'ADD_COMPLETED_TASK',
            payload: task
        });
    }

    function setLoading(boolean) {
        dispatch({
            type: 'SET_LOADING',
            payload: boolean
        });
    }


    return (
        <GlobalContext.Provider value={{
            loading: state.loading,
            account: state.account,
            todoList: state.todoList,
            taskCount: state.taskCount,
            tasks: state.tasks,
            completedTasks: state.completedTasks,
            createTask,
            toggleCompleted,
            addCompletedTask
        }}>
            {children}
        </GlobalContext.Provider>
    );
};