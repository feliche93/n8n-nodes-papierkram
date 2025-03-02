import { OptionsWithUri } from 'request';
import { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { apiRequest } from './GenericFunctions';

export class BaseList {

	async run(this: IExecuteFunctions, data: any) {

		const options: OptionsWithUri = {
			method: 'GET',
			uri: data.baseUrl + data.endpoint,
			qs: data.qs,
			json: true,
		};

		return apiRequest.call(this, options, data.credentials);
	}
}