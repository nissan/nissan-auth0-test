# Auth0 React SDK Enriched AppData Sample Application

This sample demonstrates a query to the Management API that retrieves the applications and rules for a given tenant, and produces a tabular list of applications with their respective applied rules. It is based on the [Auth0 React Sample](https://github.com/auth0-samples/auth0-react-samples/)

The custom features that it includes are:

- [App Rules Listing View Component](https://github.com/nissan/nissan-auth0-test/blob/main/src/views/AppRulesListing.js)
- [App Rules Listing API route](https://github.com/nissan/nissan-auth0-test/blob/main/api-server.js)
- [Custom Management API calls] (https://github.com/nissan/nissan-auth0-test/blob/main/src/custom/auth0Manager.js) and associated [test](https://github.com/nissan/nissan-auth0-test/blob/main/src/custom/auth0Manager.test.js)
- [Custom helper utilities](https://github.com/nissan/nissan-auth0-test/blob/main/src/custom/utils.js) for processing and mapping the data returned by the management API calls and their associated [tests](https://github.com/nissan/nissan-auth0-test/blob/main/src/custom/utils.test.js)

## Project setup

1. Log on to your Auth0 tenant and create a new SPA Application. This application will be used by the solution application you will clone.

- Note the `clientId` assigned
- If running from your *“<http://localhost:3000>”* which is the default for the code, ensure the **Allowed Callback URLs**, **Allowed Logout URLs** and **Allowed Web Origins** fields are correctly set to this value
- If you wish to set specific connections for this application, such as you only want users with accounts on your Active Directory to be able to login to this application you can do specify via the *Connections* tab of the app to increase the security of this utility application.

1. Create a Rule to limit access to the application to specific users
After creating the application, you should create a rule for the SPA application to meet the requirement that only specific users should be able to log in to this application. You can click on the Rules item in the left menu and then create a new Rule.

    - From the list of templates select “Whitelist for a Specific App”
    - Inside the code for the rule, amend the line that says `context.clientName !== ‘NameOfTheAppWithWhiteList’`  to `context.clientID !== ‘<yourClientId>’` to the `clientId` noted in step 1.
    - Amend the `whitelist` array with the list of authorised user emails for the application. Ensure to add your own email address to validate the application is running in later steps.
    - Click **Save Changes**

1. Create a new API by clicking on the *APIs* menu item and clicking the “Create API” button. Set the `identifier` value to a valid name and make note of the value of this field. 

1. When you create the new API, a new Machine to Machine application will also be created. It will be listed under the “Applications” tab with as the name of your new API  (Test Application) .

    - Open this application and note the “ClientID” and “Client Secret” values, which I will reference as “Management Client ID” and “Management Client Secret” to avoid confusion in later steps. 
    - On the “APIs” tab of this application, ensure that the “Auth0 Management API” toggle is set to “Authorised” (green) as this will allow it to call the Management API endpoints for data related to your tenant

1. Clone the GitHub repo at <https://github.com/nissan/nissan-auth0-test> and open the folder inside your favourite code editor or IDE.

1. We need to configure the auth0 specific settings for the SPA application

    - Create a copy of the `auth0_config.json.example` as auth0_config.json file inside the same `src` folder.
    - Replace the “domain” setting with your target Auth0 tenant domain
    - Replace the `clientId` setting with the `clientId` of the SPA application that was setup in step 1.
    - Replace the `audience` setting with the `identifier` value of your application API that was configured in step 3

1. We now need to configure the auth0 settings specific for accessing the Management API 

    - Create a copy of the `auth0_management_config.json.example` file as `auth0_management_config.json` inside the same `src\custom` folder it is located in.
    - Replace the `domain` setting with your target Auth0 tenant domain
    - Replace the `clientId` setting with the `clientId` value we noted in step 4 (the “Management Client Id”)
    - Replace the `clientSecret` setting with the `clientSecret` value we noted in step 4 (the “Management Client Secret”)

1. To run the application, simply run `yarn install` and then `yarn start`.

    - Login to the application.
    - Click on the “App Rules Listing” menu item. This should use the settings specified to generate an updated listing of applications and their associated rules.
    - Click on the “Ping API” button to validate that your connection is configured correctly and data is being returned in the “appData” field of the JSON returned. 
    - Alternatively, you can run `yarn test` and specify the `utils.test.js` and `auth0Manager.test.js` files to test the custom functions added are working as expected.

It may also help to reference the original sample's [README](https://github.com/auth0-samples/auth0-react-samples/blob/master/README.md) for other instructions, help and support options and other additional information about the building block application

## Modification Author

[Nissan Dookeran](https://github.com/nissan)
## Original Author

[Auth0](https://auth0.com)


## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.
