// Rules can be 
// 1. Globally applied
// 2. Apply to a specific clientId by inclusion test (if clientID===`xxx`{/* do something for clientID then callbackv/* })
// 3. Apply to all other clientIds by exclusion test (if clientID!=='xxx' {/* do something for anyone but clientID then callback*/})
// How do we test if the inclusion is the rule application path or the exclusion?
export const apps =  [
  {
    "global": true,
    "tenant": "nissan-auth0-test",
    "callbacks": [],
    "is_first_party": true,
    "name": "All Applications",
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "owners": [
      "mr|google-oauth2|112740651998139826855"
    ],
    "client_id": "vUYfq7viCBUIT2h2fRPnM95juJTO2IlK"
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "Default App",
    "callbacks": [],
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "client_id": "EwtwLqR4hd7wxKT5jqSzeumzBlAwxiNM",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "grant_types": [
      "authorization_code",
      "implicit",
      "refresh_token",
      "client_credentials"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "demo-native-app-1",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "client_id": "P4hZuXwxoTcfb7dtWQsjU377lkD2YokX",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "token_endpoint_auth_method": "none",
    "app_type": "native",
    "grant_types": [
      "authorization_code",
      "implicit",
      "refresh_token"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "App Rules Report Query SPA",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "leeway": 0,
      "token_lifetime": 2592000,
      "rotation_type": "rotating",
      "expiration_type": "expiring"
    },
    "allowed_clients": [],
    "callbacks": [
      "http://localhost:3000"
    ],
    "native_social_login": {
      "apple": {
        "enabled": false
      },
      "facebook": {
        "enabled": false
      }
    },
    "allowed_logout_urls": [
      "http://localhost:3000"
    ],
    "client_id": "bcaUUvMTRLE4XARQAzHlOs1gUKd5YT9y",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "client_aliases": [],
    "token_endpoint_auth_method": "none",
    "app_type": "spa",
    "grant_types": [
      "authorization_code",
      "implicit",
      "refresh_token"
    ],
    "web_origins": [
      "http://localhost:3000"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "demo-spa-app-1",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "leeway": 0,
      "token_lifetime": 2592000,
      "rotation_type": "rotating",
      "expiration_type": "expiring"
    },
    "client_id": "2WqEi1RSNB511AJlkoDWvXEZWtG2GAnN",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "token_endpoint_auth_method": "none",
    "app_type": "spa",
    "grant_types": [
      "authorization_code",
      "implicit",
      "refresh_token"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "demo-webapp-1",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "client_id": "E6Z8yKuJFRHLXBmVJ8QjlOZLnAYTh0p2",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "token_endpoint_auth_method": "client_secret_post",
    "app_type": "regular_web",
    "grant_types": [
      "authorization_code",
      "implicit",
      "refresh_token",
      "client_credentials"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "demo-m2m-app-1",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "client_id": "oGRR0d670Y24tnZBWI6tZKYU0MRIcuQ2",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "token_endpoint_auth_method": "client_secret_post",
    "app_type": "non_interactive",
    "grant_types": [
      "client_credentials"
    ],
    "custom_login_page_on": true
  },
  {
    "tenant": "nissan-auth0-test",
    "global": false,
    "is_token_endpoint_ip_header_trusted": false,
    "name": "App Rules Report Query API (Test Application)",
    "is_first_party": true,
    "oidc_conformant": true,
    "sso_disabled": false,
    "cross_origin_auth": false,
    "refresh_token": {
      "rotation_type": "non-rotating",
      "expiration_type": "non-expiring"
    },
    "client_id": "9mr9Be2Ynu7cy9L1R5QNgWyAMeSAv0ii",
    "callback_url_template": false,
    "jwt_configuration": {
      "alg": "RS256",
      "lifetime_in_seconds": 36000,
      "secret_encoded": false
    },
    "token_endpoint_auth_method": "client_secret_post",
    "app_type": "non_interactive",
    "grant_types": [
      "client_credentials"
    ],
    "custom_login_page_on": true
  }
]
export const rules = [
  {
    "id": "rul_G2ryoz3q3ivGcFIU",
    "enabled": true,
    "script": "function addCountry(user, context, callback) {\n  if ((context.clientID==='P4hZuXwxoTcfb7dtWQsjU377lkD2YokX') && (context.request.geoip)) {\n    context.idToken['https://example.com/country'] =\n      context.request.geoip.country_name;\n    context.idToken['https://example.com/timezone'] =\n      context.request.geoip.time_zone;\n  }\n\n  callback(null, user, context);\n}",
    "name": "Add country to the user profile for native app",
    "order": 4,
    "stage": "login_success"
  },
  {
    "id": "rul_k8v3tfAPScpR4wb3",
    "enabled": true,
    "script": "function addEmailToAccessToken(user, context, callback) {\n  // This rule adds the authenticated user's email address to the access token.\n\n  var namespace = 'https://example.com/';\n\n  context.accessToken[namespace + 'email'] = user.email;\n  return callback(null, user, context);\n}",
    "name": "Add email to access token",
    "order": 1,
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
