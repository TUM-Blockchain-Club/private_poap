import axios, { AxiosRequestConfig } from 'axios';
import { ethers } from 'ethers';
import { Poap } from '../components/seePoap';

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



export async function getPOAPInfo(poap_id:number): Promise<string> {

    var config = {
        method: 'get',
        url: 'https://api.poap.tech/token/' + poap_id,
        headers: {
            'X-API-Key': POAP_API_KEY,
        },
    };

    let result = await axios(config)
        .then(function (response) {

            var result = JSON.stringify(response.data)
            console.log(result)
            return result
        })
        .catch(function (error) {
            console.log(error);
            return "{}"
        });

        return result
}

export async function getAllPOAPs() :  Promise<Poap[]>{

    // TODO get poaps

    let collection = await parsePOAPCollection()
    let asset_list: Poap[] = []

    console.log(collection)

    collection.forEach(async (e)=>{

    let poap_info = JSON.parse(await getPOAPInfo(e)) as Poap
    console.log()
    asset_list.push(poap_info)
        
    })

    console.log(asset_list)

    return asset_list

}

export function getMasterWallet(): ethers.Wallet {
    let walletString = localStorage.getItem('masterWalletAddress')
    if (walletString === null || walletString === '') {
        InitWallet();
        walletString = localStorage.getItem('masterWalletAddress')
    }
    console.log(walletString)
    return JSON.parse(JSON.stringify(walletString!))
}

export async function parsePOAPCollection() {
    let isEmptySubwallet = false;
    let mnemonic_phrase = localStorage.getItem('masterWalletMnemonic')
    let masterWallet: ethers.utils.HDNode = ethers.utils.HDNode.fromMnemonic(String(mnemonic_phrase));
    let index = 0;
    let subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);
    let i = 10;

    let mapWalletPOAP = new Map();//[['key1', 'value1'], ['key2', 'value2'], ['keyn', 'valuen']]);

    while (i != 0 && !isEmptySubwallet) {
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
                    if (duneQueryResult.result.rows.length === 0) isEmptySubwallet = true;
                    else mapWalletPOAP.set(subWallet.address, duneQueryResult.result.rows[0].tokenId);

                }
                
                
                console.log(mapWalletPOAP);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return mapWalletPOAP
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

    var data = '';
    let secretString: string = '';

    var config = {
        method: 'get',
        url: 'https://api.poap.tech/actions/claim-qr?qr_hash=' + poapHash,
        headers: {
            'X-API-Key': POAP_API_KEY,
            'Authorization': 'Bearer ' + POAP_API_TOKEN
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            secretString = response.data.secret;
            console.log("secretstrin", secretString);
            var data = JSON.stringify({
                "secret": secretString,
                "qr_hash": poapHash,
                "address": subWallet.address
            });
            console.log(data)
            var config1 = {
                method: 'post',
                url: 'https://api.poap.tech/actions/claim-qr',
                headers: {
                    'X-API-Key': POAP_API_KEY,
                    'Authorization': 'Bearer ' + POAP_API_TOKEN,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config1)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });


}
