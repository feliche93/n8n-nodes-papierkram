import { ICredentialType, INodeParams } from 'n8n-workflow';

export class Papierkram implements ICredentialType {
    name = 'papierkramApi';
    displayName = 'Papierkram API';
    documentationUrl = 'https://felixvemmer.papierkram.de/api/v1/api-docs/api/v1/swagger.json';
    properties: INodeParams[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
            description: 'Your Papierkram API key',
        },
    ];
}
