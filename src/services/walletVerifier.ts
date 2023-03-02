import Web3 from "web3";

export const walletVerifier = (tokenid: string) => {
  try {
    const valid: boolean = Web3.utils.isAddress(tokenid);
    return valid;
  } catch (e) {
    return e;
  }
};
