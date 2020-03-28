const chai = require('chai')
const expect = chai.expect

const parseJSON = require('../src/parseJSON')

function expectParses(data) {
  expect(parseJSON(JSON.stringify(data))).to.equal(data)
}

describe('Integers', () => {
  it('can parse a single digit', () => {
    expectParses(5)
  })

  it('can parse a multiple digits', () => {
    expectParses(834)
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
    expectParses('\\backslahes!\\')
  })
})
