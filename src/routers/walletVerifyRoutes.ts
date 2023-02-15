import {Request, Response, Router} from 'express';
import zkpModel from '../db/models/zkpSchema';
import { walletVerifier } from '../services/walletVerifier';
import { chain, IToken } from '../db/models/zkpSchema';
import { Error, MongooseError } from 'mongoose';
import { ErrorGenerator,ResultGenerator } from '../db/models/responseModel';


const verfierRoute:Router = Router()

verfierRoute.post("/token",async (req:Request,resp:Response) =>{
    try{

        if(!walletVerifier(req.body["walletAddress"])){
            return resp.json(ErrorGenerator(400,"Bad request","Wallet address is not valid"));
        }

        let prevToken:IToken | null = await zkpModel.findOne({walletAddress:req.body["walletAddress"]})
        console.log(prevToken)
        let token;
        if(prevToken!=null){
            if(prevToken.expiryDate.getTime() >= new Date().getTime()){
                return resp.json(ResultGenerator(200,prevToken,"Token already exists"))
            }else{
                console.log("deleting time")
                await zkpModel.deleteOne(prevToken)
            }
        }
        console.log("generation")
        token = new zkpModel({
            walletAddress:req.body["walletAddress"],
            tokenClaim:req.body["tokenClaim"],
            panCardHash:req.body["panCardHash"],
            aadharCardHash:req.body["aadharCardHash"],
        })
        let chains:chain[] = Array.from(req.body["chains"])
        token.chains=chains

        return token.save().then((value)=>{
            console.log(value)
            resp.json(ResultGenerator(201,value,"Token Successfully saved"))
        }).catch((err:MongooseError)=>{
            return resp.json(ErrorGenerator(500,err,"Error while saving the document"))
        })

    }
    catch(e){
        return resp.json(ErrorGenerator(500,e,"Exception occurs"))
    }

})


verfierRoute.get("/token/:walletAddress",async (req:Request,resp:Response) =>{

    try{
        let wallet:string|undefined= req.params["walletAddress"]?.toString()
        if(wallet==null){
            return resp.json(ErrorGenerator(400,"Bad request","WalletAddress is not specified"));
        } 
        if(!walletVerifier(wallet)){
            return resp.json(ErrorGenerator(400,"Bad request","Wallet address is not valid"));
        }

        let token:IToken | null = await zkpModel.findOne({walletAddress:wallet})
        if(token==null){
            return resp.json(ErrorGenerator(404,"Not found","Token does not exists"));
        }
        if(token.expiryDate.getTime() >= new Date().getTime()){
            return resp.json(ResultGenerator(200,token,"Token found"))
        }
        return resp.json(ErrorGenerator(404,"Not found","Either token doesn't exists or it got expire"));
    }
    catch(error){
        return resp.json(ErrorGenerator(500,error,"Exception occurs"))
    }
    
})

export default verfierRoute



