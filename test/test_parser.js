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
