import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { Papierkram } from './Papierkram';

export class PapierkramDescription implements INodeType {
  constructor(public readonly baseGet: any, public readonly baseList: any) {}
  category: string;
  description: string;
  displayName: string;
  group: string[];
  icon: string;
  inputs: string[];
  name: string;
  outputs: string[];
  properties: INodeTypeDescription['properties'];
  version: number;

  methods = {
    list: [
      {
        name: 'listCompanies',
        value: 'listCompanies',
      },
    ],
    get: [
      {
        name: 'getCompany',
        value: 'getCompany',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<any> {
    const papierkram = new Papierkram();
    const items = this.getInputData();
    let returnData = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const method = this.getNodeParameter('operation', i) as string;

        if (method === 'listCompanies') {
          // Simple list operation
          returnData = returnData.concat(await papierkram.listCompanies.call(this, i));
        }

        if (method === 'getCompany') {
          // Simple get operation
          returnData = returnData.concat(await papierkram.getCompany.call(this, i));
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
