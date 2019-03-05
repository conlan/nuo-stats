export function formatCreatedDate(date, timestamp) {
    var d = (new Date().getTime() / 1000 - timestamp);
  
    if(d < 86400) {
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
  
      var hDisplay = h > 0 ? h + " hr " : "";
      var mDisplay = m > 0 ? m + " min " : "";
      return hDisplay + mDisplay + "ago";
      }
      else
        return date;
  }