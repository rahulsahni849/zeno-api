import {Request, Response, Router} from 'express';
import zkpModel from '../db/models/zkpSchema';
import { walletVerifier } from '../services/walletVerifier';
import { chain, IToken } from '../db/models/zkpSchema';
import { Error, Mongoose, MongooseError } from 'mongoose';


const verfierRoute:Router = Router()

verfierRoute.post("/token",async (req:Request,resp:Response) =>{
    try{

        if(!walletVerifier(req.body["walletAddress"])){
            resp.send("Wallet address is not valid!")
            return;
        }

        let prevToken:IToken | null = await zkpModel.findOne({walletAddress:req.body["walletAddress"]})
        console.log(prevToken)
        let token;
        if(prevToken!=null){
            if(prevToken.expiryDate.getTime() >= new Date().getTime()){
                resp.send(prevToken)
                return ;
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
        // console.log(token)
        
        token.save().then((value)=>{
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


verfierRoute.get("/token/:walletAddress",async (req:Request,resp:Response) =>{

    try{
        let wallet:string|undefined= req.params["walletAddress"]?.toString()
        if(wallet==null){
            resp.send("bad request")
            return;
        }
        // console.log(wallet)   
        if(!walletVerifier(wallet)){
            resp.send("Wallet address is not valid!")
            return;
        }

        let token:IToken | null = await zkpModel.findOne({walletAddress:wallet})
        // console.log(token)
        if(token==null){
            return ;
        }
        if(token.expiryDate.getTime() >= new Date().getTime()){
            resp.send(token)
            return;
        }
        // console.log(token)
        resp.send("No token exists!")

        // let etherBalance = await getEtherBalance(wallet)
        // let chainid =await getChainIds(wallet)
          
        // resp.send(`
        //     Ether balance: ${etherBalance}
        //     chainId: ${chainid}
        // `)
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



export default verfierRoute



