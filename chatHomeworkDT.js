
          document.addEventListener('DOMContentLoaded', () => {

         var chat_exit = true;
         let name ;
         let  priznak_close ;
         let colorMessage; // Здесь содержится цвет сообщений участника, передаваемый с сервера в обьекте участника.
         let objMessage;  // А здесь - целиком обьект участника, передаваемый с сервера.
         let file = 0;
         let vibor = "";
         let flag = 0;

         let body = document.getElementById("body");

         let gardina = document.querySelector("#gardina");
             gardina.style.width = window.innerWidth + 'px';
             gardina.style.height = window.innerHeight + 'px';

        let banner = document.querySelector("#banner");
        let bannerHistory = document.querySelector("#bannerHistory");
        let textarea = document.querySelector("#textarea");
             console.log(`textarea.id = ${textarea.id}`);

        let pole = document.querySelector("#pole");
        let poleHistory = document.querySelector("#poleHistory");
        let podmenu = document.querySelector("#podmenu");

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

        let hour = document.querySelector("#hour");                       // Получение истории чата за час, сутки
            hour.addEventListener("click", funcGetHistory.bind(hour, 1)); // и неделю абсолютно однотипно, поэтому
        let day = document.querySelector("#day");                         // эти три варианта обрабатывает одна
            day.addEventListener("click", funcGetHistory.bind(hour, 2));  // функция: funcGetHistory. Меняется только
        let week = document.querySelector("#week");                       // числовой параметр.
            week.addEventListener("click", funcGetHistory.bind(hour, 3));
        let variation = document.querySelector("#variation");             // А вот получение истории за произвольный
            variation.addEventListener("click", funcGetHistoryRange);    // период - посложнее, и пришлось сочинить
        let finish = document.querySelector("#finish").addEventListener("click", funcFinish); // особую функцию:
                                                                                              //  funcGetHistoryRange.
        function funcGetHistory(param1) {
                  bannerHistory.className = "";                  // Здесь мы просим покинуть страницу баннер с меню;
                  poleHistory.style.opacity = "1";               // и, напротив, появиться - поле для размещения искомой
                  let finish = document.querySelector("#finish"); // истории чата, а также кнопку для прекращения сеанса
                  finish.style.opacity = '1';                     // работы с полученной историей.
                  let obj = {a:param1, b:null, c:null};          // Формируем специальный обьект,
                  socket.emit(`history, please!`, obj);         // и отправляем его на сервер, чтобы он получил для нас
               }                                               // историю чата за искомый период.

        function funcGetHistoryRange() {
            let str1, str2;
            let mass1 = []; let mass2 = [];
            let podmenu = document.querySelector("#podmenu");
                podmenu.style.opacity = "1";
                let inp1 = document.querySelector("#inp1"); // Эти инпуты - для ввода начальной и конечной
                let inp2 = document.querySelector("#inp2"); // границы искомого периода истории.

                    inp1.addEventListener("blur", function() { // Обрабатываем ввод  начальной границы.
                        str1 = inp1.value;                     // Получаем stdin в строку,
                        let mass = str1.split("-");            // и парсируем её в соответствующий массив,
                        for ( let i = 0; i < mass.length; i++) { // поскольку функция date.getTime(), получающая
                           mass1[i] = Number(mass[i]);           // на сервере таймстампы по введённым датам,
                        }                                      // требует ввода дат в виде чисел, но не строк.
                    });
                    inp2.addEventListener("blur", function() {  // А теперь - ввод  конечной границы,
                        str2 = inp2.value;                     // здесь всё аналогично.
                        let mass = str2.split("-");
                        for ( let i = 0; i < mass.length; i++) {
                           mass2[i] = Number(mass[i]);
                        }
                    });
                let submit = document.querySelector("#vvod");
                    submit.addEventListener("click", function() {
                        let obj = {a:4, b:mass1, c:mass2};         // Формируем специальный обьект,

                           for (let key in obj) {
                              console.log(`key: ${key}, obj[key]: ${obj[key]}`);
                           }

                        socket.emit(`history, please!`, obj);   // и отправляем его на сервер.
                        bannerHistory.className = "";
                        poleHistory.style.opacity = "1";
                        podmenu.style.opacity = "0";
                        let finish = document.querySelector("#finish");
                            finish.style.opacity = '1';
                    });
        }

        function funcFinish() {               // Нажатие на кнопку "Закончить работу с историей"
           poleHistory.style.opacity = "0";   // приводит к исчезновению поля, отображающего историю,
           let finish = document.querySelector("#finish"); // а также самой этой кнопки.
           finish.style.opacity = "0";
        }

         const socket = io.connect('ws://localhost:7777');

         let stop = document.querySelector("#stop");
             stop.addEventListener("click", function() { // По нажатию этой кнопки для участника закрывается
               let posl = {a:objMessage.sv1, b: `Я ВРЕМЕННО ВЫХОЖУ ИЗ ОБЩЕНИЯ. ВСЕМ ПОКА !`, c:objMessage.sv3};
               socket.emit("message", posl);             // текущая сессия присутствия в чате путём отсылки
               location.reload();                   // на сервер соответствующего сообщения и перезагрузки страницы.
          //     location.href = location.href; // Оба варианта работают.
             });

//=================================== БЛОК ПОЛУЧЕНИЯ ИСТОРИИ ЧАТА. ====================================
             let history = document.querySelector("#history");
                 history.addEventListener("click", function() {  // Фактически - это хендлер нажатия
                       bannerHistory.className = "move";        // кнопки "Получить историю чата".
                 });

                 socket.on("massHistory", message => {
                   let massiv = message;
                   console.log(`massHistory = ${message}`);
                     for (let i = 0; i < massiv.length; i++) {     // Обрабатываем поочерёдно все обьекты
                         let str = "";                             // из прилетевшего по сокету массива обьектов.
                         let elem = document.createElement("div");
                              for (let key in massiv[i]) {         // Все элементы обьекта помещаем один за одним,
                                 str += `${massiv[i][key]};  `;    //  в одну строку, для удобства обозрения.
                              }
                        elem.innerHTML = str;
                        poleHistory.appendChild(elem);
                          let pustota = document.createElement("p");
                              pustota.innerHTML = "";
                          poleHistory.appendChild(pustota);         // Разделяем информативные записи пустыми строками.
                          poleHistory.scrollTop = poleHistory.scrollHeight; // Производим автоматический скроллинг поля.
                     }
                 });
//============================== ЗАКОНЧЕН БЛОК ПОЛУЧЕНИЯ ИСТОРИИ ЧАТА. ==============================


//==============================  БЛОК ОТПРАВКИ И ПОЛУЧЕНИЯ ИЗОБРАЖЕНИЙ. ================================

document.getElementById("files").addEventListener('change', onFileSelect);

     function onFileSelect(e) {
        let file = e.target.files;
        let massImage = [];
            console.log("file.length = " + file.length);
        for (let j = 0; j < file.length; j++) {
        let reader = new FileReader();
        reader.onload = function(f)  {
              socket.emit("message_foto", f.target.result);
                   let image = document.createElement("img");
                       image.id = `imid ${j}`;
                       image.className = "image";
                       image.src = f.target.result;
                       console.log("image.id = " + image.id);
                   pole.appendChild(image);
                   pole.scrollTop = pole.scrollHeight;
        }
        reader.readAsDataURL(file[j]);
      }
     }

                  socket.on("broadcast_foto", message => {      // Получаем рассылку с сервера.
                       let image = document.createElement('img');
                           image.className = "image";
                           image.src = message;
                       pole.appendChild(image);
                       pole.scrollTop = pole.scrollHeight;
                  });

//============================== ЗАКОНЧЕН БЛОК ОТПРАВКИ И ПОЛУЧЕНИЯ ИЗОБРАЖЕНИЙ. ===================================


         let but = document.getElementById('but');                // НАЧАЛО работы на странице - нажатие
             but.onclick = function() {                           // БОЛЬШОЙ ЦЕНТРАЛЬНОЙ КНОПКИ.
                name = prompt("Как-нибудь назовите себя: ", "");  // Посетителя просят ввести произвольное имя.
                socket.emit('promptingName', name);               // Оно отправляется на сервер для идентификации.
                socket.on("otvet", message => {
                  if (message === "Это имя уже есть в нашей базе.") { // Сервер сообщил, что такое имя в базе уже есть.
                    let clientCode = prompt(`Это имя уже есть в нашей базе.
                  Если Вы - новичок в чате, нажмите "Отмена".
                  Если Вы - УЖЕ УЧАСТНИК ЧАТА, то введите ПАРОЛЬ: ${""}`);
                     console.log(`clientCode = ${clientCode}`);
                     console.log(`Тип данных: ${typeof clientCode}`);
                      if (!clientCode) { // Если посетитель нажал "Отмена", значит он новичок в чате.
                        let nameNew = prompt(`Попробуйте другое имя: , ${""}`); // Предлагаем ему ввести
                          if (nameNew === name) {} // другое имя. Если он снова ввёл то же самое - идём в начало.
                          else {
                            socket.emit('promptingName', nameNew); // Если он ввёл наконец нормальное имя, которого
                            socket.username = nameNew;            // в БД нет,- отсылаем его серверу для формирования
                          }                                        // учётной записи нового участника чата.
                      }
                      else {                                   // Если же это - старый участник чата,
                        socket.emit("clientCode", clientCode); // то на сервере проверяется введённый
                        socket.on("dostup", message => {       // им пароль...
                          objMessage = message.b;
                          if (message.a === "plus") {          //...и если он правильный...
                     colorMessage = message.b.sv3;
                     textarea.focus();
                     banner.className = "";
                     gardina.remove();  //...Предоставляем старому участнику
                     but.remove();       // доступ к чату, и для этого...
                     let send = document.createElement("button"); //...создаём на странице кнопку, которая
                         send.id = 'send';                        // будет отправлять его сообщения.
                         send.innerHTML = 'Отправить';
                     body.appendChild(send);
                       funcMain();
                   }
                   else if (message === "minus") { // Если же он по ошибке ввёл неверный пароль, то...
                       let kod = prompt(`Неверный пароль! Ещё разок: ${""}`); // Это будет продолжаться до тех пор,
                       socket.emit("clientCode", kod);                       // пока не будет введён правильный пароль.
                   } else {}
                   });
                   }
                  }

                  else {              // Если это - новенький, то формируется его учётная запись, для чего
                     funcShowBanner(); // вызываем в качестве колбэка функцию, которая покажет нам форму,
                   }                   // на вопросы которой должен ответить претендент.
                });//
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
                                let obj = {b:color.a, c:parole};      // значение цвета сообщений участника.
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
        //         console.log("Привет из функции - изготовителя сообщений!");
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
                                  let objTime = PP.pluginTimeClient();
                                  strTime.innerHTML = objTime.a; // в котором размещаем время
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
                         let objTime = PP.pluginTimeClient();
                         strTimeOtvet.innerHTML = objTime.a;
                     otvetMessage.appendChild(strTimeOtvet);
                     otvetMessage.style.backgroundColor = message.c; //...и отрисовываем у себя на
                 pole.appendChild(otvetMessage);                     // странице его сообщение.
                 pole.scrollTop = pole.scrollHeight;                // Делаем автоматич. прокрутку поля.
            //     pole.scrollTop = 999999;
             }); //

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
