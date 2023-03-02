import { MongooseError } from "mongoose";
import { Request, Response } from "express";

import { IContractModel } from "../../interfaces/contract";
import contractChainModel from "../../models/chain.schema";
import { ResultGenerator, ErrorGenerator } from "../../models/responseModel";

class ContractController {
  public addContract = async (req: Request, res: Response) => {
    try {
      const { chainId, contractAddress } = req.body as IContractModel;

      const chain: IContractModel | null = await contractChainModel.findOne({
        chainId: chainId,
      });

      if (chain) {
        const contracts: string[] = contractAddress;
        const intersectionContracts: string[] = contracts.filter(
          (address) => !chain.contractAddress.includes(address)
        );

        if (intersectionContracts.length > 0) {
          const allContracts = new Set([
            ...intersectionContracts,
            ...chain.contractAddress,
          ]);
          chain.contractAddress = [...allContracts];
          chain.save();
          return res.json(
            ResultGenerator(200, chain, "Contract addresses added")
          );
        }

        return res.json(ResultGenerator(200, chain, "Chain already exists"));
      }

      const newChain: IContractModel = new contractChainModel({
        chainId: chainId,
        contractAddress: contractAddress,
      });

      return newChain
        .save()
        .then((value) => {
          return res.json(
            ResultGenerator(201, value, "Chain Successfully saved")
          );
        })
        .catch((err: MongooseError) => {
          return res.json(
            ErrorGenerator(500, err, "Error while saving the document")
          );
        });
    } catch (err) {
      return res.send(500).json(ErrorGenerator(500, err, "Exception occurs"));
    }
  };

  public getContract = async (req: Request, res: Response) => {
    try {
      const { chainId } = req.params;

      const chain: IContractModel | null = await contractChainModel.findOne({
        chainId: chainId,
      });

      if (!chain)
        return res.json(
          ErrorGenerator(404, "Not found", "Chain Doesn't exists")
        );

      return res.json(ResultGenerator(200, chain, "Chain found"));
    } catch (err) {
      return res.send(500).json(ErrorGenerator(500, err, "Exception occurs"));
    }
  };
}

export default ContractController;
