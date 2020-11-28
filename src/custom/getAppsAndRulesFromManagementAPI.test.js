import { getAppsAndRulesFromManagementAPI } from './getAppsAndRulesFromManagementAPI';
import config from "./auth0_management_config.json";
it('gets the collection of apps and rules from the tenant using the management API', async ()=>{
    const [apps, rules] = await getAppsAndRulesFromManagementAPI(config.domain, config.clientId, config.clientSecret);
    expect(apps).toBeTruthy();
    expect(rules).toBeTruthy();
})