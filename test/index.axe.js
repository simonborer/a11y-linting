const puppeteer = require('puppeteer'),
    axe = require('axe-core'),
    express = require('express'),
    app = express();
const port = 4322;

module.exports = ax = async () => {
    app.use(express.static('public'));
    const server = app.listen(port, () => console.log(`AX Server listening on port: ${port}`));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:' + port);

    await page.addScriptTag({
        path: require.resolve('axe-core')
    });

    const result = await page.evaluate(async () => {
        return await axe.run();
    });

    await page.close();
    await browser.close();
    await server.close();

    return result;
};