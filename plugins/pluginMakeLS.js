
   PP.pluginMakeLS = function(func, menuLS) {

         let forma = document.createElement("div");
             forma.id = "lichkaMakeMale";
             forma.className = '';
                  let tr = document.createElement("textarea");
                      tr.id = 'tr';
                      tr.rows = '5';
                      tr.cols = '27';
                      tr.placeholder = "введите сообщение здесь";
                  forma.appendChild(tr);
                  let bt = document.createElement("button");
                      bt.id = 'bt';
                      bt.innerHTML = 'Отправить';
                  forma.appendChild(bt);
                  let closeWindow = document.createElement("button");
                      closeWindow.id = 'closeWindow';
                      closeWindow.innerHTML = 'Закрыть окно';
                  forma.appendChild(closeWindow);
         body.appendChild(forma);

//-----------------------------------------------------------------------------------

         let lichka = document.createElement("div");
         lichka.id = 'lichka';
         lichka.className = "";

            let p1 = document.createElement("p");
                p1.innerHTML = '&nbsp;&nbsp;У вас с этим участником пока нет диалога.';
            lichka.appendChild(p1);

            let p2 = document.createElement("p");
                p2.innerHTML = '&nbsp;&nbsp;Хотите начать с ним диалог?';
            lichka.appendChild(p2);

            let p3 = document.createElement("p");
                p3.innerHTML = '&nbsp;&nbsp;Если да -';
                p3.style.marginBottom = '10px';
            lichka.appendChild(p3);

            let tar = document.createElement("textarea");
                tar.id = 'dialogs';
                tar.placeholder = 'Введите текст сообщения';
                tar.cols = '26';
                tar.rows = '4';
            lichka.appendChild(tar);

            let button = document.createElement("button");
                button.id = 'button';
                button.innerHTML = "Отправить";
            lichka.appendChild(button);

            let stopLS = document.createElement("button");
                stopLS.id = 'stopLS';
                stopLS.innerHTML = "Закрыть окно";
                stopLS.addEventListener("click", funcStopLS);
            lichka.appendChild(stopLS);

         body.appendChild(lichka);

         function funcStopLS() {
             userLS.addEventListener("click", func);
                 lichka.className = '';
                 let menuLS = document.querySelector("#menuLS");
                 menuLS.className = "";
              setTimeout(function() {
                lichka.innerHTML = "";
                lichka.remove();
                stopLS.remove();
                menuLS.remove();
                forma.remove();
              }, 700);
         }

    }
