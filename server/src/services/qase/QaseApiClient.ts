import axios from 'axios';

import type { QaseConfig } from '../../../../shared/types';

//get qase project code and token from process.env
const QaseApiToken = process.env.QASE_API_TOKEN || '';
const QaseProjectCode = process.env.QASE_PROJECT_CODE || '';
const QaseBaseURL = `https://api.qase.io/v1/${QaseProjectCode}`;
//qase api route

/**
 * Qase API Client - Simple wrapper matching @api/qase interface
 *
 * Usage:
 *   import qase from './QaseApiClient';
 *   qase.auth('your-token');
 *   qase.getCase({code: 'ACCESSFLOW', id: '2133'})
 *     .then(({ data }) => console.log(data))
 *     .catch(err => console.error(err));
 *
 * NOTE: This is a singleton but creates new axios clients per request
 * to avoid race conditions with concurrent requests.
 * 
 * Rate Limiting: Qase API allows 60 requests per minute per token
 */
class QaseApiClient {
  private defaultBaseURL: string = QaseBaseURL;
  private defaultToken: null | string = QaseApiToken;
  
  private readonly RATE_LIMIT_MAX_REQUESTS = 60;
  private readonly RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  // Rate limiting: Track request timestamps (Qase allows 60 req/min)
  private requestTimestamps: number[] = [];

  /**
   * Authenticate with Qase API token (sets default token)
   */
  auth(token: string): void {
    this.defaultToken = token;
  }

  /**
   * Get a specific test case
   * @param params - {code: string, id: string | number}
   */
  async getCase(params: { code: string; id: number | string }): Promise<{ data: any }> {
    // Check rate limit before making request
    await this.checkRateLimit();
    
    // Create a new client instance for each request to avoid race conditions
    // This ensures thread-safety for concurrent requests
    const token = this.defaultToken;
    if (!token) {
      throw new Error('Qase API token not set. Call qase.auth(token) first.');
    }

    const testCaseId = typeof params.id === 'string' ? params.id : params.id.toString();
    const endpoint = `/case/${params.code}/${testCaseId}`;

    // Create fresh axios client for this request
    const client = axios.create({
      baseURL: this.defaultBaseURL,
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    });

    try {
      const response = await client.get(endpoint);
      return { data: response.data };
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Qase API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Get all test cases in a suite
   * 
   * @param params - {code: string, suite_id: number}
   * @returns Array of test cases in the suite
   */
  async getCasesBySuite(params: { code: string; suite_id: number }): Promise<{ data: any }> {
    // Check rate limit before making request
    await this.checkRateLimit();
    
    const token = this.defaultToken;
    if (!token) {
      throw new Error('Qase API token not set. Call qase.auth(token) first.');
    }

    // Use filters parameter for suite filtering
    const endpoint = `/case/${params.code}?filters[suite_id]=${params.suite_id}&limit=100`;

    // Create fresh axios client for this request
    const client = axios.create({
      baseURL: this.defaultBaseURL,
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    });

    try {
      const response = await client.get(endpoint);
      return { data: response.data };
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Qase API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Initialize from QaseConfig
   */
  initializeFromConfig(config: QaseConfig): void {
    if (config.apiToken) {
      // Only set token if not already set (idempotent)
      if (!this.defaultToken) {
        this.auth(config.apiToken);
      }
    }
    if (config.host) {
      // Extract base URL from host (remove /v1 if present)
      this.defaultBaseURL = `${config.host.replace(/\/v1\/?$/, '')  }/v1`;
    }
  }

  /**
   * Get current authentication status
   */
  isAuthenticated(): boolean {
    return this.defaultToken !== null;
  }

  /**
   * Search test cases with pagination (only supported remote params)
   * 
   * Validated working params: search, limit, offset
   * 
   * @param params - {code: string, search?: string, limit?: number, offset?: number}
   * @returns Test cases matching query
   */
  async searchCases(params: {
    code: string;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<{ data: any }> {
    // Check rate limit before making request
    await this.checkRateLimit();
    
    const token = this.defaultToken;
    if (!token) {
      throw new Error('Qase API token not set. Call qase.auth(token) first.');
    }

    // Build query string with only supported params
    const queryParams = new URLSearchParams();
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    queryParams.append('limit', (params.limit || 100).toString());
    queryParams.append('offset', (params.offset || 0).toString());

    const endpoint = `/case/${params.code}?${queryParams.toString()}`;

    // Create fresh axios client for this request
    // Use base URL without project code (project code in endpoint)
    const client = axios.create({
      baseURL: 'https://api.qase.io/v1',
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    });

    try {
      const response = await client.get(endpoint);
      return { data: response.data };
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Qase API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Update a test case via PATCH /v1/case/{code}/{id}
   * 
   * @param params - {code: string, id: string | number}
   * @param payload - Test case update payload
   * @returns Updated test case data
   */
  async updateCase(params: { code: string; id: number | string }, payload: {
    automation?: number;
    description?: string;
    preconditions?: string;
    priority?: number;
    severity?: number;
    status?: number;
    steps?: {
      action: string;
      expected_result: string;
    }[];
    suite_id?: number;
    tags?: string[];
    title?: string;
  }): Promise<{ data: any }> {
    // Check rate limit before making request
    await this.checkRateLimit();
    
    const token = this.defaultToken;
    if (!token) {
      throw new Error('Qase API token not set. Call qase.auth(token) first.');
    }

    const testCaseId = typeof params.id === 'string' ? params.id : params.id.toString();
    const endpoint = `/case/${params.code}/${testCaseId}`;

    // Create fresh axios client for this request
    const client = axios.create({
      baseURL: this.defaultBaseURL,
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    });

    try {
      const response = await client.patch(endpoint, payload);
      return { data: response.data };
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Qase API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Rate limiting check - ensures we don't exceed Qase API limits
   * Qase allows 60 requests per minute per token
   * 
   * @returns true if request can proceed, false if rate limited
   */
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    
    // Remove timestamps older than 1 minute
    this.requestTimestamps = this.requestTimestamps.filter(
      (timestamp) => now - timestamp < this.RATE_LIMIT_WINDOW_MS,
    );
    
    // Check if we've hit the rate limit
    if (this.requestTimestamps.length >= this.RATE_LIMIT_MAX_REQUESTS) {
      // Calculate how long to wait
      const [oldestTimestamp] = this.requestTimestamps;
      const waitMs = this.RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp) + 100; // +100ms buffer
      
      console.warn(`[QaseApiClient] Rate limit reached (${this.RATE_LIMIT_MAX_REQUESTS} req/min), waiting ${waitMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      
      // Recursively check again after waiting
      return this.checkRateLimit();
    }
    
    // Record this request
    this.requestTimestamps.push(now);
  }
}

// Export singleton instance
const qase = new QaseApiClient();
export default qase;
