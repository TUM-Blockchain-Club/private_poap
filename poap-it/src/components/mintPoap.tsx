import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { getMasterWallet, createPOAP, getAllPOAPs } from "../services/wallet.service";

type State = {
  poapID: string;
  masterWalletAddress: string;
  masterWalletMemonic: string;
};

export class MintPoap extends React.Component< State> {
  state = {
    poapID: "",
    masterWalletMemonic: localStorage.getItem('masterWalletMnemonic') ?? "No Master Wallet",
    masterWalletAddress: localStorage.getItem('masterWalletAddress') ?? ""

  };

  // typing on RIGHT hand side of =
  onChangePoapID = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ poapID: e.currentTarget.value.toLowerCase()});
  };

  onChangeAddress = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ masterWalletAddress: e.currentTarget.value});
  };

  onChangeMemonic = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ masterWalletMemonic: e.currentTarget.value});
  };
  render() {
    return (
         <Flex
         minH={"100vh"}
         align={"center"}
         justify={"center"}
         bg="gray.50" _dark={{ bg: "gray.800" }}
       >
         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
           <Stack align={"center"}>
             <Heading fontSize={"4xl"}>Private Poap</Heading>
             <Text fontSize={"lg"} color={"gray.600"}>
               Create single use wallets to privately receive poaps
             </Text>
           </Stack>
           <Box
             rounded={"lg"}
          
          
             boxShadow={"lg"}
             p={8}
           >
             <Stack spacing={4}>
               <Text fontSize={"lg"} color={"gray.600"}>
                 Step 1: Initialize Master Wallet
          
               </Text>
               <FormControl id="memonicMaster">
                 <FormLabel>Memonic Master Wallet</FormLabel>
                 <Input  type="text" value={this.state.masterWalletMemonic} onChange={this.onChangeMemonic}  />
               </FormControl>
               <FormControl id="addressMaster">
                 <FormLabel>Master Wallet Address</FormLabel>
                 <Input disabled  type="text" value={this.state.masterWalletAddress} onChange={this.onChangeAddress}  />
               </FormControl>
   
               <Button
                 bg={"blue.400"}
                 color={"white"}
                 onClick={() => {
                   console.log(getMasterWallet());
                 }}
                 _hover={{
                   bg: "blue.500",
                 }}
               >
                 Initialize new base wallet
               </Button>
               <Divider></Divider>
               <Text fontSize={"lg"} color={"gray.600"} pt={6}>
                 Step 2: Mint Poap to derived wallet
               </Text>
               <FormControl id="poapID">
                 <FormLabel>Poap ID</FormLabel>
                 <Input  type="text" value={this.state.poapID} onChange={this.onChangePoapID}  />
               </FormControl>
   
               <Button
                 bg={"blue.400"}
                 color={"white"}
                 onClick={() => {
                   createPOAP(this.state.poapID);
                 }}
                 _hover={{
                   bg: "blue.500",
                 }}
               >
                 Mint Poap
               </Button>

               <Button
                   bg={"blue.400"}
                   color={"white"}
                   onClick={() => {
                     console.log(getAllPOAPs());
                   }}
                   _hover={{
                     bg: "blue.500",
                   }}
                 >
                   Query POAPs
                 </Button>

             </Stack>
           </Box>
         </Stack>
       </Flex>
    );
  }
}