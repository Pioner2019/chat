
const fs = require('fs');
const timeReg = require("/projects/chatHomeworkDT/plugins/pluginTime.js");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 7777;
const io = socketIO(server);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/chatHomeworkDT.html');
});

app.get('/multiviews', (req, res) => {
   res.sendFile(__dirname + '/multiviews.html');
});

app.use(express.static('/'));

const figlet = require("figlet");
     figlet.text("E = mc**2 !", (err, data) => {
         if (err) console.log("err!");
         else console.log(data);
     });

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
   this.sv7 = sv7,   // таймстамп этого момента;
   this.sv8 = sv8,   // массив, где хранятся имена участников, забаненных в личке;
   this.sv9 = sv9,   // зарезервировано;
   this.sv10 = sv10   // зарезервировано.
 }
}

let massAllActiveUsers = [];
let myCreateRooms = [];  // В этом массиве хранится список комнат, созданных мной.
let myVisitorRooms = [];  // А в этом - список чужих комнат, в которых я участвую.
let nameMyCreateRoom;

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
 });

io.sockets.on('connection', function(socket) {
  let ident = socket.id;
  socket.on('promptingName', message => {
    let otvet = "";
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
       //-----------------------------------------------------------------------------
                  let objUser = {a:masPers[i].sv1, b:socket.id};     // Заносим вернувшегося в массив активных участников,
                      massAllActiveUsers.push(objUser);                     // куда помещаем обьект, содержаший имя нового
                      for (let i = 0; i < massAllActiveUsers.length; i++) {  // участника и присвоенный ему сокетом
                          for (let key in  massAllActiveUsers[i]) {          // уникальный айди. Каждый раз после возвращения
                             console.log(`${key}: ${massAllActiveUsers[i][key]}`) // участника в чат ему присваивается
                          }                                                       // новый уникальный id.
                      }
       //-----------------------------------------------------------------------------
                  socket.broadcast.emit("otvetMessage", posl);

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
            let lichkaBan = ['0']; // В этом массиве, при создании пустом, будут храниться имена участников, которых я забанил в моей личке.
            // Если нужно "отбанить", т.е. разблокировать, участника, - его имя просто удаляется из этого массива.
            newFace = new NewFace(socket.username, ident, message.b, null, message.c, objTime.a, objTime.b, lichkaBan, [], []); // Создаём конкретный экземпляр
      socket.emit("pleaseYourAccount", newFace);  //  шаблона - класса, куда передаём конкретные значения его элементов.
      let objAdmin = {};
          objAdmin.a = "админ";
          objAdmin.b = `У нас новый участник. Его имя ${newFace.sv1}`;
          objAdmin.c = "#dcdcdc";
   //   socket.broadcast.emit(`У нас новый участник. Его имя: ${socket.username}`);
      socket.broadcast.emit("otvetMessage", objAdmin);
 //     massAllActiveUsers.push(newFace.sv1); // Заносим новичка в массив активных участников.
 //     console.log(`Сейчас в массиве massAllActiveUsers находится: ${massAllActiveUsers}`);
 //-----------------------------------------------------------------------------
            let objUser = {a:newFace.sv1, b:socket.id};                                 // Заносим новичка в массив активных участников,
                massAllActiveUsers.push(objUser);                                           // куда помещаем обьект, содержащий имя нового
                for (let i = 0; i < massAllActiveUsers.length; i++) {                   // участника и присвоенный ему сокетом
                    for (let key in  massAllActiveUsers[i]) {                               // уникальный айди, который будет сохраняться
                       console.log(`${key}: ${massAllActiveUsers[i][key]}`)     // неизменным, пока он не вышел из чата.
                    }                                                                                         // Когда он вернётся в общение, ему будет
                }                                                                                              // присвоен новый уникальный айдишник.

            masPers.push(objUser);                                                              // Пополняем оперативный массив новым элементом.
 //-----------------------------------------------------------------------------
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
       });
  });

//========================================================================================

 socket.on("message", message => { // ЭТО - главный сокет, в котором происходит обработка приходящих от клиента сообщений.
   console.log(`ПОЛУЧЕНО С КЛИЕНТА: его имя = ${message.a}; тип сообщения = ${message.b}; цвет его сообщений = ${message.c}`);
   console.log(`Тип полученных данных: message.a typeof: ${typeof message.a}; message.b typeof: ${typeof message.b}`);
   console.log(`На сервер с клиента всё приходит нормально!`);

   //----------------------------------------------------------------------
             if (message.b === "proverkaNaPusto") {
                 const mongoClient2 = new MongoClient(url, {useNewUrlParser: true});
                       mongoClient2.connect((err, client) => {
                            const db = client.db("Pioner");
                            const collection = db.collection(`lichkaGlobal`);
                            let strJSON;
                            let resultProverka;
                            collection.find({$or: [{toWhom: message.a}, {fromWhom: message.a}]}).toArray((err, result) => {
                            if (err) throw err;
                            else {
                              console.log(`Личка участника ${message.a} содержит ${result.length} сообщений.`);
                             if (result.length === 0) {resultProverka = true;}  // Если личка ПУСТА, то назначаем resultProverka = 'true';
                             else {resultProverka = false;}                     // А если НЕ ПУСТА,- тогда 'false'.
                               socket.emit("resultProverkaNaPusto", resultProverka);
                               client.close();
                            }
                       });
                     });
                  }
 //----------------------------------------------------------------------
            else if (message.b === `Я пишу собеседнику`) {
           let flag = 0;
                     massAllActiveUsers.forEach(function(item, index, array) {     //
                          if (item.a !== message.c) {}                              //
                          else {
           //===========================================================================================
                          console.log(`Уникальный идентификатор участника ${message.c}: ${item.b}`);
                          for (let i = 0; i < masPers.length; i++) {                          // Проверяем, нет ли имени отправителя в чёрном списке
              let elem = masPers[i].sv8;
                   for (let j = 0; j < elem.length; j++) {   // адресата, в котором содержатся имена тех, кому он
                         if (elem[j] === message.a) {          // забанил доступ к своей личке(чёрный список находится
                              flag = 1;                                            // в учётной записи адресата, в массиве sv8).
                              break;
                       } else {}
                  }
            }
              if (flag === 0) {                                                   //   Если его имени там нет...
                          let obj = {a:message.a, b:"сейчас вам пишет..."};
                        io.to(`${item.b}`).emit("dialogRealTime", obj);           //...тогда отправляем лейбочку "такой-то вам пишет..." адресату.
                          console.log(`Отправка сообщения "ВАМ ПИШУТ СЕЙЧАС!" участнику ${message.c} УСПЕШНО произведена.`);
          } else {}
           //===========================================================================================
                          }
                    });
               }
         //----------------------------------------------------------------------
                 else if (message.b === "myLichka" || message.b === "myLichkaAll") {
                       const mongoClient1 = new MongoClient(url, {useNewUrlParser: true});
                             mongoClient1.connect((err, client) => {
                                  const db = client.db("Pioner");
                                  const collection = db.collection(`lichkaGlobal`);
                                  let strJSON;
                                  if (message.b === "myLichka") {
                                    strJSON = JSON.stringify({$or: [{$and: [{toWhom: message.a}, {fromWhom: message.c}]}, {$and: [{toWhom: message.c}, {fromWhom: message.a}]}]});
                                  }
                                  else {
                                    strJSON = JSON.stringify({$or: [{toWhom: message.a}, {fromWhom: message.a}]});
                                  }
                                  collection.find(JSON.parse(strJSON)).toArray((err, result) => {
                                  if (err) throw err;
                                  else {

                                   let objLichka = {};
                                   if (result) {}
                                     socket.emit("getYouLichka", result);
                                     client.close();
                                  }
                             });
                           });
                        }
       //----------------------------------------------------------------------

       //----------------------------------------------------------------------
                   else if (message.b === "messageLS") {
         let flag = 0;
          for (let i = 0; i < masPers.length; i++) {
               let elem = masPers[i].sv8;                                         // Проверяем, нет ли имени отправителя в чёрном списке
                               for (let j = 0; j < elem.length; j++) {   // адресата, в котором содержатся имена тех, кому он
                                       if (elem[j] === message.a) {          // забанил доступ к своей личке(чёрный список находится
                              flag = 1;                                         // в учётной записи адресата, в массиве sv8, а также,
                              break                                          // соответственно, в оперативном массиве masPers, который тоже
                       } else {}                                       // обновляется при нажатии кнопок "заблокировать" и "разблокировать").
              }
            }
                if (flag === 1) {
                       let obj = {a:message.d, b:"вас забанил!"};
                   massAllActiveUsers.forEach(function(item, index, array) {
                                                   if (item.a !== message.a) {}
                                                   else {
                                                         io.to(`${item.b}`).emit("dialogRealTime", obj);
                                                   }
                                         });
                }

              else if (flag === 0) {                                                   //   Если его имени там нет...
                     const mongoClient2 = new MongoClient(url, {useNewUrlParser: true});
                           mongoClient2.connect((err, client) => {
                                const db = client.db("Pioner");
                                const collection = db.collection(`lichkaGlobal`);
                                let time = timeReg();
                                let posl = {toWhom:message.d, fromWhom:message.a, text:message.e, time:time.a, timeStamp:time.b, color:message.c};
                                collection.insertOne(posl, function(err, result) {
                                if (err) throw err;
                                else {
                                  massAllActiveUsers.forEach(function(item, index, array) {
                                       if (item.a !== message.d) {}
                                       else {
                                       console.log(`Уникальный идентификатор участника ${message.d}: ${item.b}`);
                                     io.to(`${item.b}`).emit("dialogRealTimeMessage", message);
                                       console.log(`Отправка сообщения участнику ${message.d} УСПЕШНО произведена.`);
                                       }
                                 });
                                   client.close();
                                }
                           });
                         });
             } else {}
                       }
     //----------------------------------------------------------------------

       //----------------------------------------------------------------------
       else if (message.b != "messageLS" && message.b != "myLichka" && message.b != "myLichkaAll" && message.b != "proverkaNaPusto" && message.b != `Я пишу собеседнику`) {
             socket.broadcast.emit("otvetMessage", message);
                    if (message.b === `Я ВРЕМЕННО ВЫХОЖУ ИЗ ОБЩЕНИЯ. ВСЕМ ПОКА !`) {  // Если участник временно выходит
                 //          let ind = massAllActiveUsers.indexOf(message.a);

                        massAllActiveUsers.forEach(function(item, index, array) {     // из общения и закрывает свою
                             if (item.a !== message.a) {}                              // страницу, сервер удаляет его имя
                             else {                                                  // из массива активных участников.
                                  array.splice(index, 1);
                              }
                         });
           //------------------------------------------------------------------
                         console.log(`Один участник нас временно покинул. Сейчас в массиве massAllActiveUsers находятся:`);
                         for (let i = 0; i < massAllActiveUsers.length; i++) {
                             for (let key in  massAllActiveUsers[i]) {
                                console.log(`${key}: ${massAllActiveUsers[i][key]}`);
                             }
                         }
          //-------------------------------------------------------------------
                     }
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
       } else {}
//----------------------------------------------------------------------
});

   socket.on("updateAccount", message => {                           // Когда мы забанили какого-то участника, запретив
                                                                                                // ему доступ в свою личку, мы для этого должны
                   masPers.forEach(function(item, index, array) {      // обновить оперативный массив  masPers,
                                       if (item.sv1 === message.sv1) {        // заменяя в нём прежний "чёрный список" на
                                           array.splice(index, 1, message);       // изменённый,...
                                       }
                                 });

                   const mongoClient3 = new MongoClient(url, {useNewUrlParser: true});  // ...а также произвести
                         mongoClient3.connect((err, client) => {                                            // аналогичную операцию в БД.
                              const db = client.db("Pioner");
                              const collection = db.collection("CHAT1");
                              collection.updateOne({sv1: message.sv1}, {$set: {sv8: message.sv8}}, (err, result) => {
                              if (err) throw err;
                              else {
                                 client.close();
                              }
                         });
                       });

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


//   socket.on("messageToRoom", message => {

      socket.on("needAllRoomsList", message => {
        console.log(`С клиента пришёл запрос массива комнат с моим участием: ${message}`);
      //---------------------------------------------------------------------------------------------------
      // Это будет очень сложный цикл со многими вложениями, включая обращения к МОНГЕ.

          let massiv = [];
          if (message.b === "allRoomsList") {
              for (let i = 0; i < masPers.length; i++) { // Перебираем оперативный массив masPers. В нём нас интересуют
                  if (masPers[i].sv1 !== message.a) {     // все элементы, кроме меня самого.
                     if (masPers[i].sv9) {
                       for (let j = 0; j < masPers[i].sv9.length; j++) { // В каждом элементе берём массив sv9, где
                      let mongoClient = new MongoClient(url, {useNewUrlParser: true}); // собраны все комнаты, созданные
                          mongoClient.connect((err, client) => {                       // данным участником, и по имени
                                const db = client.db("allRooms");                   // каждой комнаты в Монге получаем
                                const collection = db.collection(masPers[i].sv9[j]); // всю коллекцию сообщений в этой
                                collection.find().toArray((err, result) => {         // комнате.
                                   if (err) throw err;
                                   else {
                                       console.log(`result.length = ${result.length}`); // Затем проверяем, есть ли среди
                                       for (let i = 1; i < result.length; i++) {        // них сообщения от меня. Если есть -
                                            if (result[i].a === message.a) {         // значит я участвую в этой комнате.
                                                 massiv.push(result[0].roomName);           // Её имя поступает в массив,
                                                 console.log(`massiv = ${massiv}`); // специально созданный для этого,
                                                 socket.emit("receiveAllRoomsList", massiv); // и отправляется на клиент.
                                                 break;                                     // Всё, запрос на получение всех
                                            }                                          // комнат, в которых я участвую, обработан !
                                       }                                // P.S. Недостаток: пока не придумал, как в данном конкретном
                                       client.close();                 // случае решить проблему асинхронности, т.е. как передать
                                   }                               // весь массив целиком(видимо, можно сделать через промисы, но я
                                });                             //  ещё не очень ими владею). Пришлось передавать их изнутри цикла,
                           });                                 // а затем на клиенте удалять все повторы. Грязновато, неэстетично,
                                                              // но - пока так.
                       }
                     }
                  }
              }
          }

      //----------------------------------------------------------------------------------------------------
      });

   socket.on("messageToRoom", message => {

     console.log(`С клиента пришло сообщение типа "messageToRoom", содержащее обьект:
     obj.a: ${message.a}, obj.b: ${message.b}`);
     let flagBL = true;

     const mongoClient4 = new MongoClient(url, {useNewUrlParser: true});
        mongoClient4.connect((err, client) => {
                const db = client.db("allRooms");
                const collection = db.collection(`${message.b}`);
            //          collection.findOne({$and: [{a: message.a}, {b: message.b}]}, (err, result) => {
                      collection.findOne({roomName: message.b}, (err, result) => {
                          if (err) throw err;
                          else {

                  if (!result) {
                               //------------------------------------------------------------------------------------

                               let flag = 0;
                        //         nameMyCreateRoom = message.b;
                        //         myCreateRooms.push(message.b);                                  // Дополняем массив, содержащий созданные мной комнаты,
                      //           console.log(`массив myCreateRooms содержит: ${myCreateRooms}`); // названием новой только что созданной комнаты,
                                 for (let i = 0; i < masPers.length; i++) {                      // Hемедленно обновляем оперативный массив
                                      for (let key in masPers[i]) {                              // masPers новыми данными, и...
                                            if (masPers[i].sv1 === message.a) {
                                                console.log(`массив созданных мной комнат до обновления содержит: ${masPers[i].sv9}`);
                                                for (let j = 0; j < masPers[i].sv9.length; j++) {
                                                    if (masPers[i].sv9[j] === message.b) {
                                                        flag = 1;
                                                        break;
                                                    }
                                                }
                                                if (flag === 0) {
                                                  masPers[i].sv9.push(message.b);
                                                  console.log(`массив созданных мной комнат после обновления содержит: ${masPers[i].sv9}`);
                                                  socket.emit("updateObjMessage", masPers[i].sv9); //...сообщаем их на клиент, чтобы там обновился
                                  //              } else {}                                                    // оперативный обьект objMessage.
                                 //      }
                                 // }

                                  //??????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                  //=================================================================================
                                  const mongoClient6 = new MongoClient(url, {useNewUrlParser: true});
                                        mongoClient6.connect(function(err, client) {
                                        const db = client.db("Pioner");
                                        const collection = db.collection("CHAT1");
                                        let time = timeReg();
                                              collection.updateOne({sv1: message.a}, {$push: {sv9: message.b}}, (err, result) => {
                                                    if (err) throw err;
                                                    else {
                                                       client.close();
                                                    };
                                               });
                                        });
                                    } else {}
                                  //=================================================================================
                                  //??????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                  break;
                            }
                      }
                 }
                                 socket.emit("youCreator", "youCreator");
                              //         let moders = new Set;
                              //             moders = [];   // Используем конструктор Set для того, чтобы исключить существование повторов в массиве  moderators.
                                       let obj = {creatorName:message.a, roomName:message.b, blackList:[], moderators:[]}; // Создаём нулевую запись, состоящую
                                       collection.insertOne(obj, function(err, result) {                   // из имени создателя комнаты, имени
                                           if (err) throw err;                                  // самой комнаты, "чёрного списка" комнаты(изначально
                                            else {                                            // пустого), который будет вести админ комнаты(её создатель)
                                                  console.log('Данная комната пока пуста. Материализуем её, введя нулевую запись.'); // или назначенные им модераторы,
                                                  //------------------------------------------------------------------------------------ // и списка собственно модераторов.
                                                  // ЕЩЁ ОДНА ВЛОЖЕННОСТЬ МАНИПУЛЯЦИЙ С БД ВО ВРЕМЯ ОДНОЙ СЕССИИ РАБОТЫ МОНГО - клиента.
                                                        collection.find().toArray((err, result) => {
                                                              if (err) throw err;
                                                              else {
                                                                console.log('Это сообщение из ветки когда коллекция(комната) БЫЛА ПУСТОЙ.');
                                                    //              socket.emit("roomToYou", result);
                                                                  let objAdmin = {};
                                                                      objAdmin.a = "админ";
                                                                      objAdmin.b = `${message.a} создал комнату ${message.b}. Желающие, welcome!`;
                                                                      objAdmin.c = "#dcdcdc";
                                                                  socket.broadcast.emit("otvetMessage", objAdmin);
                                                                  client.close();
                                                              }
                                                        });
                                                //------------------------------------------------------------------------------------
                                             }
                                        });
                                        socket.join(message.b);
                                      }
                   //             //------------------------------------------------------------------------------------
                   //           }
                             else {
                               for (let i = 0; i < result.blackList.length; i++) {
                                    if (result.blackList[i] === message.a) {       // Если данный участник есть
                                        socket.emit("youBlock", "youBlock");      // в "чёрном списке" этой комнаты,
                                        socket.leave(message.b);                 // то он отрезается от неё.
                                        flagBL = false;
                                        break;
                                    }
                                }
                                  if (flagBL) {
                                    if (result.creatorName === message.a && result.roomName === message.b) {
                                         socket.emit("youCreator", "youCreator");
                                          socket.join(message.b);
                                    }
                                    
                                    for (let i = 0; i < result.moderators.length; i++) {
                                        if (result.moderators[i] === message.a) {
                                              socket.emit("youModerator", "youModerator");
                                              socket.join(message.b);
                                              break;
                                      }
                                    }

                                     collection.find().toArray((err, result) => {
                                           if (err) throw err;
                                           else {
                                               socket.emit("roomToYou", result);
                                               console.log('Это сообщение из ветки когда коллекция(комната) НЕ БЫЛА ПУСТОЙ.');
                                               client.close();
                                           }
                                     });
                                     socket.join(message.b);
                                }
                             }
                           }
                        });
                     });
                  });

       socket.on("messageForRoom", message => {

         const mongoClient5 = new MongoClient(url, {useNewUrlParser: true});
               mongoClient5.connect(function(err, client) {
               const db = client.db("allRooms");
               const collection = db.collection(`${message.a}`);
               collection.findOne({roomName: message.a}, (err, result) => {
                   if (err) throw err;
                   else {
                               let time = timeReg();
                               let posl = {a:message.b.a, b:message.b.b, c:message.b.c, d:time.a, e:time.b};
                               collection.insertOne(posl, function(err, result) {
                                    if (err) throw err;
                                    else {
                                        socket.join(message.a);
                                        socket.to(message.a).emit("broadcastToRoom", message.b);
                                        client.close();
                                     };
                               });
                      }
                 });
            });
       });

       socket.on("toBlackList", message => {
         const mongoClient7 = new MongoClient(url, {useNewUrlParser: true});
               mongoClient7.connect(function(err, client) {
               const db = client.db("allRooms");
               const collection = db.collection(`${message.b}`);
                     collection.updateOne({roomName: message.b}, {$push: {blackList: message.c}}, (err, result) => {
                           if (err) throw err;      // Здесь мы вносим данного юзера с "чёрный список" этой комнаты,
                           else {                   // т.е. блокируем ему доступ в комнату(баним его).
                             massAllActiveUsers.forEach(function(item, index, array) {
                                  if (item.a !== message.c) {}
                                  else {
                                  console.log(`Уникальный идентификатор участника ${message.c}: ${item.b}`);
                                io.to(`${item.b}`).emit("youBlock", "youBlock");
                                  console.log(`Отправка сообщения о его блокировке участнику ${message.c} УСПЕШНО произведена.`);
                                  }
                            });
                              client.close();
                           };                      // Пока что изменение списка - это и всё. Собственно сама
                      });                          // блокировка пока не сделана.
               });
       });

       socket.on("fromBlackList", message => {
         const mongoClient8 = new MongoClient(url, {useNewUrlParser: true});
               mongoClient8.connect(function(err, client) {
               const db = client.db("allRooms");
               const collection = db.collection(`${message.b}`);
                     collection.updateOne({roomName: message.b}, {$pull: {blackList: message.c}}, (err, result) => {
                           if (err) throw err;          // Здесь мы исключаем данного юзера из "чёрного списка"
                           else {                        // этой комнаты, т.е. разблокируем ему доступ в комнату.
                                  massAllActiveUsers.forEach(function(item, index, array) {
                                       if (item.a !== message.c) {}
                                       else {
                                       console.log(`Уникальный идентификатор участника ${message.c}: ${item.b}`);
                                     io.to(`${item.b}`).emit("youBlock", "youUnblock");
                                       console.log(`Отправка сообщения участнику ${message.c} о его разблокировке УСПЕШНО произведена.`);
                                       }
                                 });
                              client.close();
                           };
                      });
               });
    //          socket.emit("youBlock", "youUnblock");
       });

       socket.on("youModerator", message => {
            let flag = true;
            console.log(`Админ комнаты ${message.b} хочет ПРЕДОСТАВИТЬ права модератора участнику ${message.a}.`);
              let mongoClient = new MongoClient(url, {useNewUrlParser: true});
                  mongoClient.connect(function(err, client) {
                  const db = client.db("allRooms");
                  const collection = db.collection(`${message.b}`);
                        collection.findOne({roomName: message.b}, (err, result) => { // Получаем 0-ю запись данной коллекции(комнаты).
                           if (err) throw err;

                           else {
                             console.log(`result.moderators.length = ${result.moderators.length}`);
                             for (let i = 0; i < result.moderators.length; i++) {
                                  if (result.moderators[i] === message.a) {
                                        console.log(`result.moderators[i] = ${result.moderators[i]}`);
                                        flag = false;
                                        break;
                                  }
                             }

                        collection.bulkWrite([                      // Это очень классная штука в Монге: возможность обьединить
                            {                                      // несколько запросов к БД в один: в данном конкретном случае мы...
                              updateOne: {
                                  filter: {roomName: message.b},           //...сперва удаляем из массива "moderators" все вхождения
                                  update: {$pull: {moderators: message.a}}   // имени юзера в массив,...
                              }
                            },
                            {
                              updateOne: {
                                  filter: {roomName: message.b},
                                  update: {$push: {moderators: message.a}} //...а затем помещаем туда его имя заново. Этим мы устраняем
                              }                                            // возможность множественного вхождения имени юзера в массив.
                            }

                        ], (err, result) => {
                              if (err) throw err;
                              else {
                                     massAllActiveUsers.forEach(function(item, index, array) {
                                          if (item.a !== message.a) {}
                                          else {
                                          console.log(`Уникальный идентификатор участника ${message.a}: ${item.b}`);
                                          let obj = {a:"youModer", b:flag};
                                          io.to(`${item.b}`).emit("youModer", obj);
                                          console.log(`Отправка сообщения участнику ${message.a} о назначении его модератором УСПЕШНО произведена.`);
                                          }
                                    });
                  //                client.close();
                              };
                         });
                           client.close();
                       }
                     });
                  });
       });

       socket.on("youNoModerator", message => {
            console.log(`Админ комнаты ${message.b} хочет ИЗЬЯТЬ права модератора у участника ${message.a}.`);
            let mongoClient = new MongoClient(url, {useNewUrlParser: true});
                mongoClient.connect(function(err, client) {
                const db = client.db("allRooms");
                const collection = db.collection(`${message.b}`);
                      let time = timeReg();
                      collection.findOne({roomName: message.b}, (err, result) => { // Получаем 0-ю запись данной коллекции(комнаты).

                            if (err) throw err;
                            else {

                              let allModerators = result.moderators; // Из 0-й записи получаем массив имён всех модераторов...
                                 console.log(`Массив allModerators содержит: ${allModerators}`);
                                 console.log(`allModerators.length = ${allModerators.length}`);

                                  for (let i = 0; i < allModerators.length; i++) {
                                   if (allModerators[i] === message.a) {
                                         allModerators.splice(i, 1);        //...и удаляем из него имя данного юзера.
                                    }
                                  }

                                   massAllActiveUsers.forEach(function(item, index, array) {
                                        if (item.a !== message.a) {}
                                        else {
                                        console.log(`Уникальный идентификатор участника ${message.a}: ${item.b}`);
                                        let obj = {a: "youUnmoder", b:flag};
                                        io.to(`${item.b}`).emit("youModer", obj);
                                        console.log(`Отправка сообщения участнику ${message.a} об изьятии у него прав модератора УСПЕШНО произведена.`);
                                        }
                                  });

                                  collection.updateOne({roomName: message.b}, {$set: {moderators: allModerators}}, (err, result) => {
                                       if (err) throw err;
                                       else {
                                             client.close();
                                       }
                                  });
          //                      client.close();
                            };
                       });
                });
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
