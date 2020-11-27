// Rules can be 
// 1. Globally applied
// 2. Apply to a specific clientId by inclusion test (if clientID===`xxx`{/* do something for clientID then callbackv/* })
// 3. Apply to all other clientIds by exclusion test (if clientID!=='xxx' {/* do something for anyone but clientID then callback*/})
// How do we test if the inclusion is the rule application path or the exclusion?
export const testClients = [
    {
        clientID:'9mr9Be2Ynu7cy9L1R5QNgWyAMeSAv0ii', 
        clientName:'App Rules Report Query API (Test Application)'
    },
    {
        clientID:'bcaUUvMTRLE4XARQAzHlOs1gUKd5YT9y', 
        clientName:'App Rules Report Query API (Test Application)'
    },
    {
        clientID:'EwtwLqR4hd7wxKT5jqSzeumzBlAwxiNM',
        clientName:'Default App'
    },
    {
        clientID:'oGRR0d670Y24tnZBWI6tZKYU0MRIcuQ2',
        clientName:'demo-m2m-app-1'
    },
    {
        clientID:'P4hZuXwxoTcfb7dtWQsjU377lkD2YokX',
        clientName:'demo-native-app-1'
    },
    {
        clientID:'2WqEi1RSNB511AJlkoDWvXEZWtG2GAnN',
        clientName:'demo-spa-app-1'
    },
    {
        clientID:'E6Z8yKuJFRHLXBmVJ8QjlOZLnAYTh0p2',
        clientName:'demo-webapp-1'
    }
]
export const rules = [
    {
    script: 
    `// Access should only be granted to verified users.
    if (!user.email || !user.email_verified) {
      return callback(new UnauthorizedError('Access denied.'));
    }
  
    // only enforce for NameOfTheAppWithWhiteList
    // bypass this rule for all other apps
    if (context.clientID !== 'bcaUUvMTRLE4XARQAzHlOs1gUKd5YT9y') {
      return callback(null, user, context);
    }
  
    const whitelist = ['testadmin@example.com', 'nissan.dookeran@gmail.com']; // authorized users
    const userHasAccess = whitelist.some(function (email) {
      return email === user.email;
    });
  
    if (!userHasAccess) {
      return callback(new UnauthorizedError('Access denied.'));
    }
  
    callback(null, user, context);
  }`,
  clientID:'bcaUUvMTRLE4XARQAzHlOs1gUKd5YT9y'
}
]