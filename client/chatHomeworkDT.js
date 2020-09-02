
          document.addEventListener('DOMContentLoaded', () => {

         var chat_exit = true;
         let name ;
         let  priznak_close ;
         let colorMessage; // Здесь содержится цвет сообщений участника, передаваемый с сервера в обьекте участника.
         let objMessage;  // А здесь - целиком обьект участника, передаваемый с сервера.
         let file = 0;
         let vibor = "";

         let body = document.getElementById("body");

         let gardina = document.querySelector("#gardina");
             gardina.style.width = window.innerWidth + 'px';
             gardina.style.height = window.innerHeight + 'px';

        let banner = document.querySelector("#banner");
        let textarea = document.querySelector("#textarea");
  //          console.log(`textarea.id = ${textarea.id}`);

        let pole = document.querySelector("#pole");

        let yes = document.querySelector("#yes");
            yes.addEventListener("click", funcYes);
        let no = document.querySelector("#no");
            no.addEventListener("click", funcNo);
              function funcYes() {
                 vibor = "yes";
                 return vibor;
              }
              function funcNo() {
                 vibor = "no";
                 return vibor;
              }

         const socket = io.connect('ws://localhost:7777');

         let stop = document.querySelector("#stop");
             stop.addEventListener("click", function() {
      //         console.log(`Эта функция будет закрывать для участника текущую сессию работы в чате,`);
      //         console.log(`передавая на сервер сообщение:`);
    //           console.log(`Я ВРЕМЕННО ВЫХОЖУ ИЗ ОБЩЕНИЯ. ВСЕМ ПОКА !`);
    //           console.log(`Все остальные действия по корректному завершению сеанса ВЫПОЛНИТ СЕРВЕР.`);
               let mess = {a:objMessage.sv1, b:`Я ВРЕМЕННО ВЫХОЖУ ИЗ ОБЩЕНИЯ. ВСЕМ ПОКА !`, c:objMessage.sv3};
               socket.emit("message", mess);
               socket.close();
               location.reload();
          //     location.href = location.href; // Этот вариант тоже работает.
             });

         let but = document.getElementById('but');
             but.onclick = function() {
                name = prompt("Как-нибудь назовите себя: ", "");  // Посетителя просят ввести произвольное имя.
                socket.emit('promptingName', name);           // Оно отправляется на сервер для идентификации.
                socket.on("otvet", message => {
                  if (message === "Это имя уже есть в нашей базе.") {
                    let clientCode = prompt(`Это имя уже есть в нашей базе.
                  Если Вы - новичок в чате, нажмите "Отмена".
                  Если Вы - УЖЕ УЧАСТНИК ЧАТА, то введите ПАРОЛЬ: ${""}`);
                     console.log(`clientCode = ${clientCode}`);
                     console.log(`Тип данных: ${typeof clientCode}`);
                      if (!clientCode) { // Если посетитель нажал "Отмена", значит он новичок в чате.
                        let nameNew = prompt(`Попробуйте другое имя: , ${""}`); // Предлагаем ему ввести
                          if (nameNew === name) {} // другое имя. Если он снова ввёл то же самое - идём в начало.
                          else {
                            socket.emit('promptingName', nameNew);
                            socket.username = nameNew;
                          }
                      }
                      else {
                        socket.emit("clientCode", clientCode);
                        socket.on("dostup", message => {
                          objMessage = message.b;
                          if (message.a === "plus") {
                     colorMessage = message.b.sv3;
                     textarea.focus();
                     banner.className = "";
                     gardina.remove();  // Предоставляем старому участнику
                     but.remove();       // доступ к чату, и для этого...
                     let send = document.createElement("button"); //...создаём на странице кнопку, которая
                         send.id = 'send';                        // будет отправлять его сообщения.
                         send.innerHTML = 'Отправить';
                     body.appendChild(send);
                       funcMain();
                   }
                   else if (message === "minus") {
                       let kod = prompt(`Неверный пароль! Ещё разок: ${""}`); // Это будет продолжаться до тех пор,
                       socket.emit("clientCode", kod);                       // пока не будет введён правильный пароль.
                   } else {}
                   });
                   }
                  }

                  else {  // Это ОТКРЫВАЮЩАЯ скобка очень важного блока с промисом.
                     funcShowBanner(); // Вызываем в качестве колбэка функцию, которая покажет нам баннер.
                   }   // Это ЗАКРЫВАЮЩАЯ скобка очень важного блока с промисом.
                });
  //              return username;
             }

              function funcShowBanner() {
                    banner.className = "trans";
               let stop = setInterval(function() {
                    if (vibor != "") {
                       console.log(`vibor = ${vibor}`);
                       clearInterval(stop);
                       if (vibor === "no") {
                          banner.remove();
                          but.remove();
                          gardina.style.backgroundColor = "rgba(0, 0, 0, 1)";
                          gardina.innerHTML = "Вход в чат ЗАБЛОКИРОВАН.";
                       }
                       else if (vibor === "yes") {
                           let account;
                            let parole = prompt(`Введите любой пароль: ${""}`);
                            socket.emit("newFace", vibor);
                            socket.on("colorPlease", message => { // Этот крошечный сокет служит лишь
                              if (message === "colorPlease") {   // для того, чтобы передать на сервер
                                let color = PP.pluginColorSelect(); // сгенерированное здесь,на клиенте,
                                let obj = {b:color, c:parole};      // значение цвета сообщений участника.
                                console.log(`Когда сервер присылает запрос на цвет, здешний колорпикер генерирует вот это: ${color} ...`);
                                console.log(`Скрипт обьединяет это в один обьект со значением пароля: ${parole} ...`);
                                socket.emit("object", obj);
                                console.log(`...и отправляет этот обьект серверу.`);
                              }
                            });     // сокет "colorPlease" закрыт.

                            socket.on("pleaseYourAccount", message => {
                               objMessage = message;
                               colorMessage = objMessage.sv3;
                               console.log(`Новому участнику выбран цвет сообщений: ${objMessage.sv3}`);
                               textarea.focus();
                               console.log(`colorMessage = ${colorMessage}`);
                            console.log(`Новый участник получает с сервера свою учётную запись: ${message}`);
                              for (let key in message) {
                                 console.log(`${key}: ${message[key]}`);
                              }
                                banner.className = "";
                                but.remove();
                                gardina.remove();
                                let send = document.createElement("button"); //...создаём на странице кнопку, которая
                                    send.id = 'send';                        // будет отправлять его сообщения.
                                    send.innerHTML = 'Отправить';
                    //                send.addEventListener("onclick", funcMakeMessage);
                                body.appendChild(send);
                                socket.on("masPersNew", message => {

                                });
                                funcMain();
                          });
                       }
                    }
               }, 100);
             }

            function funcMain()  {

// ЗДЕСЬ, В ГЛАВНОЙ ФУНКЦИИ funcMain, БУДЕТ ПРОИСХОДИТЬ ОСНОВНАЯ РАБОТА ЧАТА: СОЗДАНИЕ И ОТСЫЛКА НА СЕРВЕР
// СООБЩЕНИЙ УЧАСТНИКА(ВКЛЮЧАЯ КАРТИНКИ), А ТАКЖЕ ПРИЁМ И РЕНДЕРИНГ СООБЩЕНИЙ ВСЕХ ДРУГИХ УЧАСТНИКОВ, КОТОРЫЕ
// БУДУТ ПРИХОДИТЬ С СЕРВЕРА.
// ЗДЕСЬ ЖЕ, ВИДИМО, БУДУТ СОЗДАВАТЬСЯ КОМНАТЫ И ЛИЧКИ.

            textarea.addEventListener("blur", function() {
                 if (textarea.value) {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// В этом месте должен находиться локальный анализатор текста, который будет парсить содержимое
// textarea.value и формировать элемент нужных параметров для размещения в нём послания.
// Для начала хочу научиться вытаскивать размеры в пикселях символов при заданных font- параметрах.

                  let mesString = textarea.value + "";
                      console.log(`Длина введённого текста, представленного в виде строки: ${mesString.length} символов.`);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                       let message = document.createElement("div"); // Здесь создаётся сообщение участника.
                           message.className = "message";           // Генерируем сам элемент сообщения,
                           message.innerHTML = textarea.value;     // передаём в него то, что написал участник
                              let strTime = document.createElement("div");  // в своей textarea,
                                  strTime.id = 'strTime';                   // затем создаём элемент - див,
                                  strTime.innerHTML = PP.pluginTimeClient(); // в котором размещаем время
                              message.appendChild(strTime);                 // создания сообщения,
                           message.style.backgroundColor = colorMessage;   // задаём цвет сообщения,
                           let obj = {a: objMessage.sv1, b: textarea.value, c: colorMessage}; // формируем обьект,
                           socket.emit("message", obj);      // содержащий сообщение, и отправляем его на сервер.
                           textarea.value = "";
                           textarea.focus();
                       pole.insertAdjacentElement("beforeEnd", message);
                //       pole.scrollTop = 999999;
                       pole.scrollTop = pole.scrollHeight;               // Делаем автоматич. прокрутку поля.
                 }
               });

               socket.on("otvetMessage", message => {                 // Здесь принимаем с сервера сложный
                 let otvetMessage = document.createElement("div");   // содержащий заголовок "От такого-то"(message.a),
                     otvetMessage.className = "otvetMessage";       // сам текст ответного послания(message.b),
                     let zagolovok = document.createElement("div");   // и цвет его сообщений(message.c), см. ниже...
                         zagolovok.id = 'zagolovok';
                         zagolovok.innerHTML = message.a + ":";  // СООБЩЕНИЕ(message) представляет собой контейнер - оболочку
                     otvetMessage.appendChild(zagolovok);       //  otvetMessage, содержащий три компонента:
                                                               // 1. zagolovok. В нём находится имя отправителя сообщения...
                     let telo = document.createElement("div"); // 2. telo: блок вариативной высоты(height: auto), поскольку
                         telo.id = 'telo';                     // сообщения бывают разного обьёма...
                         telo.innerHTML = message.b;
                     otvetMessage.appendChild(telo);

                     let strTimeOtvet = document.createElement("div"); //... и 3. strTimeOtvet: это подвал, футер, содержащий
                         strTimeOtvet.id = 'strTimeOtvet';             // дату и время поступления сообщения.
                         strTimeOtvet.innerHTML = PP.pluginTimeClient();
                     otvetMessage.appendChild(strTimeOtvet);
                     otvetMessage.style.backgroundColor = message.c; //...и отрисовываем у себя на
                 pole.appendChild(otvetMessage);                     // странице его сообщение.
                 pole.scrollTop = pole.scrollHeight;                // Делаем автоматич. прокрутку поля.
            //     pole.scrollTop = 999999;
               });

           } // Эта скобка закрывает главную функцию funcMain.

     }); // ЭТО ГЛАВНАЯ ЗАКРЫВАЮЩАЯ СКОБКА СКРИПТА. АККУРАТНЕЙ С НЕЙ!

  //          const socket = io.connect('ws://localhost:7777');
//            socket.binaryType = "arraybuffer";

      //      button.addEventListener("click", funcExpect);
      //      function funcExpect() {
    //            socket.emit("fotku_please", "expect_to_foto");
    //            socket.on("fotka_proba", message => {
    //                let image = document.createElement('img');
    //                image.width = 120;
    //                image.src = message;
    //                image.style.marginTop = 12 + "px";
    //                image.style.borderRadius = "15px";
    //                image.style.display = 'block';
    //                body.appendChild(image);
    //            });
    //        }

//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
            // document.getElementById("files").addEventListener('change', onFileSelect);
            //
            // function onFileSelect(e) {
            //  var file = e.target.files[0];
            //  var reader = new FileReader();
            //  reader.onload = function(f)  {
            //     socket.emit("message_foto", f.target.result);
            //     let image = document.createElement("img");
            //       image.src = f.target.result;
            //       image.style.marginTop = 12 + "px";
            //       image.width = 120 ;
            //       image.style.borderRadius = "15px";
            //       image.style.display = 'block';
            //       body.appendChild(image);
            //  }
            //
            //  reader.readAsDataURL(file);
            //
            //  }
//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

                // socket.on("broadcast_foto", message => {
                //     let image = document.createElement('img');
                //     image.width = 250;
                //     image.style.marginTop = 12 + "px";
                //     image.style.borderRadius = "15px";
                //     image.style.display = 'block';
                //     image.src = message;
                //     body.appendChild(image);
                // })
