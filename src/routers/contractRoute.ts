import {Request, Response, Router} from 'express';
import contractChainModel from '../db/models/chainContractSchema';
import { IToken } from '../db/models/zkpSchema';
import { MongooseError } from 'mongoose';
import { ResultGenerator, ErrorGenerator } from '../db/models/responseModel';

const ContractRoute:Router = Router()

ContractRoute.post("/contract",async (req:Request,resp:Response) =>{
    try{

        let chainId = req.body["chainId"]
        let chain = await contractChainModel.findOne({chainId:chainId})
        
        if(chain!=null){
            let contracts:string[]=req.body["contractAddress"]
            let intersectionContracts = contracts.filter((address)=> !chain?.contractAddress.includes(address))
            
            if(intersectionContracts.length>0){
                let allContracts = new Set([...intersectionContracts,...chain.contractAddress])
                chain.contractAddress=[...allContracts]
                chain.save()
                return resp.json(ResultGenerator(200,chain,"Contract addresses added"))
            }
           return resp.json(ResultGenerator(200,chain,"Chain already exists"))
           
        }
        let newChain;

        newChain = new contractChainModel({
            chainId:req.body["chainId"],
            contractAddress:req.body["contractAddress"]
        })        
        return newChain.save().then((value)=>{

            return resp.json(ResultGenerator(201,value,"Chain Successfully saved"))
        }).catch((err:MongooseError)=>{
            return resp.json(ErrorGenerator(500,err,"Error while saving the document"))
        })
    }
    catch(err){
        return resp.send(500).json(ErrorGenerator(500,err,"Exception occurs"))
    }
})


ContractRoute.get("/contract/:chainId",async (req:Request,resp:Response) =>{
    try{
        let chainId:string = req.params["chainId"]?.toString()
        if(chainId==null){
            return resp.json(ErrorGenerator(400,"Bad request","Chain Id parameter is null"))
        }
         
        let chain:IToken | null = await contractChainModel.findOne({chainId:chainId})
        
        if(chain==null){
            return resp.json(ErrorGenerator(404,"Not found","Chain doesn't exists"))
        }
        return resp.json(ResultGenerator(200,chain,"Chain found"))
    }
    catch(error){
        return resp.json(ErrorGenerator(500,error,"Exception occurs"))
    }
    
})

export default ContractRoute



