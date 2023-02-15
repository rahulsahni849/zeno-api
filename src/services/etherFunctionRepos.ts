import Web3 from 'web3';
import web3_pack from './etherProviderObj';

export  function  getEtherBalance(address:string){
    return new Promise((resolve,reject) =>{
        web3_pack.eth.getBalance(address, (err, wei) => {
          if(err){
            return resolve(err)
          }
        return resolve(Web3.utils.fromWei(wei, 'ether'))
      })
  })
}

export function getChainIds(address:string){
  return new Promise((resolve,reject) =>{
    return web3_pack.eth.getChainId((err,version) =>{
      if(err){
        return resolve(err)
      }
      return resolve(version)
    })}
  )
}
