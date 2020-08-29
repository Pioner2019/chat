
//  export var rgba;
PP.pluginColorSelect = function() { // Данный плагин возвращаeт выбранный сервером цвет сообщений нового участника.

    let massColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    let osnovaCP = document.createElement("div");
        osnovaCP.id = 'osnovaCP';
        osnovaCP.style.position = "absolute";
        osnovaCP.style.width = '200px';
        osnovaCP.style.height = '500px';
        osnovaCP.style.backgroundColor = 'rgba(1, 1, 1, 0)';
        osnovaCP.style.left = '0px';
        osnovaCP.style.top = '0px';

      let myCanvas = document.createElement("canvas");
          myCanvas.width = '200';
          myCanvas.height = '400';
          myCanvas.style.border = '1px solid black';
          myCanvas.style.background = 'gold';
          myCanvas.style.opacity = 0;
      let ctx = myCanvas.getContext("2d");
   osnovaCP.appendChild(myCanvas);
   document.body.appendChild(osnovaCP);
//========================================================

let gradient0 = ctx.createLinearGradient(0, 0, 0, 80);
gradient0.addColorStop(0, 'red');
gradient0.addColorStop(1, 'orange');
ctx.fillStyle = gradient0;
ctx.fillRect(0, 0, 200, 80);

let gradient1 = ctx.createLinearGradient(0, 80, 0, 160);
gradient1.addColorStop(0, 'orange');
gradient1.addColorStop(1, 'yellow');
ctx.fillStyle = gradient1;
ctx.fillRect(0, 80, 200, 80);

let gradient2 = ctx.createLinearGradient(0, 160, 0, 240);
gradient2.addColorStop(0, 'yellow');
gradient2.addColorStop(1, 'green');
ctx.fillStyle = gradient2;
ctx.fillRect(0, 160, 200, 80);

let gradient3 = ctx.createLinearGradient(0, 240, 0, 320);
gradient3.addColorStop(0, 'green');
gradient3.addColorStop(1, 'blue');
ctx.fillStyle = gradient3;
ctx.fillRect(0, 240, 200, 80);

let gradient4 = ctx.createLinearGradient(0, 320, 0, 400);
gradient4.addColorStop(0, 'blue');
gradient4.addColorStop(1, 'purple');
ctx.fillStyle = gradient4;
ctx.fillRect(0, 320, 200, 80);

//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

      let data = ctx.getImageData(0, 0, 200, 400);
      let x = 100;
      let y = Math.floor(Math.random() * 400 + 1);
      let pix = data.data;
      let i = ((y * 200) + x) * 4;
  //    let rgba = `rgba(${pix[i]}, ${pix[i + 1]}, ${pix[i + 2]}, ${pix[i + 3]})`;
      let rgba = `rgba(${pix[i]}, ${pix[i + 1]}, ${pix[i + 2]}, ${0.6})`;
   return rgba;
  }

//    module.exports = pluginColorSelect;
