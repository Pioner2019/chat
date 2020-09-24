
   PP.pluginRenderLichkaMessagesRT = function(baza, obj) {
     let otvetMessage = document.createElement("div");
         otvetMessage.className = "otvetMessageRT";
         let zagolovok = document.createElement("div");
    //         zagolovok.id = 'zagolovokRT';
             zagolovok.classList.add("zagolovokRT");
             zagolovok.innerHTML = obj.a + ":";
         otvetMessage.appendChild(zagolovok);

         let telo = document.createElement("div");
    //         telo.id = 'teloRT';
             telo.classList.add("teloRT");
             telo.innerHTML = obj.b;
         otvetMessage.appendChild(telo);

         let strTimeOtvet = document.createElement("div");
    //         strTimeOtvet.id = 'strTimeOtvetRT';
             strTimeOtvet.classList.add("strTimeOtvetRT");
             let objTime = PP.pluginTimeClient();
             strTimeOtvet.innerHTML = objTime.a;
         otvetMessage.appendChild(strTimeOtvet);
                  otvetMessage.style.backgroundColor = obj.c;
                  otvetMessage.style.marginTop = '10px';
                  otvetMessage.style.border = '1px solid black';
                  otvetMessage.style.borderTopLeftRadius = '18px';
                  otvetMessage.style.borderTopRightRadius = '30px';
                  otvetMessage.style.borderBottomRightRadius = '0px';
                  otvetMessage.style.borderBottomLeftRadius = '18px';
     baza.appendChild(otvetMessage);
     baza.scrollTop = baza.scrollHeight;
     return otvetMessage;
    }
