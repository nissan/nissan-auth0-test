export const getManagementApiToken = (domain, clientId, clientSecret) =>{
    var axios = require("axios").default;
    console.log(`Domain: ${domain}`);
    console.log(clientId);
    console.log(clientSecret);
    var options = {
      method: 'POST',
      url: `https://${domain}/oauth/token`,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: {
        grant_type: 'client_credentials',
        client_id: `${clientId}`,
        client_secret: `${clientSecret}`,
        audience: `https://${domain}/api/v2/`
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.error(error);
      return error;
    });
    }