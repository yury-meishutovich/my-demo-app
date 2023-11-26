import axios from 'axios';
import {
    IPublicClientApplication,
    InteractionStatus,
    AccountInfo

} from "@azure/msal-browser";
import { appConfig } from './config'



interface Response<T> {
    data: T
}

export interface Player {
    name: string;
    pos: number;
    id: number;
}

export interface Challange {
    homePlayerName: string,
    guestPlayerName: string,
    id: number
}

export interface Match {
    homePlayerName: string,
    guestPlayerName: string
    homePlayerScore: number[],
    guestPlayerScore: number[]
}



export const secureApiCall = async (instance: IPublicClientApplication, inProgress: InteractionStatus, accounts: AccountInfo[], apiCall: (token: string) => void): Promise<void> => {

    const accessTokenRequest = {
        scopes: ["openid", ...[appConfig.accessTokenScope]],
        account: accounts[0],
    };

    if (inProgress === InteractionStatus.None) {
        const accessTokenResponse = await instance.acquireTokenSilent(accessTokenRequest);
        apiCall(accessTokenResponse.accessToken);
    }
}


export const getPlayers = async (token: string): Promise<Player[]> => {
    const header = await getRequestHeaderWithToken(token);

    const resp: Response<Player[]> = await axios.get(appConfig.apiBaseUrl + '/players', header);
    return resp.data;
}

export const getChallanges = async (token: string): Promise<Challange[]> => {
    const header = await getRequestHeaderWithToken(token);
    const resp: Response<Challange[]> = await axios.get(appConfig.apiBaseUrl + '/challenges', header);
    return resp.data;
}

export const getMatches = async (token: string): Promise<Match[]> => {
    const header = await getRequestHeaderWithToken(token);
    const resp: Response<Match[]> = await axios.get(appConfig.apiBaseUrl + '/matches', header);
    return resp.data;
}

export const issueChallenge = async (token: string, playerId: number): Promise<void> => {
    const header = await getRequestHeaderWithToken(token);
    await axios.post(appConfig.apiBaseUrl + '/challenges', { playerId }, header);
}

export const reportScore = async (token: string, challengeId: number, homePlayerScore: number[], guestPlayerScore: number[]): Promise<void> => {
    const header = await getRequestHeaderWithToken(token);
    await axios.post<{}>(appConfig.apiBaseUrl + '/challenges/reportscore', { challengeId, homePlayerScore, guestPlayerScore }, header);
}

const getRequestHeaderWithToken = (token: string): { "headers": { 'Authorization': string } } => {

    return {
        "headers": {
            'Authorization': 'Bearer ' + token
        }
    }
}
