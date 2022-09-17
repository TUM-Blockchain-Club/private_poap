import axios from 'axios';
import {ethers} from 'ethers';

const POAP_API_KEY = '';
const POAP_API_TOKEN = '';
const DUNE_API_QUERY_ID = '1279140'
const DUNE_API_KEY = ''

export function InitWallet() {
    let masterWallet = ethers.Wallet.createRandom();
    localStorage.setItem('masterWallet', JSON.stringify(masterWallet));
}

export function getMasterWallet(): ethers.Wallet {
    let walletString = localStorage.getItem('masterWallet')
    if (walletString === null || walletString === '') {
        InitWallet();
        walletString = localStorage.getItem('masterWallet')
    }
    return JSON.parse(walletString!)
}

export async function createPOAP(poapHash: string) {
    const wallet = getMasterWallet();
    let isNotEmptySubwallet = true;
    let masterWallet: ethers.utils.HDNode = ethers.utils.HDNode.fromMnemonic(wallet.mnemonic.phrase);
    let index = 0;
    let subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);

    while (isNotEmptySubwallet) {
        let subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);
        index++;
        // Execute Dune Query
        const duneExecutionsOptions = {
            method: 'POST',
            url: 'https://api.dune.com/api/v1/query/' + DUNE_API_QUERY_ID + '/execute?Address=' + subWallet.address,
            headers: {
                accept: 'application/json',
                'x-dune-api-key': DUNE_API_KEY,
                authorization: 'Bearer ' + POAP_API_TOKEN
            }
        };

        let executionID: string = '';
        await axios
            .request(duneExecutionsOptions)
            .then(function (respose) {
                executionID = respose.data.execution_id;
                console.log(respose);
            })
            .catch(function (error) {
                console.error(error);
            });

        // Query Result
        const duneResultOptions = {
            method: 'GET',
            url: 'https://api.dune.com/api/v1/execution/' + executionID + '/results',
            headers: {
                accept: 'application/json',
                'x-dune-api-key': DUNE_API_KEY,
                authorization: 'Bearer ' + POAP_API_TOKEN
            }
        };

        await axios
            .request(duneExecutionsOptions)
            .then(function (respose) {
                let duneQueryResult = respose.data;
                if (duneQueryResult.result.rows.length === 0) isNotEmptySubwallet = false;
                console.log(respose);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Get POAP API Secret
    /*const secretFetchOptions = {
        method: 'GET',
        url: 'https://api.poap.tech/actions/claim-qr?qr_hash=' + poapHash,
        headers: {
            accept: 'application/json',
            'X-API-Key': POAP_API_KEY,
            authorization: 'Bearer ' + POAP_API_TOKEN
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
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-Key': 'b',
            authorization: 'Bearer ' + POAP_API_TOKEN
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
        });*/
}
