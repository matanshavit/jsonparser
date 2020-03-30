class Parser {
  constructor(jsonString) {
    this.remainder = jsonString
  }

  parseNextItem() {
    if (this.remainder[0] === '[') {
      return this.parseNextArray()
    }
    if (this.remainder[0] === '{') {
      return this.parseNextObject()
    }
    if (this.remainder[0] === '"') {
      return this.parseNextString()
    }
    if (this.remainder[0].match(/\d/)) {
      return this.parseNextInt()
    }
    return this.parseNextConstant()
  }

  parseNextArray() {
    this.unshift(1)  // remove [
    var result = []
    var nextSeperator = this.remainder[0]
    if (nextSeperator === ']') {  // empty array
      this.unshift(1)  // remove ]
      return []
    }
    while (nextSeperator !== ']') {
      result.push(this.parseNextItem())
      nextSeperator = this.remainder[0]
      this.unshift(1)  // remove , or ]
    }
    return result
  }

  parseNextObject() {
    this.unshift(1)  // remove {
    var result = {}
    var nextSeperator = this.remainder[0]
    if (nextSeperator === '}') {  // empty object
      this.unshift(1)  // remove }
      return {}
    }
    while (nextSeperator !== '}') {
      var key = this.parseNextItem()
      this.unshift(1)  // remove :
      result[key] = this.parseNextItem()
      nextSeperator = this.remainder[0]
      this.unshift(1)  // remove , or }
    }
    return result
  }

  parseNextString() {
    this.unshift(1)  // remove "
    var result = ''
    while(this.remainder[0] !== '"') {
      if (
        this.remainder[0] === '\\' && (
          this.remainder[1] === '\\' ||
          this.remainder[1] === '"'
        )
      ) {
        this.unshift(1)  // remove \
      }
      result = result + this.remainder[0]
      this.unshift(1)  // remove \ or " (escaped)
    }
    this.unshift(1)  // remove "
    return result
  }

  parseNextInt() {
    const intString = this.remainder.match(/^\d+/)[0]
    this.unshift(intString.length)
    return parseInt(intString)
  }

  parseNextConstant() {
    if (this.remainder.startsWith('true')) {
      this.unshift(4)
      return true
    }
    if (this.remainder.startsWith('false'))  {
      this.unshift(5)
      return false
    }
    if (this.remainder.startsWith('null'))  {
      this.unshift(4)
      return null
    }
  }

  unshift(length) {
    this.remainder = this.remainder.slice(length)
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
