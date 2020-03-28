const chai = require('chai')

chai.should()

describe('test setup', () => {
  it('can pass', () => {
    (1 + 1).should.equal(2)
  })
})
