import { myCache } from "../index";
class Cache {
  constructor() {}
  //this saves the photos in the cache
  cachePhotos(photos) {
    //the way this caches the photos will only allow for 1 type of rover and camera combination
    myCache.set("photos", photos, 10000);
  }
  //this returns the photos from the cache
  getPhotos() {
    //possible overfetching here
    return myCache.get("photos");
  }
}

export default Cache;
