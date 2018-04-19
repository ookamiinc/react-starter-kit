const webshot = require('webshot');

module.exports = {
  get: (request, response) => {
    const { url } = request.query;
    const options = {
      windowSize: {
        width: 387,
        height: 'auto',
      },
      shotSize: {
        height: 'all',
      },
      phantomConfig: {
        'ignore-ssl-errors': 'true',
        'ssl-protocol': 'any',
      },
      // onLoadFinished: function() {
      //   document.body.style.webkitTransform = 'scale(2)';
      //   document.body.style.webkitTransformOrigin = '0% 0%';
      //   document.body.style.width = '50%';
      // }
    };

    webshot(url, options, (err, renderStream) => {
      const imageBuffers = [];

      renderStream.on('data', data => {
        imageBuffers.push(data);
      });

      renderStream.on('end', () => {
        const imageBuffer = Buffer.concat(imageBuffers);
        response.write(imageBuffer, 'binary');
        response.end();
      });
    });
  },
};
