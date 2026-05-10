import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { JupiterProbeService } from './jupiter';
import { createJupiterApiClient } from '@jup-ag/api';

vi.mock('@jup-ag/api', () => ({
  createJupiterApiClient: vi.fn(),
}));

describe('JupiterProbeService', () => {
  let mockJupiterApi: { quoteGet: Mock, swapPost: Mock };
  let service: JupiterProbeService;

  beforeEach(() => {
    mockJupiterApi = {
      quoteGet: vi.fn(),
      swapPost: vi.fn(),
    };
    (createJupiterApiClient as Mock).mockReturnValue(mockJupiterApi);
    service = new JupiterProbeService();
  });

  describe('pingQuoteApi', () => {
    it('should return success true when quoteGet succeeds', async () => {
      mockJupiterApi.quoteGet.mockResolvedValueOnce({});
      const result = await service.pingQuoteApi();
      expect(result.success).toBe(true);
      expect(typeof result.latency).toBe('number');
    });

    it('should return success false when quoteGet fails', async () => {
      mockJupiterApi.quoteGet.mockRejectedValueOnce(new Error('Failed'));
      const result = await service.pingQuoteApi();
      expect(result.success).toBe(false);
      expect(typeof result.latency).toBe('number');
    });
  });

  describe('pingSwapApi', () => {
    it('should return success true when quoteGet and swapPost succeed', async () => {
      mockJupiterApi.quoteGet.mockResolvedValueOnce({});
      mockJupiterApi.swapPost.mockResolvedValueOnce({});
      const result = await service.pingSwapApi();
      expect(result.success).toBe(true);
      expect(typeof result.latency).toBe('number');
    });

    it('should return success false when quoteGet fails', async () => {
      mockJupiterApi.quoteGet.mockRejectedValueOnce(new Error('Quote Failed'));
      const result = await service.pingSwapApi();
      expect(result.success).toBe(false);
      expect(typeof result.latency).toBe('number');
    });

    it('should return success false when swapPost fails', async () => {
      mockJupiterApi.quoteGet.mockResolvedValueOnce({});
      mockJupiterApi.swapPost.mockRejectedValueOnce(new Error('Swap Failed'));
      const result = await service.pingSwapApi();
      expect(result.success).toBe(false);
      expect(typeof result.latency).toBe('number');
    });
  });
});
