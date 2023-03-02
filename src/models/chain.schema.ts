import { IChain } from "interfaces/token";
import mongoose from "mongoose";

const chainSchema = new mongoose.Schema<IChain>({
  chainId: String,
  contractAddress: [String],
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.model<IChain>("chain-collection", chainSchema);
