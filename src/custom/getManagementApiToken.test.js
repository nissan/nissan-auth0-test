import { getManagementApiToken } from './getManagementApiToken';
import config from "./auth0_management_config.json";
it('gets a management API token', ()=>{
    const token = getManagementApiToken(config.domain, config.clientId, config.clientSecret);
    expect(token).toBeTruthy();
})