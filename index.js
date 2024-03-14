const fs = require("fs");
const superagent = require("superagent");

//below demostrating how we relly on call backs to get data that we then use to fetch data from api endpoint and then using another cb to clg that data
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Random dog image saved  to file");
      });
    });
});
