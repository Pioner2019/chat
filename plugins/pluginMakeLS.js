
   PP.pluginMakeLS = function(func, menuLS) {

         let forma = document.createElement("div");
             forma.id = "lichkaMakeMale";
             forma.className = '';
                  // let inn = document.createElement("input");
                  //     inn.id = 'inn';
                  // forma.appendChild(inn);
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
  //       let format = document.querySelector("#lichkaMakeMale");

         let lichka = document.createElement("div");
         lichka.id = 'lichka';
         lichka.className = "";

            let p1 = document.createElement("p");
                p1.innerHTML = '&nbsp;&nbsp;У вас пока нет диалога с этим участником.';
            lichka.appendChild(p1);

            let p2 = document.createElement("p");
                p2.innerHTML = '&nbsp;&nbsp;Хотите начать с ним диалог?';
            lichka.appendChild(p2);

            let p3 = document.createElement("p");
                p3.innerHTML = '&nbsp;&nbsp;Если да -';
                p3.style.marginBottom = '10px';
            lichka.appendChild(p3);

            // let inputin = document.createElement("input");
            //     inputin.id = 'inputin';
            //     inputin.type = 'text';
            //     inputin.placeholder = 'введите его имя:';
            // lichka.appendChild(inputin);

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

        //  let male = document.createElement("button");
        //          male.id = 'male';
        //          male.innerHTML = "Написать послание";
        //          male.addEventListener("click", function() {
        //           console.log("НАЖАТИЕМ ЭТОЙ КНОПКИ будет вызываться форма для генерации сообщения.");
        //                 format.className = 'trans';
        //            });
        // body.appendChild(male);

    //     let stopLS = document.createElement("button");
    //         stopLS.id = 'stopLS';
    //         stopLS.innerHTML = "Закрыть окно";
    // //        stopLS.addEventListener("click", funcStopLS.bind(stopLS, male));
    //         stopLS.addEventListener("click", funcStopLS);
    //     body.appendChild(stopLS);

  //       function funcStopLS(param) {
         function funcStopLS() {
             userLS.addEventListener("click", func);
      //           param.remove();
      //           inputin.remove();
    //             console.log("inputin = " + inputin);
      //           lichka.remove();
                 lichka.className = '';
                 stopLS.remove();
                 let menuLS = document.querySelector("#menuLS");
                 menuLS.className = "";
  //              format.className = '';
         }

    }
