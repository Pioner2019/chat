
   PP.pluginRenderLichkaMessages = function(baza, obj, param1, param2) {     // Получаем сюда из основного модуля обьект,
     let otvetMessage = document.createElement("div");   // содержащий заголовок "От такого-то"(message.a),
         otvetMessage.className = "otvetMessage";       // сам текст ответного послания(message.b),
         let zagolovok = document.createElement("div");   // и цвет его сообщений(message.c), см. ниже...
             zagolovok.id = 'zagolovok';
             zagolovok.innerHTML = obj.fromWhom + ":";  // СООБЩЕНИЕ(message) представляет собой контейнер - оболочку
         otvetMessage.appendChild(zagolovok);       //  otvetMessage, содержащий три компонента:
                                                   // 1. zagolovok. В нём находится имя отправителя сообщения...
         let telo = document.createElement("div"); // 2. telo: блок вариативной высоты(height: auto), поскольку
             telo.id = 'telo';                     // сообщения бывают разного обьёма...
             telo.innerHTML = obj.text;
         otvetMessage.appendChild(telo);

         let strTimeOtvet = document.createElement("div"); //... и 3. strTimeOtvet: это подвал, футер, содержащий
             strTimeOtvet.id = 'strTimeOtvet';             // дату и время поступления сообщения.
             let objTime = PP.pluginTimeClient();
             strTimeOtvet.innerHTML = obj.time;
         otvetMessage.appendChild(strTimeOtvet);
         otvetMessage.style.backgroundColor = obj.color; //...и отрисовываем у себя на странице его сообщение.
           if (obj.fromWhom === param1) {
                  otvetMessage.style.marginLeft = '10px';
                  otvetMessage.style.marginTop = '10px';
                  otvetMessage.style.border = '1px solid black';
                  otvetMessage.style.borderTopLeftRadius = '30px';
                  otvetMessage.style.borderTopRightRadius = '18px';
                  otvetMessage.style.borderBottomRightRadius = '18px';
                  otvetMessage.style.borderBottomLeftRadius = '0px';
                  otvetMessage.style.backgroundColor = param2;
           }
           else {}
     baza.appendChild(otvetMessage);
     baza.scrollTop = baza.scrollHeight;
     // if (baza.scrollHeight > 0) {
     //
     // }
//     let stopLS = document.querySelector("#stopLS");
  //       stopLS.style.top = '400px';
//     stopLS.style.top = 400 + baza.scrollHeight + 'px';
     return otvetMessage;
    }
