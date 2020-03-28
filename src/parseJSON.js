function parseJSON(jsonString) {
  if (jsonString[0] === '[') {
    return parseArray(jsonString)
  }
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

function parseArray(jsonString) {
  const itemStrings = jsonString.slice(1, -1).split(',')
  return itemStrings.map((itemString) => {
    return parseInt(itemString)
  })
}

module.exports = parseJSON
