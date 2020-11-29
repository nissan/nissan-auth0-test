export const clientIdRegEx = /context.clientID(.*?)/g;

export const clientIdRegExLineOfCode = /.*context.clientID.*/g;

export const wordInQuotesRegEx = /'(.*?)'/g;

export const removeSingleQuotes = (text) => text.replace(/'/g, "");

export const getUniversalRules = (rules) => {
  if (!rules) return {};
  const matches = [];
  rules.forEach((rule) => {
    if (!rule.script.match(clientIdRegEx)) {
      matches.push({
        id: rule.id,
        enabled: rule.enabled,
        name: rule.name,
        script: rule.script,
      });
    }
  });
  return matches;
};

export const getAppSpecificRules = (rules) => {
  if (!rules) return {};
  const matches = [];
  rules.forEach((rule) => {
    if (rule.script.match(clientIdRegEx)) {
      matches.push({
        id: rule.id,
        enabled: rule.enabled,
        name: rule.name,
        script: rule.script,
      });
    }
  });
  return matches;
};

export const getClientIDForRule = (rule) => {
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
