
   PP.pluginTimeClient = function() {
     console.log("ЭТОТ ЛОГ Я ВНОШУ СЮДА ТОЛЬКО ДЛЯ ТОГО, ЧТОБЫ ПРОВЕТИТЬ, КАК ПРОИЗОЙДЁТ КОММИТ НА ГИТХАБ.");
        let date = new Date();
        let day = Number(date.getDate());
        let month = Number(date.getMonth()) + 1;
        let year = Number(date.getFullYear());
        let hours = Number(date.getHours());
        let minutes = Number(date.getMinutes());

        if (day < 10) {day = "0" + day;}
        if (month < 10) {month = "0" + month;}
        if (hours < 10) {hours = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        let dataRegist = `${day}-${month}-${year}, ${hours}:${minutes}`;
        return dataRegist;
    }
