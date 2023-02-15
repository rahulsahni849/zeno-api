import mongoose, { ConnectOptions } from 'mongoose'
import { Mongoose } from 'mongoose';


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
    expiryDate:Date,
    closeOfferAt:Date
}



const zkpSchema = new mongoose.Schema<IToken>({
    walletAddress:{
        type:String,
        length:64
    },
    tokenClaim:{
        type:String,
        expireAfterSeconds:20
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
            date.setSeconds(date.getSeconds()+ 60)
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

