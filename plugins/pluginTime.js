
     function pluginTime() {
      let date = new Date();
      let day = Number(date.getDate());
      let month = Number(date.getMonth()) + 1;
      let year = Number(date.getFullYear());
      let hours = Number(date.getHours());
      let minutes = Number(date.getMinutes());
      let timestamp = Number(date.getTime());
  //    let massTime = [day, month, year, hours, minutes];

      if (day < 10) {day = "0" + day;}
      if (month < 10) {month = "0" + month;}
      if (hours < 10) {hours = "0" + hours;}
      if (minutes < 10) {minutes = "0" + minutes;}
      let dataRegist = `${day}-${month}-${year}, ${hours}:${minutes}`;
//      let objTime = {a:dataRegist, b:massTime};
      let objTime = {a:dataRegist, b:timestamp};
      return objTime;
    }

   module.exports = pluginTime;
