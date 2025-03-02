import { IExecuteFunctions } from 'n8n-workflow';
import { BaseList, BaseGet, BaseOperation } from './Base';

export class Papierkram implements BaseOperation {
	baseGet: BaseGet;
	baseList: BaseList;
	constructor() {
		this.baseGet = new BaseGet();
		this.baseList = new BaseList();
	}
	async execute(this: IExecuteFunctions): Promise<any> {

		const items = this.getInputData();

		let returnData = [];

		for (let i = 0; i < items.length; i++) {
			try {

				const credentials = await this.getCredentials('papierkramApi');
				const baseUrl = 'https://felixvemmer.papierkram.de/api/v1';

				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				let qs:any = {};

				if (resource === 'company') {
					if (operation === 'list') {
						endpoint = '/contact/companies';
						qs.page = this.getNodeParameter('page', i) as number;
						qs.page_size = this.getNodeParameter('pageSize', i) as number;
						const orderBy = this.getNodeParameter('orderBy', i) as string;
						const orderDirection = this.getNodeParameter('orderDirection', i) as string;

						if (orderBy) {
							qs.order_by = orderBy;
							qs.order_direction = orderDirection
						}
						const response = await this.baseList.run.call(this, {
							baseUrl,
							endpoint,
							credentials,
							qs
						});
						returnData.push(response);
					}

					if (operation === 'get') {
						const companyId = this.getNodeParameter('companyId', i) as string;
						endpoint = `/contact/companies/${companyId}`;
						const response = await this.baseGet.run.call(this, {
							baseUrl,
							endpoint,
							credentials,
						});
						returnData.push(response);
					}
				}
				else if (resource === 'timeEntry') {
					if (operation === 'list') {
						endpoint = '/tracker/time_entries';
						qs.page = this.getNodeParameter('page', i) as number;
						qs.page_size = this.getNodeParameter('pageSize', i) as number;
						const orderBy = this.getNodeParameter('orderBy', i) as string;
						const orderDirection = this.getNodeParameter('orderDirection', i) as string;

						if (orderBy) {
							qs.order_by = orderBy;
							qs.order_direction = orderDirection
						}
						const response = await this.baseList.run.call(this, {
							baseUrl,
							endpoint,
							credentials,
							qs
						});
						returnData.push(response);
					}

					if (operation === 'get') {
						const timeEntryId = this.getNodeParameter('timeEntryId', i) as string;
						endpoint = `/tracker/time_entries/${timeEntryId}`;
						const response = await this.baseGet.run.call(this, {
							baseUrl,
							endpoint,
							credentials,
						});
						returnData.push(response);
					}
				}
			} catch (error) {
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
