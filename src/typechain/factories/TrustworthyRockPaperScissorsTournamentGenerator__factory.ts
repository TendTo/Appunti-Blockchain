/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  TrustworthyRockPaperScissorsTournamentGenerator,
  TrustworthyRockPaperScissorsTournamentGeneratorInterface,
} from "../TrustworthyRockPaperScissorsTournamentGenerator";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tournament",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "EndTournament",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tournament",
        type: "address",
      },
    ],
    name: "NewTournament",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "endTournament",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_player0",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_player1",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_targetWins",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_singleMatchFee",
        type: "uint256",
      },
    ],
    name: "startTournament",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612e0d806100206000396000f3fe60806040523480156200001157600080fd5b50600436106200003a5760003560e01c80632a969774146200003f578063d08652ab146200005f575b600080fd5b6200005d60048036038101906200005791906200022f565b6200007f565b005b6200007d600480360381019062000077919062000203565b6200013c565b005b60008484848430604051620000949062000199565b620000a4959493929190620002df565b604051809103906000f080158015620000c1573d6000803e3d6000fd5b5090508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167f4428daf15164e9dee6f7d4057ef1f44751c65f04b08220b0efcdae62e8cd315060405160405180910390a45050505050565b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fcf8084008ceb840485a527e82537fd0041577343bc6084dbe488434e55347a1760405160405180910390a350565b6129ac806200042c83390190565b600081359050620001b881620003c3565b92915050565b600081359050620001cf81620003dd565b92915050565b600081359050620001e681620003f7565b92915050565b600081359050620001fd8162000411565b92915050565b6000602082840312156200021657600080fd5b60006200022684828501620001a7565b91505092915050565b600080600080608085870312156200024657600080fd5b60006200025687828801620001be565b94505060206200026987828801620001be565b93505060406200027c87828801620001ec565b92505060606200028f87828801620001d5565b91505092959194509250565b620002a68162000350565b82525050565b620002b7816200039b565b82525050565b620002c88162000384565b82525050565b620002d9816200038e565b82525050565b600060a082019050620002f660008301886200029b565b6200030560208301876200029b565b620003146040830186620002ce565b620003236060830185620002bd565b620003326080830184620002ac565b9695505050505050565b6000620003498262000364565b9050919050565b60006200035d8262000364565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000620003a882620003af565b9050919050565b6000620003bc8262000364565b9050919050565b620003ce816200033c565b8114620003da57600080fd5b50565b620003e88162000350565b8114620003f457600080fd5b50565b620004028162000384565b81146200040e57600080fd5b50565b6200041c816200038e565b81146200042857600080fd5b5056fe60806040523480156200001157600080fd5b50604051620029ac380380620029ac833981810160405281019062000037919062000698565b8484848173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415620000ac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000a390620007d3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015620001175750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b62000159576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200015090620007b1565b60405180910390fd5b60008160ff1611620001a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000199906200078f565b60405180910390fd5b60405180606001604052808973ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600060038111156200020b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152506000806002811062000249577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548160ff02191690836003811115620002f0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555090505060405180606001604052808873ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000600381111562000361577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152506000600160028110620003a0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548160ff0219169083600381111562000447577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555090505085600660006101000a81548160ff021916908360ff160217905550846007819055506000600860006101000a81548160ff021916908360ff16021790555083600860016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508773ffffffffffffffffffffffffffffffffffffffff166000806002811062000520577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148015620005fa57508673ffffffffffffffffffffffffffffffffffffffff166000600160028110620005ba577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b6200062e577f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b505050505050505062000982565b6000815190506200064d816200091a565b92915050565b600081519050620006648162000934565b92915050565b6000815190506200067b816200094e565b92915050565b600081519050620006928162000968565b92915050565b600080600080600060a08688031215620006b157600080fd5b6000620006c1888289016200063c565b9550506020620006d4888289016200063c565b9450506040620006e78882890162000681565b9350506060620006fa888289016200066a565b92505060806200070d8882890162000653565b9150509295509295909350565b600062000729602283620007f5565b9150620007368262000879565b604082019050919050565b600062000750601e83620007f5565b91506200075d82620008c8565b602082019050919050565b600062000777601983620007f5565b91506200078482620008f1565b602082019050919050565b60006020820190508181036000830152620007aa816200071a565b9050919050565b60006020820190508181036000830152620007cc8162000741565b9050919050565b60006020820190508181036000830152620007ee8162000768565b9050919050565b600082825260208201905092915050565b6000620008138262000842565b9050919050565b6000620008278262000842565b9050919050565b60006200083b8262000806565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b7f5461726765742077696e73206d7573742062652067726561746572207468616e60008201527f2030000000000000000000000000000000000000000000000000000000000000602082015250565b7f426f746820706c6179657273206d757374206265207370656369666965640000600082015250565b7f506c6179657273206d75737420626520646966666572656e7400000000000000600082015250565b62000925816200081a565b81146200093157600080fd5b50565b6200093f816200082e565b81146200094b57600080fd5b50565b620009598162000862565b81146200096557600080fd5b50565b62000973816200086c565b81146200097f57600080fd5b50565b61201a80620009926000396000f3fe6080604052600436106100915760003560e01c80638b5b9ccc116100595780638b5b9ccc1461014c5780639733526b14610177578063b185e21e146101a2578063bfc8876c146101ac578063c9591ff0146101b657610091565b806305c5f7dc1461009657806313628561146100c1578063344b50b0146100cb5780635cd3f618146100f657806364a0b94814610121575b600080fd5b3480156100a257600080fd5b506100ab6101e1565b6040516100b89190611cac565b60405180910390f35b6100c96101e7565b005b3480156100d757600080fd5b506100e061039f565b6040516100ed9190611cc7565b60405180910390f35b34801561010257600080fd5b5061010b6103b6565b6040516101189190611bed565b60405180910390f35b34801561012d57600080fd5b50610136610613565b6040516101439190611bd2565b60405180910390f35b34801561015857600080fd5b506101616106b8565b60405161016e9190611bb7565b60405180910390f35b34801561018357600080fd5b5061018c6107f5565b6040516101999190611cc7565b60405180910390f35b6101aa610808565b005b6101b46109c0565b005b3480156101c257600080fd5b506101cb610b78565b6040516101d89190611cc7565b60405180910390f35b60075481565b60008060028110610221577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061030f575060006001600281106102b8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61034e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034590611c8c565b60405180910390fd5b600754341015610393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038a90611c4c565b60405180910390fd5b61039d6001610b8b565b565b6000600860009054906101000a900460ff16905090565b6000806000600281106103f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806104e057506000600160028110610489577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61051f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051690611c8c565b60405180910390fd5b60008060006002811061055b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105bc5760016105bf565b60005b60ff16600281106105f9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160009054906101000a900460ff16905090565b61061b6119a8565b604051806040016040528060008060028110610660577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160010154815260200160006001600281106106a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160010154815250905090565b6106c06119ca565b604051806040016040528060008060028110610705577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016000600160028110610799577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250905090565b600660009054906101000a900460ff1681565b60008060028110610842577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610930575060006001600281106108d9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61096f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096690611c8c565b60405180910390fd5b6007543410156109b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ab90611c4c565b60405180910390fd5b6109be6003610b8b565b565b600080600281106109fa577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610ae857506000600160028110610a91577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610b27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1e90611c8c565b60405180910390fd5b600754341015610b6c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6390611c4c565b60405180910390fd5b610b766002610b8b565b565b600860009054906101000a900460ff1681565b600080600060028110610bc7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c28576001610c2b565b60005b90506000816001610c3c9190611d4d565b905060008260ff1660028110610c7b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160009054906101000a900460ff166003811115610cc8577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60006003811115610d02577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610d42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3990611c6c565b60405180910390fd5b60008160ff1660028110610d7f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160009054906101000a900460ff166003811115610dcc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60006003811115610e06577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415610ea3578260008360ff1660028110610e4a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160006101000a81548160ff02191690836003811115610e99577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550611196565b6000808360ff1614610f0f57610f0a60008360ff1660028110610eef577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160009054906101000a900460ff168561119b565b610f6b565b610f6a8460008460ff1660028110610f50577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160009054906101000a900460ff1661119b565b5b90506000808460ff1660028110610fab577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160006101000a81548160ff02191690836003811115610ffa577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506000808360ff166002811061103d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160020160006101000a81548160ff0219169083600381111561108c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506008600081819054906101000a900460ff16809291906110b090611e93565b91906101000a81548160ff021916908360ff1602179055505060028160ff16101561118c577fc41a368683277b7b00d889d01ea0292636f1ad97cd87230e0a39ecb0c607a0ab60008260ff161461110857600161110b565b60005b600860009054906101000a900460ff16604051611129929190611c23565b60405180910390a160008160ff166002811061116e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60030201600101600081548092919061118690611e4a565b91905055505b6111946115af565b505b505050565b6000600160038111156111d7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b836003811115611210577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561131e5760038081111561124f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611288577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561129757600090506115a9565b600260038111156112d1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b82600381111561130a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561131957600190506115a9565b6115a4565b600380811115611357577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b836003811115611390577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561149f57600260038111156113d0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611409577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561141857600090506115a9565b60016003811115611452577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b82600381111561148b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561149a57600190506115a9565b6115a3565b600160038111156114d9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611512577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561152157600090506115a9565b60038081111561155a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826003811115611593577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156115a257600190506115a9565b5b5b600290505b92915050565b600660009054906101000a900460ff1660ff16600080600281106115fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160010154106117a9577fdbdb7ff6ad5dd06019733b282a8b285260ffb8e9afd91ee018686586a2aeeda260006040516116399190611c08565b60405180910390a1600860019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d08652ab600080600281106116b9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b81526004016116fd9190611b9c565b600060405180830381600087803b15801561171757600080fd5b505af115801561172b573d6000803e3d6000fd5b5050505060008060028110611769577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600660009054906101000a900460ff1660ff1660006001600281106117f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160010154106119a6577fdbdb7ff6ad5dd06019733b282a8b285260ffb8e9afd91ee018686586a2aeeda260016040516118349190611c08565b60405180910390a1600860019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d08652ab60006001600281106118b5577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b81526004016118f99190611b9c565b600060405180830381600087803b15801561191357600080fd5b505af1158015611927573d6000803e3d6000fd5b505050506000600160028110611966577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6040518060400160405280600290602082028036833780820191505090505090565b6040518060400160405280600290602082028036833780820191505090505090565b60006119f88383611a2b565b60208301905092915050565b6000611a108383611b6f565b60208301905092915050565b611a2581611df0565b82525050565b611a3481611d81565b82525050565b611a4381611cf6565b611a4d8184611d26565b9250611a5882611ce2565b8060005b83811015611a89578151611a7087826119ec565b9650611a7b83611d0c565b925050600181019050611a5c565b505050505050565b611a9a81611d01565b611aa48184611d31565b9250611aaf82611cec565b8060005b83811015611ae0578151611ac78782611a04565b9650611ad283611d19565b925050600181019050611ab3565b505050505050565b611af181611e02565b82525050565b611b0081611e14565b82525050565b6000611b13601383611d3c565b9150611b1e82611f1b565b602082019050919050565b6000611b36601a83611d3c565b9150611b4182611f44565b602082019050919050565b6000611b59602383611d3c565b9150611b6482611f6d565b604082019050919050565b611b7881611dd9565b82525050565b611b8781611dd9565b82525050565b611b9681611de3565b82525050565b6000602082019050611bb16000830184611a1c565b92915050565b6000604082019050611bcc6000830184611a3a565b92915050565b6000604082019050611be76000830184611a91565b92915050565b6000602082019050611c026000830184611ae8565b92915050565b6000602082019050611c1d6000830184611af7565b92915050565b6000604082019050611c386000830185611af7565b611c456020830184611b8d565b9392505050565b60006020820190508181036000830152611c6581611b06565b9050919050565b60006020820190508181036000830152611c8581611b29565b9050919050565b60006020820190508181036000830152611ca581611b4c565b9050919050565b6000602082019050611cc16000830184611b7e565b92915050565b6000602082019050611cdc6000830184611b8d565b92915050565b6000819050919050565b6000819050919050565b600060029050919050565b600060029050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600082825260208201905092915050565b6000611d5882611de3565b9150611d6383611de3565b925082821015611d7657611d75611ebd565b5b828203905092915050565b6000611d8c82611db9565b9050919050565b6000819050611da182611fbc565b919050565b6000819050611db482611fd0565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611dfb82611e26565b9050919050565b6000611e0d82611d93565b9050919050565b6000611e1f82611da6565b9050919050565b6000611e3182611e38565b9050919050565b6000611e4382611db9565b9050919050565b6000611e5582611dd9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611e8857611e87611ebd565b5b600182019050919050565b6000611e9e82611de3565b915060ff821415611eb257611eb1611ebd565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4d696e696d756d20666565206e6f74206d657400000000000000000000000000600082015250565b7f506c6179657220616c7265616479206d6164652061206d6f7665000000000000600082015250565b7f4f6e6c7920706c61796572732063616e2063616c6c20746869732066756e637460008201527f696f6e0000000000000000000000000000000000000000000000000000000000602082015250565b60048110611fcd57611fcc611eec565b5b50565b60028110611fe157611fe0611eec565b5b5056fea2646970667358221220500dc78104a4c9279da53ea70ed64e0745bb904445cdd1af81e28e471dab211564736f6c63430008040033a264697066735822122058238e0caec8a93bce28fc00ecb5ec3113d514d7d05cfade3609ef0db1abaeda64736f6c63430008040033";

type TrustworthyRockPaperScissorsTournamentGeneratorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TrustworthyRockPaperScissorsTournamentGeneratorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TrustworthyRockPaperScissorsTournamentGenerator__factory extends ContractFactory {
  constructor(
    ...args: TrustworthyRockPaperScissorsTournamentGeneratorConstructorParams
  ) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TrustworthyRockPaperScissorsTournamentGenerator> {
    return super.deploy(
      overrides || {}
    ) as Promise<TrustworthyRockPaperScissorsTournamentGenerator>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(
    address: string
  ): TrustworthyRockPaperScissorsTournamentGenerator {
    return super.attach(
      address
    ) as TrustworthyRockPaperScissorsTournamentGenerator;
  }
  override connect(
    signer: Signer
  ): TrustworthyRockPaperScissorsTournamentGenerator__factory {
    return super.connect(
      signer
    ) as TrustworthyRockPaperScissorsTournamentGenerator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrustworthyRockPaperScissorsTournamentGeneratorInterface {
    return new utils.Interface(
      _abi
    ) as TrustworthyRockPaperScissorsTournamentGeneratorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrustworthyRockPaperScissorsTournamentGenerator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TrustworthyRockPaperScissorsTournamentGenerator;
  }
}
