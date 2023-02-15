import mongoose from 'mongoose'

export interface IChain {
    _id: boolean,
    chainId:string,
    contractAddress:string[],
    createdOn:Date

}

const zkpSchema = new mongoose.Schema<IChain>({
    chainId:String,
    contractAddress:[String],
    createdOn:{
        type:Date,
        default:()=> Date.now()
    }
})

const contractChainModel = mongoose.model<IChain>("chain-collection",zkpSchema)
export default contractChainModel

