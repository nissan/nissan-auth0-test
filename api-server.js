const managementApi = require("./src/custom/getAppsAndRulesFromManagementAPI");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const managementConfig = require("./src/custom/auth0_management_config.json");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (!authConfig.domain || !authConfig.audience) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.get("/api/apprules", checkJwt, async (req, res) => {
  const appData = await managementApi.getAppsAndRulesFromManagementAPI(
    managementConfig.domain,
    managementConfig.clientId,
    managementConfig.clientSecret
  )
  res.send({
    msg: "Your access token was successfully validated for the app rules listing!",
    config: managementConfig,
    appData
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
