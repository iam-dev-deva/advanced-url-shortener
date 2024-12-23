const express = require('express')
const nanoid= require('nanoid')
const nanoIdGen = nanoid.customAlphabet('1234567890abcdef', 10)
const Url = require('./../models/url.models.js')
const {validateUrl} = require('./../utils/utils.js')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });

const router = express.Router();

// Short URL Generator
router.post('/short', async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoIdGen(10);
  if (origUrl) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error'+err);
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});


router.get('/:urlId', async (req, res) => {
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
      if (url) {
        await Url.updateOne(
          {
            urlId: req.params.urlId,
          },
          { $inc: { clicks: 1 } }
        );
        return res.redirect(url.origUrl);
      } else res.status(404).json('Not found');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  });
module.exports = router;