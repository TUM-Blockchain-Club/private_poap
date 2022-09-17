import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import './App.css';
import { getMasterWallet , createPOAP} from "./services/wallet.service";


function App() {
    return (
        <div className="App">
            <Button onClick={() => {
                console.log(getMasterWallet())
            }} colorScheme='teal' variant='outline'>
                GOOOOOOO
            </Button>
            <Button onClick={() => {
                createPOAP("1zzwfv")
            }} colorScheme='teal' variant='outline'>
                get poap
            </Button>

        </div>
    );
}

export default App;
