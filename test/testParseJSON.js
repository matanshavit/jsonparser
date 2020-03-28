const chai = require('chai')
const expect = chai.expect

const parseJSON = require('../src/parseJSON')

function expectParsesEqual(data) {
  expect(parseJSON(JSON.stringify(data))).to.equal(data)
}

function expectParsesDeepEqual(data) {
  expect(parseJSON(JSON.stringify(data))).to.eql(data)
}

describe('Integers', () => {
  it('can parse a single digit', () => {
    expectParsesEqual(5)
  })

  it('can parse a multiple digits', () => {
    expectParsesEqual(834)
  })
})

describe('Strings', () => {
  it('can parse strings', () => {
    expectParsesEqual('Hello')
  })

  it('can parse strings with numbers in them', () => {
    expectParsesEqual('They had 42 tests')
  })

  it('can parse strings with quotes in them', () => {
    expectParsesEqual('I said "Hi"')
  })

  it('can parse strings with backslashes in them', () => {
    expectParsesEqual('\\backslahes!\\')
  })
})

describe('Arrays', () => {
  it('can parse arrays of numbers', () => {
    expectParsesDeepEqual([22, 13, 4])
  })
})
