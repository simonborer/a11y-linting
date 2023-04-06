import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { runAccessibilityAudit } from './index.axe.js';
import { validateHtml } from './index.validate.js';
import { checkLinks } from './index.links.js';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('index.html', function() {
  describe('Accessibility', function() {
    it('should raise no accessibility issues in axe-core', async function() {
      const result = await runAccessibilityAudit();
      expect(result.list, `(Axe error messages: ${result.messages})`).to.have.lengthOf(0);
    });
  });

  describe('HTML validation', function() {
    this.timeout(10000);

    it('validates as HTML5 according to the W3C', async function() {
      const errors = await validateHtml();
      expect(errors.list, `(HTML error messages: ${errors.messages})`).to.have.lengthOf(0);
    });
  });

  describe('Link validation', function() {
    it('has no broken links', async function() {
      const hasNoBrokenLinks = await checkLinks();
      expect(hasNoBrokenLinks.status, `(Broken links: ${JSON.stringify(hasNoBrokenLinks.errors)})`).to.be.true;
    });
  });
});