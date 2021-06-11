const fet = require('node-fetch'),
    puppeteer = require('puppeteer'),
    express = require('express'),
    app = express();

const port = 4324;

module.exports = links = async () => {
    app.use(express.static('public'));
    const server = app.listen(port, () => console.log(`Link validation server listening on port: ${port}`));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:' + port);
    const anchors = await page.evaluate(() => {
        return Array.from(document.getElementsByTagName('a'));
    });

    const responseArray = [];

    for (const anchor of anchors) {
        const aObj = {
            href: anchor.href
        };

        const getData = async (url) => {
            try {
                const response = await fet(url);
                const res = await response;
                aObj.statusCode = res.status;
            } catch (error) {
                aObj.statusCode = error.message;
            }
        };

        await getData(anchor.href);
        responseArray.push(aObj);
    }


    await page.close();
    await browser.close();
    await server.close();

    const noBrokenLinks = responseArray.every(resp => resp.statusCode < 400);
    return noBrokenLinks;
};