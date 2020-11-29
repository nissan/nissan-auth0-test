const clientIdRegEx = /context.clientID(.*?)/g;

const clientIdRegExLineOfCode = /.*context.clientID.*/g;

const wordInQuotesRegEx = /'(.*?)'/g;

const removeSingleQuotes = (text) => text.replace(/'/g, "");

const getUniversalRules = (rules) => {
  if (!rules) return {};
  const matches = [];
  rules.forEach((rule) => {
    if (!rule.script.match(clientIdRegEx)) {
      matches.push(rule);
    }
  });
  return matches;
};

const getAppSpecificRules = (rules) => {
  if (!rules) return {};
  const matches = [];
  rules.forEach((rule) => {
    if (rule.script.match(clientIdRegEx)) {
      matches.push(rule);
    }
  });
  return matches;
};

const getClientIDForRule = (rule) => {
  // Assumption: There is only a maximumum of one clientID matching to every rule.
  const { script } = rule;
  const matches = script.match(clientIdRegExLineOfCode);
  // console.log("Matches: " + matches);
  if (!matches) return {};
  if (matches.length > 1)
    throw new Error(
      "Can't handle more than one clientID conditional match in script yet"
    );
  const firstMatch = matches[0];
  //Assumption: The clientID value is the only value in single quotes in this line
  const matchedClientID = firstMatch.match(wordInQuotesRegEx);
  if (matchedClientID.length > 1)
    throw new Error("Can't handle more than one word in single quotes yet");
  // console.log(removeSingleQuotes(matchedClientID[0]));
  return removeSingleQuotes(matchedClientID[0]);
};

const getClientRuleMap = (apps, rules) => {
  // Assumption: There is only a maximumum of one clientId matching to every rule.
  const appRules = apps.map((app) => {
    app.rules = [];
    return app;
  });

  const appSpecificRules = getAppSpecificRules(rules);
  

  appSpecificRules.forEach((rule) => {
    const clientId = getClientIDForRule(rule);
    const matchingApp = appRules.find(
      (app) => app.client_id.localeCompare(clientId) === 0
    );

    if (matchingApp) {
      const newRule = {id:rule.id, name:rule.name, enabled:rule.enabled, script:rule.script};
      matchingApp.rules.push(newRule);
    }
  });

  const universalRules = getUniversalRules(rules);
  universalRules.forEach((rule) => {
    appRules.map((app) => {
      if (app.name.localeCompare("All Applications") === 0) {
        const newRule = {id:rule.id, name:rule.name, enabled:rule.enabled, script:rule.script};
        app.rules.push(newRule);
      }
      return app;
    });
  });
  return appRules;
};

exports.clientIdRegEx = clientIdRegEx;
exports.clientIdRegExLineOfCode = clientIdRegExLineOfCode;
exports.wordInQuotesRegEx = wordInQuotesRegEx;
exports.removeSingleQuotes = removeSingleQuotes;
exports.getUniversalRules = getUniversalRules;
exports.getAppSpecificRules = getAppSpecificRules;
exports.getClientIDForRule = getClientIDForRule;

exports.getClientRuleMap = getClientRuleMap;
