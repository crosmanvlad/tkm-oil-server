/** 
 * Test sample
*/
const expect = require('chai').expect;

describe('Array', function() {
    it('length is less than 11', function() {
        let array = [1,2,3,4,5,6];
        expect(array.length).to.be.lessThan(11);
    });
});