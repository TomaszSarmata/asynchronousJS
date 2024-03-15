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

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("Success, data written into the file successffully");
    });
  });
};

//calling the function that will return the promise and so .then handler is available for us.
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro("dog-img.txt", res.body.message);
  })

  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => console.log(err.message));
