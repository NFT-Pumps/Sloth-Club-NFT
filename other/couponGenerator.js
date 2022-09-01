//npx hardhat run .\other\couponGenerator.js 
const { ethers } = require("hardhat");
const fs = require("fs");

  
const {
    keccak256,
    toBuffer,
    ecsign,
    bufferToHex,
} = require("ethereumjs-utils");

let signerPvtKey1 = process.env.SigPK;

//const signerPvtKey = Buffer.from(signerPvtKey1.substring(2,66), "hex");
const signerPvtKey = Buffer.from(signerPvtKey1, "hex");


let coupons = {};

async function getClaimCodes() {
    //const [owner, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();

    let presaleAddresses = [
        { address : '0xEFd6E29eD1b602B4d0410bF008Bd667562DF1013', qty : 1},
        { address : '0xf0becf82a1826a1B2f0c47E5317866894f3aa0af', qty : 2},
        { address : '0xfa9e0c7D2f7133218818E4d2E2CaA3517e431a8a', qty : 1},
        { address : '0xb5C1aCa842A6893dDe19D303c7a87347bA2d2A97', qty : 1},
        { address : '0xa793EBC07b3c44123933c3e4e2b0A7807FEE8257', qty : 2},
        { address : '0x7f694af8993fe6d4a706f8ec7cfbd71ce8be39a2', qty : 2},
        { address : '0x5868C525c939837bFd8930044C9269A5C2816Fd6', qty : 4},
        { address : '0x43a7bDDD1A99571bc965c9092808dea0E8bcE647', qty : 1},
        { address : '0x615B9949865eff0397EDE1Cab77eCA60Fe8b26a2', qty : 2},
        { address : '0x3470151D1c87597623E53FaE98E4Bc585e6cC709', qty : 1},
        { address : '0x3006e2b2A605064925425a3eB7CbD1B3F82BC56b', qty : 1},
        { address : '0xDf2cDcfD31F2F69fd9393D0630694f39F8506DF1', qty : 1},
        { address : '0xc6ddD3E9e2debb5247877Fc16160963682b6d1B3', qty : 2},
        { address : '0x0175029133873c3C855aB955c368060409B9d527', qty : 1},
        { address : '0xb5fa23305DEd70D73441914cb24467790F09Edb8', qty : 3},
        { address : '0x94DaF820277d09D2124A922609161974361aF459', qty : 1},
        { address : '0xe8Fff56eBC79a8A66D2295750e7ec9991410C502', qty : 1},
        { address : '0x51a8B04E69B1E8AEc0A110A9E9Ff9870377b1993', qty : 1},
        { address : '0x95BFf33f83E7433e4aD9b05b1080A1f66bE80eCE', qty : 2},
        { address : '0xB1422a9945256CFa1dfAf9E8f05966ee4ce78A90', qty : 1},
        { address : '0x3E924f14779a6e32f832f4Db3471045edD95900D', qty : 1},
        { address : '0xFAb4936A514d86Ec1d418803508Cc785b70F08e6', qty : 2},
        { address : '0xE335E5e9c285F09Af2F9945Eb141eB71aa1b581D', qty : 2},
        { address : '0xe729EB1F929d05830558a3F0149caEcab1E2725F', qty : 1},
        { address : '0x9562Aa6967827DBdD0B32bb209FB4F97954d3835', qty : 1},
        { address : '0xfDbB6bA767d1728d1283f7c61f62310ed473Eb2A', qty : 1},
        { address : '0xB57d8618AaB5dA16ef48B557ff150fDa53B7Cf0D', qty : 2},
        { address : '0xE4d4bCD859C05aC9Ed600ef62c6C84E54B087409', qty : 1},
        { address : '0xf936dB364E19E4FF8A4644Be149188d039427C2A', qty : 1},
        { address : '0xe1b024805bd419a61da24181dd9d0bd0db1d6363', qty : 2},
        { address : '0x4bf10a8e27dcb85680def683849b6f94b7d9176a', qty : 2},
        { address : '0xDF740AD3D23182cbD8600321796b888A63C1478d', qty : 1},
        { address : '0xCd43AdcB61949ab14D3f4574BFbDA53d46389715', qty : 1},
        { address : '0x35A2547B05204Fa31b590F094e2Ced589F588208', qty : 1},
        { address : '0xE46AFc89d9075D7a7503A9F41Fc21d8135514fC2', qty : 1},
        { address : '0xfD1b7c0f6FBAeB20fCC6C02A027FD3d8959e648e', qty : 1},
        { address : '0x3404f2b4C854e16e899E4A601CFe25B53518b62d', qty : 1},
        { address : '0xd027A4955d011630a380eE7d1b840f12FE16AE2B', qty : 2},
        { address : '0x0FfE7de0B1cb7e2522f0435B4D7172AD4F491446', qty : 1},
        { address : '0x943Ba25A25AC20A63f53Fb4a72489c3bCA290712', qty : 4},
        { address : '0xF498e3362f173e0a8f311Eb9dBb78331188eb362', qty : 1},
        { address : '0xaF88a198559D08B5932a5dF63b6Be42bE8f96eE1', qty : 1},
        { address : '0x05Cf32fc908a2B20DC32C8F49721E4Ae3dD66496', qty : 1},
        { address : '0x35A2547B05204Fa31b590F094e2Ced589F588208', qty : 1},
        { address : '0xE73bae5ff0944458D1032346663b24a37475c4F3', qty : 1},
        { address : '0x87fAAB05Be6fFD3143E2150b2Da656fCC0EC40Dd', qty : 1},
        { address : '0x4A6D41513783B0023C4De563DE751e698E5F962a', qty : 1},
        { address : '0x203A550caB392e30B09048bBAb2F7C133f553e15', qty : 1},
        { address : '0x87fAAB05Be6fFD3143E2150b2Da656fCC0EC40Dd', qty : 1},
        { address : '0xa7531F5A9D56089A79EBCb295bAba41bED80ca22', qty : 1}   
    ]      
    
    function createCoupon(hash, signerPvtKey) {
        return ecsign(hash, signerPvtKey);
    }
    
    function generateHashBuffer(typesArray, valueArray) {
        return keccak256(
            toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
                valueArray))
        );
    }

    function serializeCoupon(coupon) {
        return {
            r: bufferToHex(coupon.r),
            s: bufferToHex(coupon.s),
            v: coupon.v
        };
    }

    for (let i = 0; i < presaleAddresses.length; i++) {
        const userAddress = ethers.utils.getAddress(presaleAddresses[i].address);
        const hashBuffer = generateHashBuffer(
            ["uint256", "address"],
            [presaleAddresses[i].qty, userAddress]
        );
        const coupon = createCoupon(hashBuffer, signerPvtKey);

        coupons[userAddress] = {
            q : presaleAddresses[i].qty,
            whitelistClaimPass: serializeCoupon(coupon)
        };
    }
    // HELPER FUNCTIONS
    
    // get the Console class
    const { Console } = require("console");
    // get fs module for creating write streams
    const fs = require("fs");

    // make a new logger
    const myLogger = new Console({
    stdout: fs.createWriteStream("ProjectWhitelist-signed-coupons.txt"),
    stderr: fs.createWriteStream("errStdErr.txt"),
    });

    myLogger.log(coupons);
   
}

getClaimCodes()