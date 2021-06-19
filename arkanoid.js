   var myGamePiece;
   var myGameBall;
   var myGameBall2;
   var screenWidth = 640;
   var screenHeight = 480;
   var blocks = [];
   var points;
   var leftplatformenabled = true;
   var myGameArea;
   var background_img = new Image();
   background_img.src = "background.jpg";
   var time = 0;
   var gameInProgress = false;
   var gameMode;
   var brokenBlocks = [];
   var balls = [];
   var brokenBlocksB = 0;

   function startGame() {
       balls.length = 0;
       if (confirm("Press OK for mode ONE, press Cancel for mode TWO")) {
           gameMode = "one";
       } else {
           gameMode = "two";
       }
       var speedX1 = ((Math.random() * 6) - 3);
       var speedX2 = ((Math.random() * 6) - 3);
       var speedY1 = ((Math.random() * 6) - 3);
       var speedY2 = ((Math.random() * 6) - 3);
       myGamePiece = new component(150, 20, "platform.png", ((screenWidth - 150) / 2), screenHeight - 20, "platform");
       myGamePiece2 = new component(20, 150, "platform.png", 0, ((screenHeight - 150) / 2), "platform");
       balls.push(new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX1, speedY1, "ball.png", 16));
       //    balls.push(new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX2, speedY2, "ball.png", 16));
       points = 0;
       blocks.length = 0;


       for (idx = 0; idx < 10; idx++) {
           for (idy = 1; idy <= 3; idy++) {
               if (Math.floor(Math.random() * 100) % 5) {
                   blocks.push(new component(50, 20, "block1.png", 24 + (idx * 55), (25 + (idy * 25)), "A"));
               } else {
                   blocks.push(new component(50, 20, "block2.png", 24 + (idx * 55), (25 + (idy * 25)), "B"));

               }
           }

       }
       gameInProgress = true;
       myGameArea.start();
   }

   function platformsCrashWithBounds(myGamePiece, myGamePiece2) {


       var botplatformleft = myGamePiece.x;
       var botplatformright = myGamePiece.x + (myGamePiece.width);
       var botplatformtop = myGamePiece.y;
       var botplatformbottom = myGamePiece.y + (myGamePiece.height);

       var leftplatformleft = myGamePiece2.x;
       var leftplatformright = myGamePiece2.x + (myGamePiece2.width);
       var leftplatformtop = myGamePiece2.y;
       var leftplatformbottom = myGamePiece2.y + (myGamePiece2.height);

       var availableMoves = "HJKL";

       //case 1 - leftplatform is blocking botplatform going left
       if ((leftplatformbottom > botplatformtop) && (botplatformleft <= leftplatformright + 1)) {
           availableMoves = availableMoves.replace(/H/g, '');
       }
       //case 2 - botplatform is blocking leftplatform going down
       if ((botplatformleft < leftplatformright) && (leftplatformbottom >= botplatformtop)) {
           availableMoves = availableMoves.replace(/J/g, '');
       }
       //case 3 - botplatform is blocked by left wall
       if (botplatformleft < 1) {
           availableMoves = availableMoves.replace(/H/g, '');
       }
       //case 4 - botplatform is blocked by right wall
       if (botplatformright > screenWidth - 1) {
           availableMoves = availableMoves.replace(/L/g, '');
       }
       //case 5 - leftplatform is blocked by bottom wall
       if (leftplatformbottom > screenHeight - 1) {
           availableMoves = availableMoves.replace(/J/g, '');
       }

       //case 6 - leftplatform is blocked by top wall
       if (leftplatformtop < 1) {
           availableMoves = availableMoves.replace(/K/g, '');
       }

       return availableMoves;
   }

   myGameArea = {
       canvas: document.createElement("canvas"),
       start: function() {
           this.canvas.width = screenWidth;
           this.canvas.height = screenHeight;
           this.context = this.canvas.getContext("2d");
           myGameArea.context.drawImage(background_img, 0, 0, screenWidth, screenHeight);

           document.body.insertBefore(this.canvas, document.body.childNodes[0]);
           this.frameNo = 0;
           this.interval = setInterval(updateGameArea, 20);
           this.timerInterval = setInterval(updater, 1000)

           window.addEventListener('keydown', function(e) {
               e.preventDefault();
               myGameArea.keys = (myGameArea.keys || []);
               myGameArea.keys[e.keyCode] = (e.type == "keydown");
           })
           window.addEventListener('keyup', function(e) {
               myGameArea.keys[e.keyCode] = (e.type == "keydown");
           })
       },


       clear: function() {
           this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
           myGameArea.context.drawImage(background_img, 0, 0, screenWidth, screenHeight);
       },
       stop: function() {
           clearInterval(this.interval);
           gameInProgress = false;
       },


   }


   function updater() {
       if (gameInProgress == true) {
           time++;
           if (gameMode == "two") {
               if (time % 24 == 0) {
                   this.updateGameModeTwo();
               }
           } else {
               this.updateGameModeOne();
           }
       }
   }

   function updateGameModeOne() {
       var currentBlockNumber = blocks.length;
       var maxBlockNumber = 20;
       var minBlockNumber = 10;
       if (time % 4 == 0) {
           if (currentBlockNumber < maxBlockNumber && currentBlockNumber > minBlockNumber) {
               newBlockID = Math.floor(Math.random() * brokenBlocks.length);
               //    console.log("broken length - " + brokenBlocks.length);
               //    console.log("ID - " + newBlockID + "    " + " brokenBlocks[newBlockID] " + "  " + brokenBlocks[newBlockID]);
               newBlockX = brokenBlocks[newBlockID]["x"];
               newBlockY = brokenBlocks[newBlockID]["y"];
               blocks.push(new component(50, 20, "block2.png", newBlockX, newBlockY));
               //    console.log("ID - " + newBlockID + " " + newBlockX + " " + newBlockY);
           }
       }
   }


   function updateGameModeTwo() {
       for (i = 0; i < blocks.length; i++) {
           blocks[i].y += 25;
       }

       for (idx = 0; idx < 10; idx++) {
           for (idy = 1; idy <= 3; idy++) {
               if (Math.floor(Math.random() * 100) % 5) {
                   blocks.push(new component(50, 20, "block1.png", 24 + (idx * 55), (25 + (idy * 25)), "A"));
               } else {
                   blocks.push(new component(50, 20, "block2.png", 24 + (idx * 55), (25 + (idy * 25)), "B"));

               }
           }

       }
   }


   function component(width, height, texture, x, y, type) {
       this.width = width;
       this.height = height;
       this.speedX = 0;
       this.speedY = 0;
       this.x = x;
       this.y = y;
       this.image = new Image();
       this.image.src = texture;
       this.type = type;
       this.update = function() {
           ctx = myGameArea.context;
           ctx.save();
           //    ctx.fillStyle = color;
           ctx.fillRect(this.x, this.y, this.width, this.height);
           ctx.restore();
           ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
       }
       this.newPos = function() {
           this.x += this.speedX;
           this.y += this.speedY;
       }

       this.destroy = function() {
           ctx = myGameArea.context;
           ctx.clearRect(this.x, this.y, this.width, this.height);
           // this.x = -100;
           // this.y = -100;
       }


       this.toggleLeftPlatform = function() {
           if (leftplatformenabled) {
               this.x = -30;
               leftplatformenabled = false;

           } else {
               this.x = 0;
               leftplatformenabled = true;
           }
       }
   }



   function updateGameArea() {
       var x, height, gap, minHeight, maxHeight, minGap, maxGap;

       for (let myBall of balls) {
           if (myBall.crashWithFloor(myGameArea)) {
               if (balls.length > 1) {
                   index = balls.indexOf(myBall);
                   balls.splice(index, 1);

               } else {
                   myGameArea.stop();
               }
           }
           if (myBall.crashWithBounds(myGamePiece, myGamePiece2) == 1) {
               myBall.speedY *= -1;
           }
           if (myBall.crashWithBounds(myGamePiece, myGamePiece2) == 2) {
               myBall.speedX *= -1;
           }

       }

       if (brokenBlocksB == 5) {
           brokenBlocksB = 0;
           balls.push(new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), 1, 1, "ball.png", 16));
       }

       if (balls.length > 1) {
           for (let firstBall of balls) {
               for (let secondBall of balls) {
                   if (secondBall != firstBall) {
                       firstBall.collisionWithBall(secondBall);
                   }
               }
           }
       }

       myGameArea.clear();
       myGameArea.frameNo += 1;

       if (myGameArea.keys && myGameArea.keys[37]) {
           moveleft();
       }
       if (myGameArea.keys && myGameArea.keys[38]) {
           moveup();
       }
       if (myGameArea.keys && myGameArea.keys[39]) {
           moveright();
       }

       if (myGameArea.keys && myGameArea.keys[40]) {
           movedown();
       }


       myGamePiece.newPos();
       myGamePiece.update();
       myGamePiece2.newPos();
       myGamePiece2.update();
       for (let ball of balls) {
           ball.newPos();
           ball.update();
       }
       var newblocks = [];
       for (let block of blocks) {
           block.update();
           //    console.log("blocks - " + blocks.length + "  balls " + balls.length);
           var collision = false;
           for (let myBall of balls) {
               //    console.log("for myball of balls");
               if (myBall.collisionWithBlocks(block) == true) {
                   //    if ((balls[0].collisionWithBlocks(block) == true || balls[1].collisionWithBlocks(block))) {
                   //    if ((myBall.collisionWithBlocks(block) == true)|| (myGameBall2.collisionWithBlocks(block))) {
                   // continue;

                   brokenBlocks.push({
                       "x": block.x,
                       "y": block.y
                   });
                   points += 1;
                   collision = true;
                   if (block.type == "B") {
                       brokenBlocksB += 1;
                   }
               }

           }
           if (collision == false) {
               newblocks.push(block);
           }
       }

       blocks = newblocks;
       delete newblocks;
       context = myGameArea.context;
       context.font = "30px Noto Sans";
       context.color = "black";
       context.fillText("Score: " + points, screenWidth - 150, 30)

   }

   function everyinterval(n) {
       if ((myGameArea.frameNo / n) % 1 == 0) {
           return true;
       }
       return false;
   }

   function moveup() {
       if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("K")) {
           myGamePiece2.speedY = -5;
           myGamePiece2.newPos();
           clearmove();
       }
   }

   function movedown() {
       if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("J")) {
           myGamePiece2.speedY = 5;
           myGamePiece2.newPos();
           clearmove();
       }
   }

   function moveleft() {
       if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("H")) {
           myGamePiece.speedX = -5;
           myGamePiece.newPos();
           clearmove();
       }
   }

   function moveright() {

       if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("L")) {
           myGamePiece.speedX = 5;
           myGamePiece.newPos();
           clearmove();
       }
   }

   function clearmove() {
       myGamePiece.speedX = 0;
       myGamePiece.speedY = 0;
       myGamePiece2.speedX = 0;
       myGamePiece2.speedY = 0;
   }