import mongoose from "mongoose";

export interface IChain {
  _id: boolean;
  chainId: string;
  contractAddress: string[];
  createdOn: Date;
}

export interface IToken {
  _id: boolean;
  walletAddress: string;
  panCardHash: string;
  aadharCardHash: string;
  tokenClaim: {
    type: string;
  };
  chains: {
    chainId: string;
    port: boolean;
    clone: boolean;
  }[];
  createdOn: Date;
  expiryDate: Date;
}

export type ITokenModel = mongoose.Document & IToken;
