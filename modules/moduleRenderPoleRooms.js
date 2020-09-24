
   export function moduleRenderPoleRooms(param1) {
  //    console.log(`ЕСЛИ Я ВИЖУ ЭТО В КОНСОЛИ - ЗНАЧИТ, МОДУЛИ ЗАРАБОТАЛИ! УРА!`);
        let poleRooms = document.createElement("div");
            poleRooms.id = 'poleRooms';
            poleRooms.innerHTML = 'КОМНАТЫ.';
            poleRooms.addEventListener("click", function() {
  //              poleRooms.remove();
            });
            let table = document.createElement("div");
                table.id = 'table';
                let listLeft = document.createElement('ul');
                    listLeft.id = 'listLeft';
                    listLeft.innerHTML = "Созданные вами комнаты:";
                table.appendChild(listLeft);
                let listRight = document.createElement('ul');
                    listRight.id = 'listRight';
                    listRight.innerHTML = "Комнаты с вашим участием:";
                table.appendChild(listRight);
           poleRooms.appendChild(table);

               let controls = document.createElement("div");
                   controls.id = 'controls';
                     let p1 = document.createElement("p");
                         p1.id = 'p1';
                         p1.innerHTML = 'Введите название комнаты:';
                     controls.appendChild(p1);
                     let inpRooms = document.createElement("input");
                         inpRooms.id = 'inpRooms';
                     controls.appendChild(inpRooms);
                     let butRooms1 = document.createElement("button");
                         butRooms1.id = 'butRooms1';
                         butRooms1.innerHTML = 'Войти';
                     controls.appendChild(butRooms1);
                     let p2 = document.createElement("p");
                         p2.id = 'p2';
                         p2.innerHTML = 'Напишите сообщение:';
                     controls.appendChild(p2);
                     let tarea = document.createElement("textarea");
                         tarea.id = 'tarea';
                     controls.appendChild(tarea);
                     let butRooms2 = document.createElement("button");
                         butRooms2.id = 'butRooms2';
                         butRooms2.innerHTML = 'Отправить';
                     controls.appendChild(butRooms2);
                     let butRooms3 = document.createElement("button");
                         butRooms3.id = 'butRooms3';
                         butRooms3.innerHTML = 'Управление';
                         butRooms3.style.display = 'none';
                     controls.appendChild(butRooms3);

             poleRooms.appendChild(controls);

             let poleRoom = document.createElement("div");
                 poleRoom.id = 'poleRoom';
                 let outRooms = document.createElement("button");
                     outRooms.id = 'outRooms';
                     outRooms.innerHTML = "Закрыть окно";
                     outRooms.addEventListener("click", funcOutRooms);
                     outRooms.style.position = "sticky";
                     outRooms.style.top = "430px";
                 poleRoom.appendChild(outRooms);
             poleRooms.appendChild(poleRoom);

         param1.appendChild(poleRooms);

         function funcOutRooms() {
              console.log(`Эта кнопка будет производить полный выход из среды "Комнаты".`);
         }


    }
