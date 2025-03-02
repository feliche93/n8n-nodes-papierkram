import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { Papierkram } from './Papierkram';

export class PapierkramDescription implements INodeType {
	nodeType: {
        description: INodeTypeDescription,
        type: typeof Papierkram,
    }
	constructor() {
        this.nodeType = {
            description: {
				category: 'organization',
				description: 'Access Papierkram API',
				displayName: 'Papierkram',
				icon: 'file:nodes/Papierkram/Papierkram.svg',
				inputs: ['main'],
				name: 'papierkram',
				outputs: ['main'],
				properties: [
					{
						displayName: 'Resource',
						name: 'resource',
						type: 'options',
						noDataExpression: true,
						options: [
							{
								name: 'Company',
								value: 'company',
							},
							/*{
								name: 'Time Entry',
								value: 'timeEntry',
							},*/
						],
						default: 'company',
					},
					{
						displayName: 'Operation',
						name: 'operation',
						type: 'options',
						noDataExpression: true,
						displayOptions: {
							show: {
								resource: [
									'company',
								]
							}
						},
						options: [
							{
								name: 'Get',
								value: 'get',
								description: 'Get a company',
								action: 'Get a company',
							},
							{
								name: 'List',
								value: 'list',
								description: 'List all companies',
								action: 'List companies',
							},
						],
						default: 'list',
					},
					{
						displayName: 'Company ID',
						name: 'companyId',
						type: 'string',
						default: '',
						description: 'ID of the company to retrieve.',
						required: true,
						displayOptions: {
							show: {
          "resource": [
            "company",
          ],
								operation: [
									'get',
								],
							},
						},
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
						displayOptions: {
          "resource": [
            "company",
          ],
							show: {
								operation: [
									'list',
								],
          },
          hide: {
            "resource": [
              "timeEntry"
            ]
          }
						},
					},
					{
						displayName: 'Page Size',
						name: 'pageSize',
						type: 'number',
						default: 100,
						description: 'Page size (1-100)',
						displayOptions: {
          "resource": [
            "company",
          ],
							show: {
								operation: [
									'list',
								],
							},
						},
					},
					{
						displayName: 'Order By',
						name: 'orderBy',
						type: 'string',
						default: '',
						description: 'Order by field (must be used with order_direction)',
						displayOptions: {
          "resource": [
            "company",
          ],
							show: {
								operation: [
									'list',
								],
							},
						},
					},
					{
						displayName: 'Order Direction',
						name: 'orderDirection',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'asc',
						description: 'Order direction (must be used with order_by)',
						displayOptions: {
          "resource": [
            "company",
          ],
							show: {
								operation: [
									'list',
								],
							},
						},
					},
          {
            "displayName": "Run Workflow Separately",
            "name": "splitIntoItems",
            "type": "boolean",
            "default": false,
            "description": "Iterates through an array field and creates a new item for each element.",
          }
				],
				default: ''
			},
			type: Papierkram,
			execute: ''
		};
        
	}
  get description(): any {
    return this.nodeType.description;
  }
  get name(): string {
    return this.nodeType.description.name;
  }
  get inputs(): string[] {
    return this.nodeType.description.inputs
  }
  get outputs(): string[] {
    return this.nodeType.description.outputs
  }


}
