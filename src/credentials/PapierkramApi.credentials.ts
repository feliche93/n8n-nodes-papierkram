import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class PapierkramApi implements ICredentialType {
  name = 'papierkramApi';
  displayName = 'Papierkram API';
  documentationUrl = 'papierkram';

  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'apiKey',
      type: 'string',
      default: '',
      description: 'The API token for accessing the Papierkram API',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '=Bearer {{$credentials.apiKey}}',
      },
    },
  };
}
