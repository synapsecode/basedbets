import { createPublicClient, createWalletClient, formatEther, http, parseEther, publicActions, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts"
import { ganache } from "./ganache";
import { ViemClient, ViemContract } from "./viemc";
// import StorageJSON from "./contracts/Storage.json";
import { BasedBetsInterface } from "./basedbets_interface";

const API_URL = "https://ba40-14-195-142-82.ngrok-free.app"

export async function basedbets_e2e({ treasury }) {

    // --------------------- Account Setup ---------------------------
    const members = {
        a: '0xff2b5b94122182537f302af22d17ab060f975ba8a48f0b18c72daaafc2c9440a',
        b: '0xbb65b54774c62dc3643fdbbb31c8578bda340b4f52b87edf1a649a8cdfa98024',
        c: '0xf3bbcd6d602f391eaafb267320d3b045dca4251c64699a327713463b7665ab81',
        platform: '0x0794e28fca63569efada8943a5ce4020fd72fc913b53c017c9855a6538f75770',
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
    const basedbet = await BasedBetsInterface.createBasedBet({ treasury });
    console.log('DEPLOYED_CONTRACT_ADDRESS', flashfund.contractAddress)

    const cfbal = await basedbet.read({ method: 'getBalance' });
    console.log('INITIAL_CONTRACT_BALANCE', formatEther(cfbal))
    console.log('Contract Deployment Successful!');
    //--------------------Deploy the Contract-------------------------


    console.log('Fetch Initial Balances');
    const balanceA = await memberClients.a.getBalance({ mode: 'ether' });
    const balanceB = await memberClients.b.getBalance({ mode: 'ether' });
    const balanceC = await memberClients.c.getBalance({ mode: 'ether' });
    console.log('ORIGINAL_BALANCE(ABC):', [balanceA, balanceB, balanceC]);

    // ----------- Buy Shares --------
    console.log('Buy Shares')
    await BasedBetsInterface.placeBet({ basedbet, client: memberClients.a, amount: 0.125 });
    await BasedBetsInterface.placeBet({ basedbet, client: memberClients.b, amount: 0.05 });
    await BasedBetsInterface.placeBet({ basedbet, client: memberClients.c, amount: 0.025 });

    //--------------------Fetch their Balances again-------------------------
    const balanceA2 = await memberClients.a.getBalance({ mode: 'ether' });
    const balanceB2 = await memberClients.b.getBalance({ mode: 'ether' });
    const balanceC2 = await memberClients.c.getBalance({ mode: 'ether' });
    console.log('POST_SHAREBUY_BALANCES(ABC):', [balanceA2, balanceB2, balanceC2]);
    //--------------------Fetch their Balances again-------------------------

    let contractbal = await basedbet.read({ method: 'getBalance' });
    console.log('POST_DEPOSIT_CONTRACT_BALANCE:', formatEther(contractbal));

    //------------Loan Repayment-------
    await BasedBetsInterface.settleBet({ basedbet });

    //--------------------Fetch their Balances again-------------------------
    const balanceA3 = await memberClients.a.getBalance({ mode: 'ether' });
    const balanceB3 = await memberClients.b.getBalance({ mode: 'ether' });
    const balanceC3 = await memberClients.c.getBalance({ mode: 'ether' });
    console.log('POST_REPAYMENT_BALANCES(ABC):', [balanceA3, balanceB3, balanceC3]);
    //--------------------Fetch their Balances again-------------------------
}