import React, { useContext } from 'react';
import TodoList from './components/TodoList';
import { GlobalContext } from './context/GlobalState';

import './App.css';

function App() {

    const { loading, account } = useContext(GlobalContext);

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://imahmedalibhatti.surge.sh" target="_blank" rel="noopener noreferrer">
                    Ahmed Ali | Todo List
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-sm-block">
                        <small className="nav-link"><span id="account">{account}</span></small>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex justify-content-center">
                        {loading ?
                            <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                            :
                            <TodoList />
                        }
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
