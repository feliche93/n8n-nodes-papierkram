import { OptionsWithUri } from 'request';
import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { apiRequest } from './GenericFunctions';

export class BaseGet {

	async run(this: IExecuteFunctions, data: any) {

		const options: OptionsWithUri = {
			method: 'GET',
			uri: data.baseUrl + data.endpoint,
			json: true,
		};

		return apiRequest.call(this, options, data.credentials);
	}
}