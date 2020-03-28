function parseJSON(jsonString) {
  if (jsonString[0] === '"') {
    return jsonString.slice(1, -1)
  }
  return parseInt(jsonString)
}

module.exports = parseJSON
