import { IToken } from "interfaces/token";
import mongoose from "mongoose";

const zkpSchema = new mongoose.Schema<IToken>({
  walletAddress: {
    unique: true,
    required: true,
    type: String,
    length: 64,
  },
  tokenClaim: {
    type: String,
  },
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  expiryDate: {
    type: Date,
    immutable: true,
    default: () => {
      let date = new Date();
      if (process.env["EXP_DAY"] == null) {
        return date.setSeconds(date.getSeconds() + 20);
      }
      date.setSeconds(date.getSeconds() + parseInt(process.env["EXP_DAY"]));
      return date;
    },
  },
  panCardHash: String,
  aadharCardHash: String,
  chains: [
    {
      _id: false,
      chainId: String,
      port: {
        type: Boolean,
        default: false,
      },
      clone: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model<IToken>("zkp-collection", zkpSchema);
