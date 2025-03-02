import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PapierkramApi implements ICredentialType {
	name = 'papierkramApi';
	displayName = 'Papierkram API';
	documentationUrl = 'papierkramApi';

	/**
	 * For this API the OpenAPI docs indicate that a Bearer token
	 * authentication is used. Thus, we expose a single field for the API Token.
	 */
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			description: 'The API token for accessing the Papierkram API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiToken }}',
			},
		},
	};
}