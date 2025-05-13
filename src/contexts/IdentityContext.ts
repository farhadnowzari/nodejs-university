import { request } from 'undici'
import { Request, Response } from "express";
import keycloakConfig from '../../keycloak.json';

type AuthzResource = {
    id: string;
    uniqueName: string;
}

type PermissionsResponse = {
    authorized: boolean;
    resources: { id: string, uniqueName: string }[];
}

export default class IdentityContext {
    private _request: Request;
    private _response: Response;
    user?: Record<string, string>;
    allowedResources: AuthzResource[] = [];
    constructor(req: Request, res: Response) {
        this._request = req;
        this._response = res;
    }

    private get tokenUrl(): string {
        return `${keycloakConfig['auth-server-url']}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
    }

    private async authzRequest<TResponse>(permission: string, mode: 'decision' | 'permissions'): Promise<TResponse | undefined> {
        const { body, statusCode } = await request(this.tokenUrl, {
            method: 'POST',
            headers: {
                'Authorization': this._request.headers['authorization'],
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
                'audience': keycloakConfig['resource'],
                'permission': permission,
                'response_mode': mode,
            }).toString(),
        })
        if(statusCode < 300) {
            return body.json() as Promise<TResponse>;
        }
        console.log(`Error in authzRequest: ${statusCode}`);
        console.log(`Response body: ${await body.text()}`);
        return undefined;
    }

    async authorize(permission: string): Promise<boolean> {
        if (!this._request.headers['authorization']) {
            return false;
        }
        const decision = await this.authzRequest<{ result: boolean }>(permission, 'decision');
        return decision?.result ?? false;
    }

    async permissions(permission: string): Promise<PermissionsResponse> {
        if (!this._request.headers['authorization']) {
            return { authorized: false, resources: [] };
        }
        const permissions = await this.authzRequest<{ rsid: string, rsname: string }[]>(permission, 'permissions');
        if (permissions) {
            this.allowedResources = permissions.map(p => ({  id: p.rsid, uniqueName: p.rsname }));
            return { authorized: true, resources: this.allowedResources };
        }
        return { authorized: false, resources: [] };
    }
}