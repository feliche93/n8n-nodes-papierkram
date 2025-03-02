import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PapierkramApi implements ICredentialType {
  name = 'papierkramApi';
  displayName = 'Papierkram API';
  documentationUrl = 'https://felixvemmer.papierkram.de/api/v1/api-docs/api/v1/swagger.json';
  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'apiToken',
      type': 'string',
      typeOptions': { type: 'password' },
      default: '',
      description: 'The API token to access the Papierkram API',
    },
  ];
}
