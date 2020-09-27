
   export function moduleRenderMenuManagement(param1) {

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

         param1.appendChild(menuman);

        return menuman;

    }
