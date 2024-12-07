import { createPublicClient, createWalletClient, formatEther, http, parseEther, publicActions, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts"
import { ganache } from "./ganache";
import { ViemClient, ViemContract } from "./viemc";
// import StorageJSON from "./contracts/Storage.json";
import { BasedBetsInterface } from './basedbets_interface';

const API_URL = "https://7289-163-47-210-29.ngrok-free.app";

export async function basedbets_e2e({ }) {

    // --------------------- Account Setup ---------------------------
    const members = {
        a: '0x89249d7a5bab4f9ad15d67e83d2e0cdfecf08e5d00046fa6c5efbc39def48972',
        b: '0xee5ddae69b02bb1b76e079e81ccc553441e383e7a770e79d1c637a5577027b53',
        c: '0x722e12c5ab76c85051d35bdbd1a18f724ebed4b2a6f3ffe34e0d56db076a0eff',
        platform: '0x5d31428d5148b74b22152750f7295b8f5ac5edb7c15f617d3b1a29114b023dde',
    }
    const _createViemClient = (privateKey) => new ViemClient({
        walletClient: createWalletClient({
            account: privateKeyToAccount(privateKey),
            chain: ganache,
            transport: http(API_URL)
        })
    },);
    const memberClients = {
        a: _createViemClient(members.a),
        b: _createViemClient(members.b),
        c: _createViemClient(members.c),
        platform: _createViemClient(members.platform),
    }
    // --------------------- Account Setup ---------------------------  

    //--------------------Deploy the Contract-------------------------
    // const flashfund = await BasedBetsInterface.createFlashFund({ client: memberClients.platform, initialValuation, infusedCapital, loanShare, loanShareName });
    // console.log('DEPLOYED_CONTRACT_ADDRESS', flashfund.contractAddress)

    //Get the Intial Balance
    // const cfbal = await flashfund.read({ method: 'getBalance' });
    // console.log('INITIAL_CONTRACT_BALANCE', formatEther(cfbal))
    // console.log('Contract Deployment Successful!');
    //--------------------Deploy the Contract-------------------------

    //getting a member's balance:
    // const balanceM = await memberClients.a.getBalance({ mode: 'ether' });

    //Calling Functions (as usual)
}