import axios from "axios";
import { API_KEY } from "../secret";
import CustomDate from "./GetDate";

class GetPhotos {
  //these inputs will allow for selecting different rovers and cams based on user input
  constructor(rover, camera) {
    this.rover = rover || "curiosity";
    this.camera = camera || "NAVCAM";
  }

  async get() {
    const previousDate = new CustomDate();
    const photos = {};
    //gets all photos in the last 10 days and takes a max of 3 from each day to return.
    for (let days = 9; days >= 0; days--) {
      //uses the date methods to get the day month and year
      const { day, month, year } = previousDate.getYMD(days);
      const { data } = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${year}-${month}-${day}&camera=${this.cam}&api_key=${API_KEY}`
      );
      photos[`${year}-${month}-${day}`] = data.photos.slice(0, 3);
    }
    return photos;
  }
}

export default GetPhotos;
