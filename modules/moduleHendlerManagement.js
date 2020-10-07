
   export function moduleHendlerManagement(param1, param2, param3, param4, param5) {

     let but3 = document.querySelector("#butRooms3");
         but3.style.display = 'block';
         but3.addEventListener("click", function() {
                                  let inpmenuman = document.querySelector("#inpmenuman");
                                      inpmenuman.addEventListener("blur", function() {
                                         if (inpmenuman.value) {
                                              param1 = inpmenuman.value;
               //                               console.log(`Имя плохиша, которого надо заблокировать: ${nameBedMan}`);
                                         }
                                      });

                                  let but1menuman = document.querySelector("#but1menuman");
                                      but1menuman.addEventListener("click", function() {
                                          let obj = {a:param2.sv1, b:param3, c:param1};
                                          console.log(`Название текущей комнаты: ${param3}`);
                                          param4.emit("toBlackList", obj);
                                          console.log(`На сервер ушёл циркуляр о необходимости БЛОКИРОВКИ юзера ${param1} в комнате ${param3}`);
                                      });
                             //       });

                                    let but2menuman = document.querySelector("#but2menuman");
                                            but2menuman.addEventListener("click", function() {
                                              let obj = {a:param2.sv1, b:param3, c:param1};
                                              console.log(`Название текущей комнаты: ${param3}`);
                                              param4.emit("fromBlackList", obj);
                                              console.log(`На сервер ушёл циркуляр о необходимости РАЗБЛОКИРОВКИ юзера ${param1} в комнате ${param3}`);
                                    });

                               if (param5) {
                                    let but3menuman = document.querySelector("#but3menuman");
                                        but3menuman.addEventListener("click", function() {
                                        console.log(`Права модератора делегируются юзеру по имени ${param1}.`);
                                        let obj = {a:param1, b:param3};
                                        param4.emit("youModerator", obj);
                                    });

                                    let but4menuman = document.querySelector("#but4menuman");
                                        but4menuman.addEventListener("click", function() {
                                        console.log(`Изымаются права модератора у юзера по имени ${param1}.`);
                                        let obj = {a:param1, b:param3};
                                        param4.emit("youNoModerator", obj);
                                    });
                                  }
                                  else {
                                    let but3menuman = document.querySelector("#but3menuman");
                                        but3menuman.remove();

                                    let but4menuman = document.querySelector("#but4menuman");
                                        but4menuman.remove();
                                  }

                                  let but5menuman = document.querySelector("#but5menuman");
                                      but5menuman.addEventListener("click", function() {
                                  });


                                  });


    }
