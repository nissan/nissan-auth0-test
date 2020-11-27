
import config from "./auth0_management_config.json";
import {clientIdRegEx} from './utils';

it ('should not find a clientID in code', ()=> {
    const badLinesOfCode = [
        '',
        `function addEmailToAccessToken(user, context, callback) {
            // This rule adds the authenticated user's email address to the access token.
          
            var namespace = 'https://example.com/';
          
            context.accessToken[namespace + 'email'] = user.email;
            return callback(null, user, context);
          }`

    ]
    badLinesOfCode.forEach(lineOfCode => expect(lineOfCode.match(clientIdRegEx)).toBeFalsy());
    
})

it ('should find a clientID in code', ()=> {
    const goodLinesOfCode = [
        `function userWhitelistForSpecificApp(user, context, callback) {
            // Access should only be granted to verified users.
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
          `function accessOnWeekdaysOnly(user, context, callback) {
            if (context.clientID === 'T2WqEi1RSNB511AJlkoDWvXEZWtG2GAnN') {
              const date = new Date();
              const d = date.getDay();
          
              if (d === 0 || d === 6) {
                return callback(
                  new UnauthorizedError('This app is available during the week')
                );
              }
            }
          
            callback(null, user, context);
          }`,
          `function addCountry(user, context, callback) {
            if ((context.clientID==='P4hZuXwxoTcfb7dtWQsjU377lkD2YokX') && (context.request.geoip)) {
              context.idToken['https://example.com/country'] =
                context.request.geoip.country_name;
              context.idToken['https://example.com/timezone'] =
                context.request.geoip.time_zone;
            }
          
            callback(null, user, context);
          }`

    ]
    goodLinesOfCode.forEach(lineOfCode => expect(lineOfCode.match(clientIdRegEx)).toBeTruthy());
    
})





