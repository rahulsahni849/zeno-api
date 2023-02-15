import {Request, Response, Router} from 'express';
import contractChainModel from '../db/models/chainContractSchema';
import { IToken } from '../db/models/zkpSchema';
import { Error, MongooseError } from 'mongoose';

const ContractRoute:Router = Router()

ContractRoute.post("/contract",async (req:Request,resp:Response) =>{
    try{

        let chainId = req.body["chainId"]

        let chain = await contractChainModel.findOne({chainId:chainId})
        console.log(chain)
        if(chain!=null){
            let contracts:string[]=req.body["contractAddress"]
            if(contracts.length>0){
                let allContracts = new Set([...contracts,...chain.contractAddress])
                chain.contractAddress=[...allContracts]
                chain.save()
                return resp.json(chain)

            }
           return resp.json({
            data:chain,
            message:"chain already exists!"
           })
           
        }
        let newChain;
        console.log("generation")
        newChain = new contractChainModel({
            chainId:req.body["chainId"],
            contractAddress:req.body["contractAddress"]
        })        
        newChain.save().then((value)=>{
            console.log(value)
            resp.json({
                data:value,
                statusCode:201
            })
        }).catch((err:MongooseError)=>{
            resp.json({
                message:err.message,
                errorStack:err.stack,
                statusCode:500
            })
        })
    
    }
    catch(e){
        resp.send(500).json({
            error:e,
            status:500
            
        })
    }
})


ContractRoute.get("/contract/:chainId",async (req:Request,resp:Response) =>{
    try{

        let chainId:string = req.params["chainId"]?.toString()
        if(chainId==null){
            resp.send("bad request")
            return;
        }
         
        let chain:IToken | null = await contractChainModel.findOne({chainId:chainId})
        console.log(chain)
        if(chain==null){
            return resp.send("Chain Id doesn't exists!")
        }
        
        resp.json(chain)
        
    }
    catch(error){
        let message:{
            error:Error,
            status:number
        }={
            error:Error.Messages,
            status:500
        }
        resp.json(message)
    }
    
})



export default ContractRoute



