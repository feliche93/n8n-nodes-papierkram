import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { apiRequest } from './GenericFunctions';

export class BaseOperation {

	async run(this: IExecuteFunctions, method: string, endpoint: string, body: any, qs: any, option: any) {

		const options: IHttpRequestOptions = {
			method,
			uri: `${option.baseUrl}${endpoint}`,
			body,
			qs,
			json: true,
		};
		const credential = await this.getCredentials('papierkramApi');
		return apiRequest.call(this, options, credential);
	}
}