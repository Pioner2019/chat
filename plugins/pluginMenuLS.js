
   PP.pluginMenuLS = function() {
     let menuLS = document.createElement("div");
         menuLS.id = 'menuLS';
         menuLS.className = '';
         let button = document.createElement("button");
             button.id = 'otvet';
             button.className = 'knopki';
             button.innerHTML = 'Написать';
             button.style.marginTop = '5px';
             button.style.marginBottom = '5px';
         menuLS.appendChild(button);
         let button1 = document.createElement("button");
             button1.id = 'onban';
             button1.className = 'knopki';
             button1.innerHTML = 'Заблокировать';
             button1.style.marginBottom = '5px';
         menuLS.appendChild(button1);
         let button2 = document.createElement("button");
             button2.id = 'offban';
             button2.className = 'knopki';
             button2.innerHTML = 'Разблокировать';
         menuLS.appendChild(button2);
    body.appendChild(menuLS);
    }
