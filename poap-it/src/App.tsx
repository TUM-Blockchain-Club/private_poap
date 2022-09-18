import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import "./App.css";
import { getMasterWallet, createPOAP } from "./services/wallet.service";
import { MintPoap } from "./components/mintPoap";
import { Grid, GridItem } from "@chakra-ui/react";
import { SeePoap } from './components/seePoap';

function App() {
  return (
    <div className="App">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%" h="100%" bg="blue.500">
  
          <MintPoap
            poapID=""
            masterWalletAddress={
              localStorage.getItem("masterWalletAddress") ?? ""
            }
            masterWalletMemonic={
              localStorage.getItem("masterWalletMnemonic") ?? "No Master Wallet"
            }
          />
        </GridItem>
        <GridItem w="100%" h="100%" bg="blue.500">
      
          <SeePoap
          
            masterWalletAddress={
              localStorage.getItem("masterWalletAddress") ?? ""
            }
            masterWalletMemonic={
              localStorage.getItem("masterWalletMnemonic") ?? "No Master Wallet"
            }
        poaps={[]}
          />
        </GridItem>
      </Grid>

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