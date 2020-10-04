import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import './App.css';

function App() {

    const [account, setAccount] = useState('');

    useEffect(() => {
        loadBlockChainData();
    }, []);

    const loadBlockChainData = async () => {

        // loading blockchain
        const web3 = new Web3(Web3.currentProvider || 'HTTP://127.0.0.1:8545');
        console.log(web3);
        
        // getting acoount
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    };

    return (
        <div>
            <h1>Hello World</h1>
            {account}
        </div>
    );
}

export default App;
