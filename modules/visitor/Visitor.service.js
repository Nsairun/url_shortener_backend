const UrlRepository = require("../urls/url.repo");
const VisitorRepository = require("./visitor.repo");

class VisitorService {
  constructor() {
    this.visitorRepo = new VisitorRepository();
    this.urlRepo = new UrlRepository();
  }

  async getAllVisitors() {
    const allVisitors = await this.visitorRepo.getAllVisitors();
    return allVisitors;
  }

  async getOneVisitor(id) {
    const visitor = await this.visitorRepo.getVisitorById(id);
    return visitor;
  }

  async registerOneVisitor(visitor) {
    try {
      const duplicateVisit = await this.visitorRepo.getAllByIpAndUrldId(
        visitor.ip_address,
        visitor.UrlId
      );

      // const url = await this.urlRepo.getUrlById(visitor.UrlId);
      // url.clicks = +url.clicks + 1;

      // console.log('\n \n this updated url', url, '\n \n')

      // this.urlRepo.updateUrlClicks(url);

      await this.urlRepo.getUrlById(visitor.UrlId).then((url) => {
        url.clicks = +url.clicks + 1;

        console.log("\n \n this updated url", url.dataValues, "\n \n");
        this.urlRepo.updateUrlClicks(url, url.id);
      });

      if (duplicateVisit.length > 0) {
        await this.visitorRepo.updateVisitor(visitor, duplicateVisit[0].id);
        return 208;
      }

      await this.visitorRepo.createOneVisitor(visitor);

      return 202;
    } catch (e) {
      throw e;
      throw new Error("COULD_NOT_REGISTER_VISITOR");
    }
  }

  async deleteOneVisitor(id) {
    try {
      const visitor = await this.getOneVisitor(id);
      if (!visitor) return 404;

      await this.visitorRepo.dropOneVisitor(id);
      return 202;
    } catch {
      throw new Error("COULD_NOT_DELETE_VISITOR");
    }
  }
}

module.exports = VisitorService;
