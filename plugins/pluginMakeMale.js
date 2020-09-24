
   PP.pluginMakeMale = function() {

     let lichka1 = document.createElement("div");
         lichka1.id = "lichkaMakeMale";
         lichka1.className = "";

             let inn = document.createElement("input");
                 inn.id = 'inn';
             lichka1.appendChild(inn);
             let tr = document.createElement("textarea");
                 tr.id = 'tr';
                 tr.placeholder = "введите сообщение здесь";
             lichka1.appendChild(tr);
             let bt = document.createElement("div");
                 bt.id = 'bt';
                 bt.innerHTML = 'Отправить';
        //         bt.style.display = 'block';
             lichka1.appendChild(bt);
     body.appendChild(lichka1);
         let male = document.createElement("button");
         male.id = 'male';
         male.innerHTML = "Написать послание";
//         male.addEventListener("click", funcShowMale);
//         male.addEventListener("click", function() {
          console.log("НАЖАТИЕМ ЭТОЙ КНОПКИ будет вызываться форма для генерации сообщения.");
            let forma = document.querySelector("#lichkaMakeMale");
                forma.className = 'trans';
//           });
    body.appendChild(male);

    }
