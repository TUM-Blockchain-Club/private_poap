import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Image,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Divider,
    Badge,
} from "@chakra-ui/react";
import React from "react";
import { getMasterWallet, createPOAP, getAllPOAPs } from "../services/wallet.service";

type State = {
    masterWalletAddress: string;
    masterWalletMemonic: string;
    poaps: Poap[];
};

export interface Event {
    id: number;
    fancy_id: string;
    name: string;
    event_url: string;
    image_url: string;
    country: string;
    city: string;
    description: string;
    year: number;
    start_date: string;
    end_date: string;
    expiry_date: string;
}

export interface Supply {
    total: number;
    order: number;
}

export interface Poap {
    event: Event;
    tokenId: string;
    owner: string;
    layer: string;
    created: string;
    supply: Supply;
}
function CardList(obj: Poap[]) {

    console.log(obj)
    
    const listItems = obj.map((poap) => (
        <div>
            <li>
                <PoapCard {...poap} />
            </li>
        </div>

));
    return <ul>{listItems}</ul>;

}

export const PoapCard = ({
    event,
    tokenId,
    owner,
    layer,
    created,
    supply,
}: Poap) => (
    <Flex p={50} w="90%" alignItems="center" justifyContent="center" bg="gray.100" m={5} rounded="3xl" boxShadow={"lg"}>
        <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            maxW="lg"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
        >
            <Image
                src={event.image_url}
                width="100px"
                alt={`Picture of ${event.name}`}
                roundedTop="lg"
            />
        </Box>
        <Box flex="1">
            <Text fontWeight="semibold">{event.name}</Text>
            <Text>{owner}</Text>
        </Box>





        {/* <Box p="6">
        {event.name}
          <Box display="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight">
              {event.name}
            </Box>
          </Flex>
  
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight">
              {owner}
            </Box>
          </Flex>
        </Box> */}
    </Flex>
);

export class SeePoap extends React.Component<State> {
    state = {
        masterWalletMemonic:
            localStorage.getItem("masterWalletMnemonic") ?? "No Master Wallet",
        masterWalletAddress: localStorage.getItem("masterWalletAddress") ?? "",
        poaps:[]
        // poaps: [{"event":{"id":62659,"fancy_id":"walletconnect-eth-berlin-2022-2022","name":"WalletConnect @ ETH Berlin 2022","event_url":"https://walletconnect.com","image_url":"https://assets.poap.xyz/walletconnect-eth-berlin-2022-2022-logo-1661801790740.png","country":"Germany","city":"Berlin","description":"Visit to the WalletConnect booth at the ETH Berlin 2022","year":2022,"start_date":"16-Sep-2022","end_date":"18-Sep-2022","expiry_date":"16-Oct-2022"},"tokenId":"5640378","owner":"0xa292a61c9c500764851e04feb078c49e4ec2f803","layer":"Layer2","created":"2022-09-18 01:52:05","supply":{"total":104,"order":103}}]
    };

    // typing on RIGHT hand side of =

    onChangeAddress = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ masterWalletAddress: e.currentTarget.value });
    };

    onChangeMemonic = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ masterWalletMemonic: e.currentTarget.value });
    };

    updatePoaps = async (): Promise<void> => {
        console.log("set state")
        let poaps = await getAllPOAPs();
        console.log(poaps)
        this.setState({ poaps: poaps });
    };

    render() {



        return <div>
            <Button
                bg={"blue.400"}
                color={"white"}
                onClick={() => {
                    this.updatePoaps();
                }}
                _hover={{
                    bg: "blue.500",
                }}
            >
                Query POAPs
            </Button>
            <ul>{this.state.poaps.map((poap) => (
        <div>
            <li>
            {/* <PoapCard {...poap} /> */}
            </li>
        </div>

))}
</ul>
           


        </div>



    }
}