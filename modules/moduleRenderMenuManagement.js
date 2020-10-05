
   export function moduleRenderMenuManagement(param1) {

        let nameBedMan;
        let menuman = document.createElement("div");
            menuman.id = 'menuman';
            menuman.className = "move";

                     let inpmenuman = document.createElement("input");
                         inpmenuman.id = 'inpmenuman';
                         inpmenuman.placeholder = 'Введите имя:';
                         // inpmenuman.addEventListener("blur", function() {
                         //      if (inpmenuman.value) {
                         //          nameBedMan = inpmenuman.value;
                         //          console.log(`Имя плохого парня, которого надо заблокировать: ${nameBedMan}`);
                         //      }
                         // });
                     menuman.appendChild(inpmenuman);

                     let but1menuman = document.createElement("button");
                         but1menuman.id = 'but1menuman';
                         but1menuman.innerHTML = 'Заблокировать';
                        //  but1menuman.addEventListener("click", function() {
                        //       let obj = {a:val, b:nameBedMan};
                        //       console.log(`Название текущей комнаты: ${val}`);
                        //       socket.emit("toBlackList", obj);
                        //       console.log(`На сервер ушло уведомление о блокировке юзера ${nameBedMan} в комнате ${val}`);
                        // });
                     menuman.appendChild(but1menuman);

                     let but2menuman = document.createElement("button");
                         but2menuman.id = 'but2menuman';
                         but2menuman.innerHTML = 'Разблокировать';
                     menuman.appendChild(but2menuman);

                     let but3menuman = document.createElement("button");
                         but3menuman.id = 'but3menuman';
                         but3menuman.innerHTML = 'Сделать модератором';
                     menuman.appendChild(but3menuman);

         param1.appendChild(menuman);

        return menuman;

    }
