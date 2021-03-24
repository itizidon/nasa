class CustomDate {
  constructor() {
  }

  //returns the year month and date user input amount of days from today
  getYMD(days) {
    var date = new Date();
    var previousDate = date - 1000 * 60 * 60 * 24 * days;

    previousDate = new Date(previousDate);
    return {
      day: previousDate.getDate(),
      month: previousDate.getMonth() + 1,
      year: previousDate.getFullYear(),
    };
  }
}

export default CustomDate