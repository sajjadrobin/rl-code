const { fetchRates } = require('./script');

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchRates', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch rates successfully', async () => {
    const mockRates = {
      usd: { name: 'US Dollar', unit: 'USD', value: 1 },
      eur: { name: 'Euro', unit: 'EUR', value: 0.85 }
    };
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ rates: mockRates })
    };
    global.fetch.mockResolvedValue(mockResponse);

    const result = await fetchRates();

    expect(global.fetch).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/exchange_rates');
    expect(result).toEqual(mockRates);
  });

  it('should handle API errors', async () => {
    global.fetch.mockRejectedValue(new Error('API error'));

    await expect(fetchRates()).rejects.toThrow('API error');
    expect(global.fetch).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/exchange_rates');
  });
});