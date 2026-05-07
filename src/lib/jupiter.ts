import { createJupiterApiClient } from "@jup-ag/api";

export class JupiterProbeService {
  private jupiter = createJupiterApiClient();

  async pingQuoteApi() {
    const start = Date.now();
    try {
      // Use USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v) 
      // and SOL (So11111111111111111111111111111111111111112)
      await this.jupiter.quoteGet({
        inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        outputMint: "So11111111111111111111111111111111111111112",
        amount: 1000000, // 1 USDC
        slippageBps: 50,
      });
      return { success: true, latency: Date.now() - start };
    } catch (error) {
      return { success: false, latency: Date.now() - start };
    }
  }

  async pingSwapApi() {
    const start = Date.now();
    try {
      // First get a real quote to use for the swap
      const quoteResponse = await this.jupiter.quoteGet({
        inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        outputMint: "So11111111111111111111111111111111111111112",
        amount: 1000000,
        slippageBps: 50,
      });
      
      // Ping the swap API using a dummy public key to measure actual latency
      await this.jupiter.swapPost({
        swapRequest: {
          quoteResponse,
          userPublicKey: "11111111111111111111111111111111", // Dummy account
          wrapAndUnwrapSol: true,
        }
      });
      
      return { success: true, latency: Date.now() - start };
    } catch (error) {
      // It might fail because of the dummy key, but we still measure latency
      return { success: false, latency: Date.now() - start };
    }
  }
}

export const jupiterProbe = new JupiterProbeService();

