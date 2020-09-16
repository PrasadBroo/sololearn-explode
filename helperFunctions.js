const fetch = require("node-fetch");
const userAgents = require("./useragentlist");

async function makeRequest(url, options) {
  try {
    const res = await new fetch(url, options);
    return { res, err: false };
  } catch (error) {
    return { err: true };
  }
}

function validateSololearnId(sololearnid) {
  return (
    sololearnid.length >= 10 ||
    sololearnid.length < 6 ||
    !typeof sololearnid === "number"
  );
}

function randomUserAgent() {
  let random = Math.floor(Math.random() * userAgents.length);
  return userAgents[random];
}

function validateRoute(sections, language) {
  let validRoutes = {
    forSection: ["trending", "mostrecent", "mostpopular"],
    forLang: [
      "web",
      "kt",
      "cpp",
      "c",
      "cs",
      "java",
      "py",
      "php",
      "rb",
      "swift",
      "all",
    ],
  };
  let section = sections;
  let lang = language;

  return (
    !validRoutes.forSection.includes(section) ||
    !validRoutes.forLang.includes(lang)
  );
}

module.exports = { makeRequest, validateSololearnId, randomUserAgent,validateRoute};
