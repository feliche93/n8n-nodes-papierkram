import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Papierkram implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Papierkram',
    name: 'papierkram',
    icon: 'file:p.svg',
    group: ['community'],
    version: 1,
    subtitle: '={{$parameter.operation}}',
    description: 'Consume Papierkram API',
    defaults: {
      name: 'Papierkram',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'papierkramApi',
        required: true,
      },
    ],
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
          {
            name: 'Banking Bank Connection',
            value: 'bankingBankConnection',
          },
          {
            name: 'Banking Transaction',
            value: 'bankingTransaction',
          },
          {
            name: 'Expense Voucher',
            value: 'expenseVoucher',
          },
          {
            name: 'Estimate',
            value: 'estimate',
          },
          {
            name: 'Invoice',
            value: 'invoice',
          },
          {
            name: 'Payment Term',
            value: 'paymentTerm',
          },
          {
            name: 'Project',
            value: 'project',
          },
          {
            name: 'Proposition',
            value: 'proposition',
          },
          {
            name: 'Task',
            value: 'task',
          },
          {
            name: 'Time Entry',
            value: 'timeEntry',
          },
          {
            name: 'User',
            value: 'user',
          },

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
            name: 'Get Many',
            value: 'getAll',
            description: 'Get many companies',
          },
          {
            name: 'Create',
            value: 'create',
            description: 'Create a company',
          },
          {
            name: 'Update',
            value: 'update',
            description: 'Update a company',
          },
          {
            name: 'Delete',
            value: 'delete',
            description: 'Delete a company',
          },
          {
            name: 'Archive',
            value: 'archive',
            description: 'Archive a company',
          },
          {
            name: 'Unarchive',
            value: 'unarchive',
            description: 'Unarchive a company',
          },
        ],
        default: 'get',
      },

      {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: [
              'company',
            ],
            operation: [
              'get',
              'update',
              'delete',
              'archive',
              'unarchive',
            ],
          },
        },
        description: 'The ID of the company to retrieve',
      },


    ],
  };
}
