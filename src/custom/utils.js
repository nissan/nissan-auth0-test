export const clientIdRegEx = /context.clientID(.*?)/g;

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
      });
    }
  });
  return matches;
};
