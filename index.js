const fs = require("fs");
const superagent = require("superagent");

//promisifying the fs.readFile below
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not finde the file");
      resolve(data);
    });
  });
};

//calling the function that will return the promise and so .then handler is available for us.
readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random dog image saved  to file");
      });
    })
    .catch((err) => console.log(err.message));
});
