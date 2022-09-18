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
  import { getMasterWallet, createPOAP } from "../services/wallet.service";
  
  type State = {
    poapID: string;
    masterWalletAddress: string;
  };
  
  export class MintPoap extends React.Component< State> {
    state = {
      poapID: "",
      masterWalletAddress: localStorage.getItem('masterWalletAddress') ?? "No Master Wallet"
    };
  
    // typing on RIGHT hand side of =
    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ poapID: e.currentTarget.value });
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
                   Step 1:
                   {this.state.masterWalletAddress}
                 </Text>
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
                   <Input  type="text" value={this.state.poapID} onChange={this.onChange}  />
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
               </Stack>
             </Box>
           </Stack>
         </Flex>
      );
    }
  }