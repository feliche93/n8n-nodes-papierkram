import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Papierkram implements INodeType {
	name = 'papierkram';
	displayName = 'Papierkram';
	icon = 'file:papierkram.svg';
	description: INodeTypeDescription = {
		displayName: 'Papierkram',
		name: 'papierkram',
		description: 'Basic Papierkram Node',
		version: 1,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'papierkramApi',
				displayName: 'Papierkram API',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Company',
						value: 'company',
						description: 'Company Resource',
					},
				],
				default: 'company',
				description: 'The resource to operate on.',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'company',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a company',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all companies',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
		],
	};
}
