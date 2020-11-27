import { response } from "express";

export const clientIdRegEx = /context.clientID(.*?)/g;

export const wordInQuotesRegEx = /'(.*?)'/g;

export const removeSingleQuotes = (text) => text.replace(/'/g,'');