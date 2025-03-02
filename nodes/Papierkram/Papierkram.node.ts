import { IExecuteFunctions } from 'n8n-workflow';
import { BaseList, BaseGet, BaseOperation } from './Base';

interface IParameters  {
	baseUrl: string,
	endpoint: string,
	credentials: {apiToken:string},
	qs?: {page:number, page_size: number, order_by:string, order_direction:string}
}

export class Papierkram implements BaseOperation {
	baseGet: BaseGet;
	baseList: BaseList;
	constructor() {
		this.baseGet = new BaseGet();
		this.baseList = new BaseList();
	}

	async execute(this: IExecuteFunctions): Promise<any> {
		const items = this.getInputData();
		let returnData: any[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('papierkramApi');
				const baseUrl = 'https://felixvemmer.papierkram.de/api/v1';

				const resource = this.getNodeParameter('resource', i) as string;
				
				if (resource === 'company') {
					const operation = this.getNodeParameter('operation', i) as string;
														
					if (operation === 'list') {
						const endpoint = '/contact/companies';
						const page = this.getNodeParameter('page', i) as number;
						const pageSize = this.getNodeParameter('pageSize', i) as number;
						const orderBy = this.getNodeParameter('orderBy', i) as string;
						const orderDirection = this.getNodeParameter('orderDirection', i) as string;

						const qs = {
							page,
							page_size: pageSize,
							order_by: orderBy,
							order_direction: orderDirection
						};

						const requestParams : IParameters = {
							baseUrl,
							endpoint,
							credentials,
							qs
						};

						const response = await this.baseList.run.call(this, requestParams);
						returnData.push(response);
					}

					if (operation === 'get') {
						const companyId = this.getNodeParameter('companyId', i) as string;
						const endpoint = `/contact/companies/${companyId}`;
						const requestParams : IParameters = {
							baseUrl,
							endpoint,
							credentials,
						};
						const response = await this.baseGet.run.call(this, {
							baseUrl,
							endpoint,
							credentials,
						});
						returnData.push(response);
					}
				}
			} catch (error) {
				if (this.displayOptions.show) {
					return [this.helpers.returnJsonArray([error])];						
					}
				// If the error is of type string, convert it to an object with a message property
				if (typeof error === 'string') {
					throw new Error(error);
				}
				// If it is an object with a message property, throw it directly
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
