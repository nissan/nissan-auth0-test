
import config from "./auth0_management_config.json";
import {clientIdRegEx} from './utils';

it ('should not find a clientID in code', ()=> {
    const sampleUniversalRule = {
      "id": "rul_k8v3tfAPScpR4wb3",
      "enabled": true,
      "script": "function addEmailToAccessToken(user, context, callback) {\n  // This rule adds the authenticated user's email address to the access token.\n\n  var namespace = 'https://example.com/';\n\n  context.accessToken[namespace + 'email'] = user.email;\n  return callback(null, user, context);\n}",
      "name": "Add email to access token",
      "order": 1,
      "stage": "login_success"
    };

    const testCode = sampleUniversalRule.script;
    expect(testCode.match(clientIdRegEx)).toBeFalsy();
    
})

it ('should find a clientID in code', ()=> {
    const sampleAppSpecificRules = [
      {
        "id": "rul_G2ryoz3q3ivGcFIU",
        "enabled": true,
        "script": "function addCountry(user, context, callback) {\n  if ((context.clientID==='P4hZuXwxoTcfb7dtWQsjU377lkD2YokX') && (context.request.geoip)) {\n    context.idToken['https://example.com/country'] =\n      context.request.geoip.country_name;\n    context.idToken['https://example.com/timezone'] =\n      context.request.geoip.time_zone;\n  }\n\n  callback(null, user, context);\n}",
        "name": "Add country to the user profile for native app",
        "order": 4,
        "stage": "login_success"
      },
      {
        "id": "rul_vTZKpI3b7lGAHu53",
        "enabled": true,
        "script": "function accessOnWeekdaysOnly(user, context, callback) {\n  if (context.clientID === 'T2WqEi1RSNB511AJlkoDWvXEZWtG2GAnN') {\n    const date = new Date();\n    const d = date.getDay();\n\n    if (d === 0 || d === 6) {\n      return callback(\n        new UnauthorizedError('This app is available during the week')\n      );\n    }\n  }\n\n  callback(null, user, context);\n}",
        "name": "Allow Access during weekdays for demo-spa-app-1",
        "order": 3,
        "stage": "login_success"
      },
      {
        "id": "rul_g5o1uXlCJncQQUvJ",
        "enabled": true,
        "script": "function userWhitelistForSpecificApp(user, context, callback) {\n  // Access should only be granted to verified users.\n  if (!user.email || !user.email_verified) {\n    return callback(new UnauthorizedError('Access denied.'));\n  }\n\n  // only enforce for NameOfTheAppWithWhiteList\n  // bypass this rule for all other apps\n  if (context.clientID !== 'bcaUUvMTRLE4XARQAzHlOs1gUKd5YT9y') {\n    return callback(null, user, context);\n  }\n\n  const whitelist = ['testadmin@example.com', 'nissan.dookeran@gmail.com']; // authorized users\n  const userHasAccess = whitelist.some(function (email) {\n    return email === user.email;\n  });\n\n  if (!userHasAccess) {\n    return callback(new UnauthorizedError('Access denied.'));\n  }\n\n  callback(null, user, context);\n}",
        "name": "Whitelist for App Rules Report Query SPA",
        "order": 2,
        "stage": "login_success"
      }

    ]
    sampleAppSpecificRules.forEach(rule => expect(rule.script.match(clientIdRegEx)).toBeTruthy());    
})


it ('returns the condition statement that has the clientId inside a rule script', () => {
  return new Error('Not yet implemented')
});


it('finds the applications mentioned in a rule, or "None Specified" if the rule has no conditionals',()=>{
  return new Error('Not yet implemented')
})

it('gives a list of applications for the tenant and the rules that apply to them explicitly', ()=>{
  return new Error('Not yet implemented')
})


