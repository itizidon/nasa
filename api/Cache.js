import { myCache } from "../index";
class Cache {
  constructor() {}
  //this saves the photos in the cache
  cachePhotos(photos) {
    myCache.set("photos", photos,10000);
  }
  //this returns the photos from the cache
  getPhotos() {
    return myCache.get("photos");
  }
}

export default Cache