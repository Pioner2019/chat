
     var http = require('http');
     var fs = require('fs');
     const timeReg = require("/projects/chatHomeworkDT/plugins/pluginTime.js");
     const figlet = require("figlet");
          figlet.text("E = mc**2 !", (err, data) => {
              if (err) console.log("err!");
              else console.log(data);
          });
  //   const Tooltip = require('tooltip');
  //   console.log(timeReg());

//     const time = require("plugins/pluginTime");
//     var Binary = require('mongodb').Binary;
  //        var tip = new Tooltip('Foo bar!');
//          tip.position(200, 200).show();

     const MongoClient = require("mongodb").MongoClient;
     const url = "mongodb://localhost:27017/";

     var Jmas_poset = [];
     var mas_poset = new Map();
     var  jasmas = [];
     var flag = true;
     var ident;
     var adres;
     var buffer = '';
     var buffer1 = '';
     var keyName;
     var db;
     var foto;

     var masPers = [];

   class NewFace {  // Этот класс является шаблоном - прототипом для создания учётных
      constructor(sv1, sv2, sv3, sv4, sv5, sv6, sv7, sv8, sv9, sv10) { //  записей участников чата, где:
        this.sv1 = sv1,  // имя участника;
        this.sv2 = sv2,  // его идентификатор, присвоенный сокетом при соединении;
        this.sv3 = sv3,  // цвет его сообщений, присвоенный сервером;
        this.sv4 = sv4,  // его аватарка(если есть);
        this.sv5 = sv5,  // его личный пароль входа;
        this.sv6 = sv6,   // дата и время регистрации в БД;
        this.sv7 = sv7    // массив значений времени в числовой форме;
        this.sv5 = sv8,   // зарезервировано;
        this.sv6 = sv9,   // зарезервировано;
        this.sv7 = sv10   // зарезервировано.
      }
   }

// Cоздаем объект MongoClient и передаем ему строку подключения:

const mongoClient = new MongoClient(url, { useNewUrlParser: true });
mongoClient.connect(function(err, client){
    const db = client.db("Pioner");
    const collection = db.collection("CHAT1");
       collection.find().toArray((err, result) => {
        if (err) throw err;
        else {
            masPers = result;
            console.log(masPers);
              client.close();
        }
    });
//  }
//      client.close();
});

//№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№

const server = http.createServer(function(req, res) {

            if (req.url.endsWith('.css')) {

        fs.readFile(req.url, (err, data) => {
            if (err) throw err;
            else {
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            }
        });
    }

   else  if (req.url.endsWith('.png')) {

        fs.readFile(req.url, (err, data) => {
            if (err) throw err;
            else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.end(data);
            }
        });
    }

   else  if (req.url.endsWith('.jpg')) {

        fs.readFile(req.url, (err, data) => {
            if (err) throw err;
            else {
                res.writeHead(200, {"Content-Type": "image/jpg"});
                res.end(data);
            }
        });
    }

   else  if (req.url.endsWith('.js')) {

        fs.readFile(req.url, (err, data) => {
            if (err) throw err;
            else {
                res.writeHead(200, {"Content-Type": "text/javascript"});
                res.end(data);
            }
        });
    }

     else fs.readFile('/projects/chatHomeworkDT/chatHomeworkDT.html', 'utf-8', (err, data) => {
    if (err) throw err; else {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(data);
            }

      });

  });

//№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№

var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
//       let username;
       let ident = socket.id;
       socket.on('promptingName', message => {
         let otvet = "";
    //     username = message;
      //     socket.broadcast.emit("broadcast_foto", message);
         console.log(`Из браузера от посетителя получено некое имя: ${message}`);
         for (let i = 0; i < masPers.length; i++) {
            if (masPers[i].sv1 === message) {
                otvet = "Это имя уже есть в нашей базе.";
                console.log(otvet);
                socket.on("clientCode", message => {
                     console.log("clientCode = " + message);
                     if (message === masPers[i].sv5) {
                       let obj = {a:"plus", b:masPers[i]};
                       socket.emit("dostup", obj);
                       let posl = {a:`админ`, b:`В ОБЩЕНИЕ ВЕРНУЛСЯ ${masPers[i].sv1}`, c:`#a9a9a9`};
                       socket.broadcast.emit("otvetMessage", posl);
          //----------------------------------------------------------------------
                             const mongoClient = new MongoClient(url, {useNewUrlParser: true});
                                   mongoClient.connect(function(err, client){
                                   const db = client.db("Pioner");
                                   const collection = db.collection("CHAT1history");
                                         let objTime = timeReg();
                                         posl.d = objTime.a; posl.e = objTime.b;
                                         collection.insertOne(posl, function(err, result) {
                                               if (err) throw err;
                                               else {
                                                  client.close();
                                               };
                                          });
                                   });
          //----------------------------------------------------------------------
                     }
                     else {socket.emit("dostup", "minus");}
                });
            }
         }
         if (otvet === "") {
              otvet = "Этого имени в нашей базе нет.";
              socket.username = message;
              console.log(`socket.username = ${socket.username}`);
              console.log(otvet);
         }

          socket.emit("otvet", otvet);
       });

       socket.on("newFace", message => {  // Именно здесь, в этой функции, мы будем формировать
          let newFace;             // учётную запись нового участника чата, и, конечно,
           console.log(`В чате намечается новый участник!`); // обновлять БД.
           console.log(`Он согласился с нашим внутренним распорядком, сказав "${message}",`);
           console.log(`и предлагает называть его так: ${socket.username}`); //
           socket.emit("colorPlease", "colorPlease");
           socket.on("object", message => {
                 let objTime = timeReg();
                 newFace = new NewFace(socket.username, ident, message.b, null, message.c, objTime.a, objTime.b, null, null, null); // Создаём конкретный экземпляр
           socket.emit("pleaseYourAccount", newFace);  //  шаблона - класса, куда передаём конкретные значения его элементов.
           socket.broadcast.emit(`У нас новый участник. Его имя: ${socket.username}`);
              for (let key in newFace) {
                  console.log(`${key}: ${newFace[key]}`);
              }

              const mongoClient = new MongoClient(url, {useNewUrlParser: true});
                 mongoClient.connect(function(err, client){
                      const db = client.db("Pioner");
                      const collection = db.collection("CHAT1");
                                  collection.insertOne(newFace, function(err, result) {
                                      if (err) throw err;
                                      else {
                                        //------------------------------------------------------------------------------------
                                        // ЕЩЁ ОДНА ВЛОЖЕННОСТЬ МАНИПУЛЯЦИЙ С БД ВО ВРЕМЯ ОДНОЙ СЕССИИ РАБОТЫ МОНГО - клиента.
                                                collection.find().toArray((err, result) => {
                                                     if (err) throw err;
                                                     else {
                                                         masPers = result;
                                                         socket.emit("masPersNew", masPers);
                                                    //     console.log(masPers);
                                                console.log("Ну что, похоже, работа чата подналадилась !");
                                                     }
                                                });
                                        //------------------------------------------------------------------------------------
                                        client.close()
                                      };
                                  });
                              });
                 // masPers.push(newFace);     // И сразу же обновляем оперативный массив masPers.
                 //  console.log(`masPers.length = ${masPers.length}`);
                 //  console.log(`Массив masPers после обновления содержит:`);
                 //   for (let i = 0; i < masPers.length; i++) {
                 //     for (let key in masPers[i]) {
                 //        console.log(`${key}: ${masPers[i][key]}`);
                 //     }
                 //   }
            });
       });

//========================================================================================

      socket.on("message", message => { // ЭТО - главный сокет, в котором происходит
        console.log(`ПОЛУЧЕНО С КЛИЕНТА: obj.a = ${message.a}; obj.b = ${message.b}; obj.c = ${message.c}`);
        console.log(`На сервер с клиента всё приходит нормально!`);
                                                        // обработка приходящих от клиента сообщений.
            //----------------------------------------------------------------------
                               const mongoClient = new MongoClient(url, {useNewUrlParser: true});
                                     mongoClient.connect(function(err, client){
                                     const db = client.db("Pioner");
                                     const collection = db.collection("CHAT1history");
                                     let time = timeReg();
                                     let posl = {a:message.a, b:message.b, c:message.c, d:time.a, e:time.b};
                                           collection.insertOne(posl, function(err, result) {
                                                 if (err) throw err;
                                                 else {
                                                    client.close();
                                                 };
                                            });
                                     });
            //----------------------------------------------------------------------

        socket.broadcast.emit("otvetMessage", message);
    });

        socket.on(`history, please!`, message => {

            let key = message.a;
            let date = new Date();
            let time1 = date.getTime();
            const mongoClient = new MongoClient(url, {useNewUrlParser: true});
             switch (key) {
               case 1:
                    console.log(`Запрашиваем в Монге получение истории чата за час.`);
                    let time2 = time1 - 3600000; // Получаем таймстамп момента, который был час назад.
                    getHistory(mongoClient, time2);
               break;

               case 2:
                    console.log(`Запрашиваем в Монге получение истории чата за сутки.`);
                    let time3 = time1 - 86400000; // Получаем таймстамп момента, который был сутки назад.
                      getHistory(mongoClient, time3);
               break;

               case 3:
                    console.log(`Запрашиваем в Монге получение истории чата за неделю.`);
                    let time4 = time1 - 604800000; // Получаем таймстамп момента, который был неделю назад.
                      getHistory(mongoClient, time4);
               break;

               case 4:
                    console.log(`Запрашиваем в Монге получение истории чата за диапазон.`);
                    let date1 = new Date(message.b[2], message.b[1], message.b[0], 0, 0, 0);
                    let date2 = new Date(message.c[2], message.c[1], message.c[0], 0, 0, 0);
//---------------------------------------------------------------------------------
                        let massHistory = [];
                        mongoClient.connect(function(err, client){
                        const db = client.db("Pioner");
                        const collection = db.collection("CHAT1history");
//  ТАЙМСТАМП КОНКРЕТНОГО СООБЩЕНИЯ ХРАНИТСЯ В ЕГО ОБЬЕКТЕ ПОДКЛЮЧОМ "е".
                        collection.find().toArray((err, result) => {
                            if (err) throw err;
                            else {
                               massHistory = result;
                                for (let i = 0; i < massHistory.length; i++) {
                                  if (massHistory.e >= date1 && massHistory.e <= date2) {
                                     for (let key in massHistory[i]) {
                                         delete massHistory[i]._id;
                                         delete massHistory[i].c;
                                         delete massHistory[i].e;
                                     }
                                  }
                                }
            //                 console.log(`massiv.length = ${massHistory.length}`);
                             console.log(`massiv = ${massHistory}`);
                        socket.emit("massHistory", massHistory);
                        client.close();
                         }
                      });
                  });
//---------------------------------------------------------------------------------
               break;

             }
        });

        socket.on("message_foto", message => {
          socket.broadcast.emit("broadcast_foto", message);
        });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ЭТО - КРОШЕЧНЫЙ БЛОЧОК, ГДЕ Я ПРОБУЮ ПЕРЕСЛАТЬ ФОТО ИЗ ДОКУМЕНТА,
//  ХРАНЯЩЕГОСЯ В БАЗЕ ДАННЫХ MongoDB.
//    socket.on("fotku_please", message => {
//        if (message === "expect_to_foto") {
//      const mongoClient = new MongoClient(url, { useNewUrlParser: true });
//      mongoClient.connect(function(err, client){
//      const db = client.db("Pioner");
//      const collection = db.collection("CHAT1");
//
//  //     let sohran = {};
// //         sohran.id = 1962;
// //      sohran.bin = fs.readFileSync("kartinki/logotip.jpg");
// //       collection.insertOne(sohran, (err,data) => {
// //           if (err) console.error(err);
// //       })
//
//       collection.findOne({id: 1962}, function(err, doc){
//      if (err) {
//        console.error(err);
//        }
//        socket.emit("fotka_proba", doc.bin.buffer);
//        });
//        client.close();
//      });
//    }
//  });
// Оно пересылается в бинарном виде нормально,на сторону клиента
// долетает, но там не хочет нормально открываться. Ничего не могу
// понять!
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function getHistory(param1, param2) {
              let massHistory = [];
              param1.connect(function(err, client){
              const db = client.db("Pioner");
              const collection = db.collection("CHAT1history");
      //  ТАЙМСТАМП КОНКРЕТНОГО СООБЩЕНИЯ ХРАНИТСЯ В ЕГО ОБЬЕКТЕ ПОДКЛЮЧОМ "е".
                   collection.find({e: {$gte: param2}}).toArray((err, result) => {
                         if (err) throw err;
                         else {
                             massHistory = result;
                             for (let i = 0; i < massHistory.length; i++) {
                                      for (let key in massHistory[i]) {
                                         delete massHistory[i]._id;
                                         delete massHistory[i].c;
                                         delete massHistory[i].e;
                                      }
                              }
                             console.log(`massiv.length = ${massHistory.length}`);
                             console.log(`massiv = ${massHistory}`);
                             socket.emit("massHistory", massHistory);
              //               return massHistory;
                             client.close();
                         }
                    });
               });
        //    return massHistory;
        }

 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          socket.on('disconnect', function(data) {
         });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

       function escapeSpecialChars(jsonString) {
           return jsonString.replace(/\n/g, "\\n")
                      .replace(/\r/g, "\\r")
                      .replace(/\t/g, "\\t")
                      .replace(/\f/g, "\\f");
       }

}); // Это закрывающая скобка сокет - коннекта, стр.167
//      socket.emit('message', { content: 'You are connected!', importance: '1' });

server.listen(7777, function () {
       console.log ('Работаем на порт: 7777');
    });
