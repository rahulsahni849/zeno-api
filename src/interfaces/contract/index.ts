import mongoose from "mongoose";

interface IContract {
  _id: boolean;
  contractAddress: string[];
  chainId: string;
  createdOn: Date;
}

export type IContractModel = mongoose.Document & IContract;
