import readline from "readline";
import GetPhotos from "./api/GetPhotos";
import NodeCache from "node-cache";
import Cache from "./api/Cache";
import CustomDate from "./api/GetDate";

//create cache
export const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const cache = new Cache();

//create user interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//lets users specify which rover and cam
var questions = function () {
  rl.question("Query yes or no? ", function (answer) {
    if (answer === "no") {
      rl.close();
    }
    rl.question("Which rover if not curiosity? ", function (rover) {
      rl.question("Which camera if not NAVCAM? ", async function (cam) {
        const customDate = new CustomDate();
        const store = cache.getPhotos();
        const { day, month, year } = customDate.getYMD(0);
        //if the store does not exist or does not have todays date it will query for more photos and update the store
        if (
          store === undefined ||
          store[`${year}-${month}-${day}`] === undefined
        ) {
          const query = new GetPhotos(rover, cam);
          const photos = await query.get();
          cache.cachePhotos(photos);
        }
        //prints whats in the store and reruns the questions until user input stops it
        console.log(cache.getPhotos());
        questions();
      });
    });
  });
};

questions();
rl.on("close", function () {
  console.log("\nCLOSE");
  process.exit(0);
});
