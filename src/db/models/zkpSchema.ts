import mongoose from 'mongoose'
import dotenv from "dotenv";
import path = require("path");
dotenv.config({ path: path.resolve(__dirname + "/../../.env") });


export interface chain{
    chainId: String,
    port: boolean,
    clone: boolean
}

export interface IToken {
    _id: boolean,
    walletAddress: {
        unique: boolean,
        required: boolean,
        type: string,
        length: number
    },
    panCardHash:string,
    aadharCardHash:string,
    tokenClaim:{
        type:string,
    }
    chains:chain[],
    createdOn:Date,
    expiryDate:Date
}

const zkpSchema = new mongoose.Schema<IToken>({
    walletAddress:{
        type:String,
        length:64
    },
    tokenClaim:{
        type:String
    },
    createdOn:{
        type:Date,
        immutable:true,
        default:() =>Date.now()
    },
    expiryDate:{
        type:Date,
        immutable:true,
        default:()=>{
            let date = new Date()
            if(process.env["EXP_DAY"]==null){
                return date.setSeconds(date.getSeconds()+ 20)
            }
            date.setSeconds(date.getSeconds()+ parseInt(process.env["EXP_DAY"]))
            return date
        }
    },
    panCardHash:String,
    aadharCardHash:String,
    chains:[{
        _id:false,
        chainId: String,
        port:{
            type:Boolean,
            default:false
        },
        clone: {
            type:Boolean,
            default:false
        }
    }]
})


const zkpModel = mongoose.model<IToken>("zkp-collection",zkpSchema)
export default zkpModel

