var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);
var request;

describe("GET /api/upload", function() {
  
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all data", function(done) {
    db.Upload.bulkCreate([
      { product_name: "First Example", description: "First Description", uploaded: true },
      { product_name: "Second Example", description: "Second Description" ,  uploaded:true}
    ]).then(function() {
      request.get("/upload").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an('object');
       
        // expect(responseBody)
        //   .to.be.an("array")
        //   .that.has.lengthOf(2);

        // expect(responseBody[0])
        //   .to.be.an("object")
        //   .that.includes({ text: "First Example", description: "First Description" });

        // expect(responseBody[1])
        //   .to.be.an("object")
        //   .that.includes({ text: "Second Example", description: "Second Description" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

// describe("canary test", function() {
//   // A "canary" test is one we set up to always pass
//   // This can help us ensure our testing suite is set up correctly before writing real tests
//   it("should pass this canary test", function() {
//     expect(true).to.be.true;
//   });
// });
