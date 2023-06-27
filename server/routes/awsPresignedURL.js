require('dotenv').config({ path:".env.local"}); // dotenv is package to load environment variables
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
var express = require('express');
var router = express.Router();

const s3Client = new S3Client({
    region: process.env.aws_region,
    credentials: {
      accessKeyId: process.env.access_key_id,
      secretAccessKey: process.env.secret_access_key,
    },
  });



router.get('/', async (req, res) => {
    const key = `${Date.now().toString()}`; // generate unique key for this file
    const command = new PutObjectCommand({
        Bucket: process.env.aws_bucket,
        Key: key,
        ContentType: req.query.fileType,
      });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log("nice aws presigned url succeeded");
        res.json({ url, key });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;