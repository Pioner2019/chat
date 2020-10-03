
   PP.pluginRenderMessages = function(baza, obj) {     // Получаем сюда из основного модуля обьект,
     let otvetMessage = document.createElement("div");   // содержащий заголовок "От такого-то"(message.a),
         otvetMessage.className = "otvetMessage";       // сам текст ответного послания(message.b),
         let zagolovok = document.createElement("div");   // и цвет его сообщений(message.c), см. ниже...
    //         zagolovok.classList.add("zagolovok");
             zagolovok.className = "zagolovok";
    //         zagolovok.id = 'zagolovok';
             zagolovok.innerHTML = obj.a + ":";  // СООБЩЕНИЕ(message) представляет собой контейнер - оболочку
         otvetMessage.appendChild(zagolovok);       //  otvetMessage, содержащий три компонента:
                                                   // 1. zagolovok. В нём находится имя отправителя сообщения...
         let telo = document.createElement("div"); // 2. telo: блок вариативной высоты(height: auto), поскольку
    //         telo.id = 'telo';                     // сообщения бывают разного обьёма...
    //         telo.classList.add("telo");
             telo.className = "telo";
             telo.innerHTML = obj.b;
         otvetMessage.appendChild(telo);

         let strTimeOtvet = document.createElement("div"); //... и 3. strTimeOtvet: это подвал, футер, содержащий
    //         strTimeOtvet.id = 'strTimeOtvet';             // дату и время поступления сообщения.
    //         strTimeOtvet.classList.add("strTimeOtvet");
             strTimeOtvet.className = "strTimeOtvet";
             let objTime = PP.pluginTimeClient();
             strTimeOtvet.innerHTML = objTime.a;
         otvetMessage.appendChild(strTimeOtvet);
         otvetMessage.style.backgroundColor = obj.c; //...и отрисовываем у себя на
//         otvetMessage.addEventListener("click", funcResponse); // странице его сообщение.
     baza.appendChild(otvetMessage);
     // lichka.insertAdjacentHTML(`beforeEnd`, `<button id='stopLS'>Закрыть личку</button>`);
     baza.scrollTop = baza.scrollHeight;
     return otvetMessage;
    }
