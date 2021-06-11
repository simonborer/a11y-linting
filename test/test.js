const assert = require('assert'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect,
    {axe} = require('./index.axe'),
    lght = require('./index.lighthouse'),
    val = require('./index.validate'),
    links = require('./index.links');

describe('index.html', function() {
    describe('Lighthouse metrics', function() {
        // On a server, you've got to wait for Puppeteer to install, 
        // and this can take awhile.
        this.timeout(60000);
        describe('Accessibility metrics', function() {
            it('should get a perfect score in lighthouse performance metrics', async function() {
                return expect(await lght.accessibility()).to.have.property('accessibility').to.equal(1);
            });
        });
    });
    describe('Accessibility', function() {
        it('should raise no accessibility issues in axe-core', async function() {
            return expect(Promise.resolve(ax())).to.eventually.have.property('violations').to.have.lengthOf(0);
        });
    });
    describe('HTML validation', function() {
        // W3 server can take > 2000 to return response
        this.timeout(10000);
        it('validates as HTML5 according to the W3C', async function() {
            return expect(await val()).to.have.lengthOf(0);
        });
    });
    describe('Link validation', function() {
        it('has no broken links', async function() {
            return expect(await links()).to.be.true;
        });
    });
});