const getAppsAndRulesFromManagementAPI = async (domain, clientId, clientSecret) =>{

  var ManagementClient = require('auth0').ManagementClient;
  var auth0 = new ManagementClient({
    domain,
    clientId,
    clientSecret,
    // scope: 'read:applications read:rules'
  });

  const apps = await auth0.getClients();
  const rules = await auth0.getRules();
  return [apps,rules];
}

exports.getAppsAndRulesFromManagementAPI = getAppsAndRulesFromManagementAPI;