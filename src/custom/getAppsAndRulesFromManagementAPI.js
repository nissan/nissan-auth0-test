import {ManagementClient} from 'auth0';

export const getAppsAndRulesFromManagementAPI = async (domain, clientId, clientSecret) =>{

  var auth0 = new ManagementClient({
    domain,
    clientId,
    clientSecret,
    // scope: 'read:applications read:rules'
  });

  const apps = auth0.getClients();
  const rules = auth0.getRules();
  return [apps,rules];


}