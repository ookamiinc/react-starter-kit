/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const Promise = require('bluebird');
const AWS = require('aws-sdk');

const readFile = Promise.promisify(fs.readFile);
const gzip = Promise.promisify(zlib.gzip);
const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'build', 'public', 'assets');
const isDebug = !process.argv.includes('--release');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

async function uploadFile(workingDirectory, fileName, type) {
  const data = await readFile(path.join(workingDirectory, fileName));
  const content = await gzip(data);
  const contentType = type || 'application/text';
  const object = {
    Bucket: process.env.AWS_S3_BUCKET,
    ACL: 'public-read',
    Key: `build/${fileName}`,
    Body: content,
    CacheControl: 'max-age=31536000',
    ContentEncoding: 'gzip',
    ContentLength: content.length,
    ContentType: contentType,
  };

  return s3.putObject(object).promise();
}

/**
 * Upload build files to S3.
 */
function upload() {
  if (isDebug) return Promise.resolve();
  const files = fs.readdirSync(ASSETS_DIR);
  const tasks = files.map(file => {
    if (/\.js$/.test(file)) {
      return uploadFile(ASSETS_DIR, file, 'text/javascript');
    } else if (/\.css$/.test(file)) {
      return uploadFile(ASSETS_DIR, file, 'text/css');
    }
    console.log(`skipping: ${file}`);
    return null;
  });

  return Promise.all(tasks)
    .then(() => console.log('All uploads successfully completed!'))
    .catch(errors => errors.forEach(error => console.error(error)));
}

export default upload;
