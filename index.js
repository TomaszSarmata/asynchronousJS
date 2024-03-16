const fs = require("fs");
const superagent = require("superagent");

//promisifying the fs.readFile below
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file");
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

// Async await approach

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]); //this is how we await the resolve values of all promises at the same time

    console.log(res.body.message);
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    // console.log("error:", err);
    throw err;
  }
  console.log(
    "2: I should come 2nd but instead I get printed last. It's because I am being executed in the event loop"
  );
  return "I should get printed as normal but instead I will appear as Promise pending";
};

(async () => {
  try {
    console.log("1: Will get dog pics");
    const x = await getDogPic(); //so here our program will stop until we get the value from our promises
    console.log(x);
    console.log("2: Done getting dog pic!!!");
  } catch (err) {
    console.log("Error!!! 💥");
  }
})();

// console.log("1: Will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("2: Done getting dog pic!!!");
//   })
//   .catch((err) => {
//     console.log("Error!!!! booooom 💥", err);
//   });
// console.log("3: Oh hang on! Why did I log ahead of the async await???");

//calling the function that will return the promise and so .then handler is available for us.
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro("dog-img.txt", res.body.message);
//   })

//   .then(() => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => console.log(err.message));
