// In this file we define operations and their routing in a declarative
// style. This example provides two operations under the “invoice” resource.
// Extend these examples with additional resources and endpoints based on the Swagger spec.

export const description = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		options: [
			{
				name: 'Invoice',
				value: 'invoice',
			},
			// add other resources here as needed
		],
		default: 'invoice',
		description: 'Choose the resource to operate on.',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new invoice',
				action: 'Create an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '/invoices',
						// map body parameters from the node parameters
						body: {
							// Here we expect the user to supply necessary invoice details
							subject: '={{ $parameter["subject"] }}',
							amount: '={{ $parameter["amount"] }}',
						},
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a specific invoice',
				action: 'Get an invoice',
				routing: {
					request: {
						method: 'GET',
						url: '/invoices/{{ $parameter["invoiceId"] }}',
					},
				},
			},
		],
		default: 'create',
	},
	// Additional resource specific parameters
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
				operation: [
					'create',
				],
			},
		},
		description: 'The subject or title of the invoice',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
				operation: [
					'create',
				],
			},
		},
		description: 'The total amount for the invoice',
	},
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'invoice',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'The unique identifier of the invoice',
	},
];

export const methods = {
	// If needed, you can add helper methods that the declarative node might call.
};
