import { IExecuteFunctions } from 'n8n-workflow';
import { BaseList, BaseGet, BaseOperation } from './Base';

export class Papierkram implements BaseOperation {
  baseGet: BaseGet;
  baseList: BaseList;
  constructor() {
    this.baseGet = new BaseGet();
    this.baseList = new BaseList();
  }
  async listCompanies(
    this: IExecuteFunctions,
    index: number,
  ): Promise<any> {
    const returnData: any[] = [];
    const credentials = await this.getCredentials('papierkramApi');
    const baseUrl = 'https://felixvemmer.papierkram.de/api/v1';
    const endpoint = '/contact/companies';

    const page = this.getNodeParameter('page', index) as number;
    const pageSize = this.getNodeParameter('pageSize', index) as number;
    const orderBy = this.getNodeParameter('orderBy', index) as string;
    const orderDirection = this.getNodeParameter('orderDirection', index) as string;

    const qs: any = {
        page,
        page_size: pageSize,
    };

    if (orderBy) {
        qs.order_by = orderBy;
        qs.order_direction = orderDirection
    }

    const response = await this.baseList.run.call(this, {
      baseUrl,
      endpoint,
      credentials,
      qs,
    });
    returnData.push(response);
    return returnData;
  }

  async getCompany(
    this: IExecuteFunctions,
    index: number,
  ): Promise<any> {
    const returnData: any[] = [];
    const credentials = await this.getCredentials('papierkramApi');
    const baseUrl = 'https://felixvemmer.papierkram.de/api/v1';
    const companyId = this.getNodeParameter('companyId', index) as string;
    const endpoint = `/contact/companies/${companyId}`;

    const response = await this.baseGet.run.call(this, {
      baseUrl,
      endpoint,
      credentials,
    });
    returnData.push(response);
    return returnData;
  }
}
