
import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class PapierkramApi implements ICredentialType {
  name = 'papierkramApi';
  displayName = 'Papierkram API';
  documentationUrl = 'https://felixvemmer.papierkram.de/api/v1/api-docs/api/v1/swagger.json';
  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'apiKey',
      type: 'string',
      default: '',
      description: 'The API token for accessing the Papierkram API',
      required: true,
    },
  ];
  authenticate = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: 'Bearer {{$credentials.apiKey}}',
      },
    },
  };
}
