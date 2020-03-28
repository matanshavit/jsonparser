function parseJSON(jsonString) {
  if (jsonString[0] === '"') {
    return parseString(jsonString)
  }
  return parseInt(jsonString)
}

function parseString(jsonString) {
  const innerString = jsonString.slice(1, -1)
  return replaceEscapeCharacters(innerString)
}

function replaceEscapeCharacters(string) {
  return string
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}

module.exports = parseJSON
