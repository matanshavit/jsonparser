const chai = require('chai')
const expect = chai.expect

const parseJSON = require('../src/parseJSON')

function expectParses(data) {
  expect(parseJSON(JSON.stringify(data))).to.equal(data)
}

function expectParsesDeep(data) {
  expect(parseJSON(JSON.stringify(data))).to.eql(data)
}

describe('Integers', () => {
  it('can parse a single digit', () => {
    expectParses(5)
  })

  it('can parse a multiple digits', () => {
    expectParses(834)
  })
})

describe('Constants', () => {
  it('can parse true', () => {
    expectParses(true)
  })

  it('can parse false', () => {
    expectParses(false)
  })

  it('can parse null', () => {
    expectParses(null)
  })
})

describe('Strings', () => {
  it('can parse strings', () => {
    expectParses('Hello')
  })

  it('can parse strings with numbers in them', () => {
    expectParses('They had 42 tests')
  })

  it('can parse strings with quotes in them', () => {
    expectParses('I said "Hi"')
  })

  it('can parse strings with backslashes in them', () => {
    expectParses('\\backslashes!\\')
  })

  it('can parse strings with arrays in them', () => {
    expectParses('[1, 2, 3, "hello"]')
  })
})

describe('Arrays', () => {
  it('can parse empty arrays', () => {
    expectParsesDeep([])
  })

  it('can parse arrays of numbers', () => {
    expectParsesDeep([22, 13, 4])
  })

  it('can parse arrays of numbers, strings, and constants', () => {
    expectParsesDeep([22, 'hello', 'test', true, 13, 'expect', false, 4])
  })

  it('can parse arrays with arrays', () => {
    expectParsesDeep([['a', 'b', 'c'], [1, 2, 3, 'cat'], 'dog'])
  })

  it('can parse empty arrays in arrays', () => {
    expectParsesDeep([[], [1, 2, 3]])
  })

  it('can parse arrays with objects', () => {
    expectParsesDeep([{a:1,b:2,c:'hi'},{d:4,e:5,f:[1,2,'hello']}])
  })
})

describe('Objects', () => {
  it('can parse objects', () => {
    expectParsesDeep({a:1, b:2, c:3, 6:7})
  })

  it('can parse objects with arrays as values', () => {
    expectParsesDeep({a:['hi', 1, 2, 3], b:['test', [4, 5, 6]]})
  })

  it('can parse objects with objects as values', () => {
    expectParsesDeep({
      a:{b:['test', [4, 5, 6], {a: 1}], c:7}, d:{e:{f:5}}}
    )
  })
})
