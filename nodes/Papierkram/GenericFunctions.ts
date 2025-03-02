import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

export async function apiRequest(this: IExecuteFunctions, options: IHttpRequestOptions, credentials?: { apiToken: string }) {
  if (credentials && credentials.apiToken) {
    options.headers = {
      'Authorization': `Bearer ${credentials.apiToken}`,
      'Accept': 'application/json',
    };
  }
  try {
    return await this.helpers.request(options);
  } catch (error) {
    if (error.statusCode) {
      throw new Error(`Papierkram API error: ${error.statusCode} - ${error.message}`);
    }
    throw new Error(`Papierkram API error: ${error}`);
  }
}