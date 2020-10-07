
   export function moduleRenderMenuManagement(param1) {

        let nameBedMan;
        let menuman = document.createElement("div");
            menuman.id = 'menuman';
            menuman.className = "move";

                     let inpmenuman = document.createElement("input");
                         inpmenuman.id = 'inpmenuman';
                         inpmenuman.placeholder = 'Введите имя:';
                     menuman.appendChild(inpmenuman);

                     let but1menuman = document.createElement("button");
                         but1menuman.id = 'but1menuman';
                         but1menuman.innerHTML = 'Заблокировать';
                     menuman.appendChild(but1menuman);

                     let but2menuman = document.createElement("button");
                         but2menuman.id = 'but2menuman';
                         but2menuman.innerHTML = 'Разблокировать';
                     menuman.appendChild(but2menuman);

                     let but3menuman = document.createElement("button");
                         but3menuman.id = 'but3menuman';
                         but3menuman.innerHTML = 'Сделать модератором';
                     menuman.appendChild(but3menuman);

                     let but4menuman = document.createElement("button");
                         but4menuman.id = 'but4menuman';
                         but4menuman.innerHTML = 'Исключить из модераторов';
                     menuman.appendChild(but4menuman);

                     let but5menuman = document.createElement("button");
                         but5menuman.id = 'but5menuman';
                         but5menuman.innerHTML = 'Закрыть меню';
                         but5menuman.addEventListener("click", function() {
                              menuman.remove();
                         });
                     menuman.appendChild(but5menuman);

         param1.appendChild(menuman);

        return menuman;

    }
