import { getAppsAndRulesFromManagementAPI } from './auth0Manager';
import config from "./auth0_management_config.json";
it('gets the collection of apps and rules from the tenant using the management API', async ()=>{
    const [apps, rules] = await getAppsAndRulesFromManagementAPI(config.domain, config.clientId, config.clientSecret);
    expect(apps).toBeTruthy();
    expect(rules).toBeTruthy();
})

it('has a clientID and clientName property for each app returned from the management API', async ()=>{
    const [apps,_] = await getAppsAndRulesFromManagementAPI(config.domain, config.clientId, config.clientSecret);
    apps.forEach(app => {
        expect(app.client_id).toBeTruthy();
        expect(app.name).toBeTruthy();
    })
})

it('has the id, name, enabled and script for each rule returned from the management API', async ()=> {
    const [_,rules] = await getAppsAndRulesFromManagementAPI(config.domain, config.clientId, config.clientSecret);
    
    rules.forEach(rule => {
        expect(rule.id).toBeTruthy();
        expect(rule.name).toBeTruthy();
        expect(rule.script).toBeTruthy();
        expect(rule.enabled).toBeTruthy();
    })
})



