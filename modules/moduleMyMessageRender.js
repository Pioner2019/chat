
  // export function moduleMyMessageRender(param1, param2, param3) {
   export function moduleMyMessageRender(param1, param2) {

     let poleRoom = document.querySelector("#poleRoom");
     let message = document.createElement("div"); // Здесь создаётся сообщение участника.
         message.className = "message";           // Генерируем сам элемент сообщения,
         message.innerHTML = param1.value;     // передаём в него то, что написал участник
            let strTime = document.createElement("div");  // в своей textarea,
                strTime.id = 'strTime';                   // затем создаём элемент - див,
                let objTime = PP.pluginTimeClient();
                strTime.innerHTML = objTime.a;            // в котором размещаем время
            message.appendChild(strTime);                 // создания сообщения,
         message.style.backgroundColor = param2.sv3;   // задаём цвет сообщения,
         param1.value = "";
         param1.focus();
     poleRoom.insertAdjacentElement("beforeEnd", message); // и отрисовываем его в поле poleRoom.
     poleRoom.scrollTop = poleRoom.scrollHeight;               // Делаем автоматич. прокрутку поля.

    }
