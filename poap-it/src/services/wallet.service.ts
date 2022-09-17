import axios, { AxiosRequestConfig } from 'axios';
import { ethers } from 'ethers';

const POAP_API_KEY = '';
const POAP_API_TOKEN = '';
const DUNE_API_QUERY_ID = ''
const DUNE_API_KEY = ''

export function InitWallet() {
    let masterWallet = ethers.Wallet.createRandom();
    console.log("wallet", masterWallet)
    localStorage.setItem('masterWalletAddress', masterWallet.address);
    localStorage.setItem('masterWalletMnemonic', String(masterWallet.mnemonic.phrase));
}

export function getMasterWallet(): ethers.Wallet {
    let walletString = localStorage.getItem('masterWalletAddress')
    if (walletString === null || walletString === '') {
        InitWallet();
        walletString = localStorage.getItem('masterWalletAddress')
    }
    return JSON.parse(walletString!)
}

export async function createPOAP(poapHash: string) {
    // const wallet = getMasterWallet();
    let isNotEmptySubwallet = true;
    let mnemonic_phrase = localStorage.getItem('masterWalletMnemonic')
    let masterWallet: ethers.utils.HDNode = ethers.utils.HDNode.fromMnemonic(String(mnemonic_phrase));
    let index = 0;
    let subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);
    let i = 10
    while (i != 0 && isNotEmptySubwallet) {
        i--;
        subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);
        index++;
        // Execute Dune Query
        console.log("url posted to:", 'https://api.dune.com/api/v1/query/' + DUNE_API_QUERY_ID + '/execute')
        const duneExecutionsOptions = {
            method: 'POST',
            url: 'https://api.dune.com/api/v1/query/' + DUNE_API_QUERY_ID + '/execute?Address=' + subWallet.address,
            headers: {
                // 'accept': 'application/json',
                'x-dune-api-key': DUNE_API_KEY,
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials':true
                // authorization: 'Bearer ' + POAP_API_TOKEN
            },
            data: {
                "query_parameters": {
                    "Address": subWallet.address
                }
            }

        };
        console.log(subWallet.address)
        let executionID: string = '';
        await axios
            //@ts-ignore
            .request(duneExecutionsOptions)
            .then(function (respose) {
                executionID = respose.data.execution_id;
                console.log(executionID);
            })
            .catch(function (error) {
                console.error(error);
            });

        // Query Result
        const duneResultOptions = {
            method: 'GET',
            url: 'https://api.dune.com/api/v1/execution/' + executionID + '/results',
            headers: {
                // 'accept': 'application/json',
                'x-dune-api-key': DUNE_API_KEY,
                // 'authorization': 'Bearer ' + POAP_API_TOKEN,
                // 'Access-Control-Allow-Origin': '*'
            }
        };
        await new Promise(f => setTimeout(f, 5000));

        await axios
            //@ts-ignore
            .request(duneResultOptions)
            .then(function (response) {
                console.log(response.data)
                let duneQueryResult = response.data;
                if (duneQueryResult.result) {
                    if (duneQueryResult.result.rows.length === 0) isNotEmptySubwallet = false;
                }

                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }



    // Get POAP API Secret
    
    const secretFetchOptions = {
        method: 'GET',
        url: 'https://api.dune.com/api/v1/execution/01GD6WJ47R4DSTD0C0BFBTB2P6/results',
        headers: {
            // accept: 'application/json',
            // 'Access-Control-Allow-Origin': "http://localhost:3000",
            // 'Access-Control-Allow-Credentials': 'true',
            // 'authorization': 'Bearer ' + POAP_API_TOKEN,
            'X-API-Key': POAP_API_KEY,
        }
    };

    let secretString: string = '';

    await axios
        .request(secretFetchOptions)
        .then(function (respose) {
            secretString = respose.data.secret
            console.log(secretString);
        })
        .catch(function (error) {
            console.error(error);
        });


    // Mint POAP
    const poapMintOptions = {
        method: 'POST',
        url: 'https://api.poap.tech/actions/claim-qr',
        headers: {
            // accept: 'application/json',
            // 'content-type': 'application/json',
            'X-API-Key': 'b',
            'authorization': 'Bearer ' + POAP_API_TOKEN
        },
        data: {
            sendEmail: true,
            address: subWallet.address,
            qr_hash: poapHash,
            secret: secretString
        }
    };

    let poap;

    await axios
        .request(poapMintOptions)
        .then(function (response) {
            poap = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
}
