const UrlService = require('./url.service');

class UrlController {
  constructor() {
    this.urlService = new UrlService(); // all the methods using this.urlService are methods from the urlService class
  }

  async getAllUrls(_, res) {
    const allUrls = await this.urlService.getAllUrls();

    if(allUrls.length <= 0) return res.sendStatus(404);

    res.status(200).send(allUrls);
  }

  async getOneUrl(req, res) {
    const url = await this.urlService.getOneUrl(+req.params.id);

    if(!url) return res.sendStatus(404);

    res.status(200).send(url);
  }

  createOneUrl(req, res) {
    const { long_url } = req.body;

    if (!long_url) {
      return res.status(406).send({ message: "No Url Detected" });
    }

    this.urlService
      .registerUrl(long_url)
      .then((url) => res.status(201).send(url))
      .catch((err) => res.status(500).send(err));
  }

  deleteOneUrl(req, res) {
    this.urlService
      .deleteOneUrl(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = UrlController;