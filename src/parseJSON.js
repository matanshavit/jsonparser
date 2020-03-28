class Parser {
  constructor(jsonString) {
    this.remainder = jsonString
  }

  parseNextItem() {
    if (this.remainder[0] === '[') {
      return this.parseNextArray()
    }
    if (this.remainder[0] === '"') {
      return this.parseNextString()
    }
    return this.parseNextInt()
  }

  parseNextArray() {
    this.remainder = this.remainder.slice(1)  // remove [
    var result = []
    var nextSeperator = ','
    while (nextSeperator !== ']') {
      result.push(this.parseNextItem())
      nextSeperator = this.remainder[0]
      this.remainder = this.remainder.slice(1)  // remove , or ]
    }
    return result
  }

  parseNextString() {
    this.remainder = this.remainder.slice(1)  // remove "
    var result = ''
    while(this.remainder[0] !== '"') {
      if (
        this.remainder[0] === '\\' && (
          this.remainder[1] === '\\' ||
          this.remainder[1] === '"'
        )
      ) {
        this.remainder = this.remainder.slice(1)
      }
      result = result + this.remainder[0]
      this.remainder = this.remainder.slice(1)
    }
    this.remainder = this.remainder.slice(1)  // remove "
    return result
  }

  parseNextInt() {
    const intString = this.remainder.match(/^\d+/)[0]
    this.remainder = this.remainder.slice(intString.length)
    return parseInt(intString)
  }

  parse() {
    return this.parseNextItem()
  }

}

function parseJSON(jsonString) {
  var parser = new Parser(jsonString)
  return parser.parse()
}

module.exports = parseJSON
