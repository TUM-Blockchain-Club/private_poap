import {Button} from '@chakra-ui/react';
import React from 'react';
import './App.css';
import {createPOAP} from "./services/wallet.service";


function App() {
    return (
        <div className="App">
            <Button onClick={createPOAP('')} colorScheme='teal' variant='outline'>
                GOOOOOOO
            </Button>
        </div>
    );
}

export default App;
