const chai = require('chai')
const expect = chai.expect

const parseJSON = require('../src/parseJSON')

describe('Integers', () => {
  it('can parse a single digit', () => {
    expect(parseJSON(JSON.stringify(5))).to.equal(5)
  })

  it('can parse a multiple digits', () => {
    expect(parseJSON(JSON.stringify(834))).to.equal(834)
  })
})
