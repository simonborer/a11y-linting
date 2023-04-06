import express from 'express';
import validator from 'html-validator';

const app = express();
const port = 4323;

export async function validateHtml() {
    app.use(express.static('public'));

    const server = await app.listen(port);
    console.log(`VL Server listening on port: ${port}`);
    const localFile = `http://localhost:${port}`;
    const options = {
        url: localFile,
        isLocal: true,
        format: 'json'
    };

    const result = await validator(options);
    const htmlValidationErrors = {
        list: result.messages.filter(el => (el.type === 'error')),
        messages: []
    };
    htmlValidationErrors.list.forEach(err => {
        htmlValidationErrors.messages.push(err.message);
    });

    await server.close();
    return htmlValidationErrors;
};