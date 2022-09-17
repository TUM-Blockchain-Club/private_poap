import {Button} from '@chakra-ui/react';
import React from 'react';
import './App.css';
import {getMasterWallet} from "./services/wallet.service";


function App() {
    return (
        <div className="App">
            <Button onClick={() => {
                console.log(getMasterWallet())
            }} colorScheme='teal' variant='outline'>
                GOOOOOOO
            </Button>
        </div>
    );
}

export default App;
