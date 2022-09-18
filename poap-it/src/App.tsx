import { Button, Input  } from '@chakra-ui/react';
import React, { useState } from 'react';
import './App.css';
import { getMasterWallet , createPOAP} from "./services/wallet.service";
import {MintPoap} from './components/mintPoap';


function App() {
    return (
        <div className="App">
            <MintPoap poapID='' masterWalletAddress={localStorage.getItem('masterWalletAddress') ?? ""}/>
            
            {/* <Button onClick={() => {
                console.log(getMasterWallet())
            }} colorScheme='teal' variant='outline'>
                GOOOOOOO
            </Button>
            <Button onClick={() => {
                createPOAP("IZZWFV")
            }} colorScheme='teal' variant='outline'>
                get poap
            </Button> */}

        </div>
    );
}

export default App;