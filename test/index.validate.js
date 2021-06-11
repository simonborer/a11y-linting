const express = require('express'),
    app = express(),
    validator = require('html-validator');

const port = 4323;

module.exports = val = async () => {
    app.use(express.static('public'));

    const server = app.listen(port, () => console.log(`VL Server listening on port: ${port}`));
    const localFile = 'http://localhost:' + port;
    const options = {
        url: localFile,
        isLocal: true,
        format: 'json'
    };

    const result = await validator(options);

    const errArray = result.messages.filter(function(el) {
        return el.type === 'error';
    });

    await server.close();
    return errArray;
};