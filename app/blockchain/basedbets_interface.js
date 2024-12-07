import BasedBetsJSON from "../../artifacts/contracts/BasedBet.sol/BasedBet.json";
import { ganache } from "./ganache";
import { ViemClient, ViemContract } from "./viemc";
import { createWalletClient, formatEther, http, parseEther, publicActions, getContract, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts"

//============GANACHE==============
const CHAIN = ganache;
// const RPC = process.env.NEXT_PUBLIC_API_URL;
const RPC = "https://7289-163-47-210-29.ngrok-free.app"
const platformClientPVK = "0x5d31428d5148b74b22152750f7295b8f5ac5edb7c15f617d3b1a29114b023dde"
//=================================

//============POLYGON==============
// const CHAIN = polygonAmoy;
// const RPC = "https://polygon-amoy.g.alchemy.com/v2/Q9_DTST1PIaTKcaPjvkURoBlR8gq8omM";
//============POLYGON==============

//BasedBet's own private client
const platformClient = new ViemClient({
    walletClient: createWalletClient({
        account: privateKeyToAccount(platformClientPVK),
        chain: CHAIN,
        transport: http(RPC)
    })
},);

export class BasedBetsInterface {

    static fromContractAddress = async ({ contractAddress }) => {
        const factory = ViemContract.fromCompiledContract({ compiledContract: BasedBetsJSON, deployedAddress: contractAddress });
        factory.connect({ client: platformClient });
        return factory;
    }


    static createMetaMaskClient = async ({ wallet }) => {
        const { ethereum } = window
        if (!ethereum) return alert("Please install MetaMask!")
        // const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        // const account = accounts[0]
        return new ViemClient({
            walletClient: createWalletClient({
                account: wallet,
                chain: CHAIN,
                transport: custom(ethereum),
            }),
        })
    }

    static createBasedBet = async ({ client, treasury }) => {
        const factory = ViemContract.fromCompiledContract({ compiledContract: BasedBetsJSON });
        factory.connect({ client: client });
        const { hash: deploymentHash, contract } = await factory.deploy({
            params: [treasury],
        });
        contract.connect({ client: platformClient })
        console.log('DEPLOYED_CONTRACT_HASH', deploymentHash);
        return contract;
    }

    static getBalance = async ({ basedbet }) => {
        basedbet.connect({ client: platformClient });
        const cfbal = await contract.read({ method: 'getBalance' });
        return Number(formatEther(cfbal))
    }

    static placeBet = async ({ basedbet, client, amount }) => {
        basedbet.connect({ client });
        await basedbet.write({
            method: 'placeBet',
            valueInEth: String(amount),
        });
        basedbet.connect({ client: platformClient });
    }

    static settleBet = async ({ basedbet }) => {
        basedbet.connect({ platformClient });
        await contract.write({
            method: 'settle',
        });
        basedbet.connect({ client: platformClient });
    }

    /*
    Basic Reference
    
    1. Reading Variables
    static getBalance = async ({ contract }) => {
        contract.connect({ client: platformClient });
        const cfbal = await contract.read({ method: 'getBalance' });
        return Number(formatEther(cfbal))
    }

    2. Calling Functions (as a Client)
     static recieveLoanAmount = async ({ contract, client }) => {
        contract.connect({ client }); //connect the current client to the provided contract
        await contract.write({
            method: 'recieveLoanAmount',
        });
        contract.connect({ client: platformClient });
    }

    3. Deploy Contract
    static createContract = async ({ client, ... }) => {
        const factory = ViemContract.fromCompiledContract({ compiledContract: BasedBetsJSON });
        factory.connect({ client: client });
        const { hash: deploymentHash, contract } = await factory.deploy({
            params: [...],
        });
        contract.connect({ client: platformClient })
        console.log('DEPLOYED_CONTRACT_HASH', deploymentHash);
        return contract;
    }

    4. Pay to a Payable Function
    static buy = async ({ contract, client, amount }) => {
        contract.connect({ client }); 
        await contract.write({
            method: 'buy',
            valueInEth: String(amount),
        });
        contract.connect({ client: platformClient });
    }
    */
}