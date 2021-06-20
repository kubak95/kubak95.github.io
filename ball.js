class ball {
    constructor(x, y, speedX, speedY, texture, size) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
        // this.color = color;
        this.image = new Image();
        this.image.src = texture;
        this.copies = [];
    }
    update = function() {

        ctx = myGameArea.context;
        ctx.save();
        // ctx.globalAlpha = 0.1;

        ctx = myGameArea.context;

        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.restore();

    }

    newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    crashWithFloor = function(myGameArea) {
        var myCenterX = this.x;
        var myCenterY = this.y;
        var myleft = myCenterX - (this.size);
        var myright = myCenterX + (this.size);
        var mytop = myCenterY - (this.size);
        var mybottom = myCenterY + (this.size);
        var crash = true;
        if ((mybottom < myGameArea.canvas.height - 5) && (myleft > 5)) {
            crash = false;
        }
        return crash;
    }
    crashWithBounds = function(myGamePiece, myGamePiece2) {
        var myCenterX = this.x;
        var myCenterY = this.y;
        var myleft = myCenterX - (this.size);
        var myright = myCenterX + (this.size);
        var mytop = myCenterY - (this.size);
        var mybottom = myCenterY + (this.size);

        var botplatformleft = myGamePiece.x;
        var botplatformright = myGamePiece.x + (myGamePiece.width);
        var botplatformtop = myGamePiece.y;
        var botplatformbottom = myGamePiece.y + (myGamePiece.height);
        var botplatform10p = myGamePiece.width * 0.1;
        var botplatform30p = myGamePiece.width * 0.3;
        var botplatform40p = myGamePiece.width * 0.4;
        var botplatform60p = myGamePiece.width * 0.6;



        var leftplatformleft = myGamePiece2.x;
        var leftplatformright = myGamePiece2.x + (myGamePiece2.width);
        var leftplatformtop = myGamePiece2.y;
        var leftplatformbottom = myGamePiece2.y + (myGamePiece2.height);
        var leftplatform10p = myGamePiece2.height * 0.1;
        var leftplatform30p = myGamePiece2.height * 0.3;
        var leftplatform40p = myGamePiece2.height * 0.4;
        var leftplatform60p = myGamePiece2.height * 0.6;


        var verticalWall10p = screenHeight * 0.1;
        var verticalWall30p = screenHeight * 0.3;
        var verticalWall40p = screenHeight * 0.4;
        var verticalWall60p = screenHeight * 0.6;

        var horizontalWall10p = screenWidth * 0.1;
        var horizontalWall30p = screenWidth * 0.3;
        var horizontalWall40p = screenWidth * 0.4;
        var horizontalWall60p = screenWidth * 0.6;


        var angleChange = 0;

        // For case if there is just bottom platform

        // if ((myleft <= 0) || (myright >= screenWidth)) {
        //     angleChange = 2;
        // }

        // For case if there are 2 platforms

        if (mybottom > botplatformtop && myleft >= botplatformleft && myright <= botplatformright) {
            angleChange = 1;
            this.y -= 2;

        }
        if (mytop <= 0) {
            angleChange = 1;
        }


        if (myright >= screenWidth) {
            angleChange = 2;
        }
        if (myleft < leftplatformright && mybottom <= leftplatformbottom && mytop >= leftplatformtop) {
            this.x += 2;
            // angleChange = 2;
            this.speedX = Math.abs(this.speedX);
        }



        if (myCenterX < botplatformleft + botplatform10p && myCenterX > botplatformleft && mybottom > botplatformtop || myCenterX > botplatformright - botplatform10p && myCenterX < botplatformright && mybottom > botplatformtop) {
            if (this.speedX < 0) {
                this.speedX = -3;
            } else {
                this.speedX = 3;
            }
            angleChange = 1;
        }


        if (myCenterX > botplatformleft + botplatform10p && myCenterX < botplatformleft + botplatform30p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform10p && myCenterX > botplatformright - botplatform30p && mybottom > botplatformtop) {
            if (this.speedX < 0) {
                this.speedX = -2;
            } else {
                this.speedX = 2;
            }
            angleChange = 1;
        }
        if (myCenterX > botplatformleft + botplatform30p && myCenterX < botplatformleft + botplatform40p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform30p && myCenterX > botplatformright - botplatform40p && mybottom > botplatformtop) {
            if (this.speedX < 0) {
                this.speedX = -1.5;
            } else {
                this.speedX = 1.5;
            }
            angleChange = 1;
        }

        if (myCenterX > botplatformleft + botplatform40p && myCenterX < botplatformleft + botplatform60p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform40p && myCenterX > botplatformright - botplatform60p && mybottom > botplatformtop) {
            if (this.speedX < 0) {
                this.speedX = -1;
            } else {
                this.speedX = 1;
            }
            angleChange = 1;
        }

        if (myCenterY > leftplatformbottom - leftplatform10p && myCenterY < leftplatformbottom && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform10p && myCenterY > leftplatformtop && myleft < leftplatformright) {
            if (this.speedY < 0) {
                this.speedY = -3;
            } else {
                this.speedY = 3;
            }
            angleChange = 2;
        }

        if (myCenterY < leftplatformbottom - leftplatform30p && myCenterY > leftplatformbottom - leftplatform10p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform30p && myCenterY > leftplatformtop + leftplatform10p && myleft < leftplatformright) {
            if (this.speedY < 0) {
                this.speedY = -2;
            } else {
                this.speedY = 2;
            }
            angleChange = 2;
        }

        if (myCenterY < leftplatformbottom - leftplatform40p && myCenterY > leftplatformbottom - leftplatform30p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform40p && myCenterY > leftplatformtop + leftplatform30p && myleft < leftplatformright) {
            if (this.speedY < 0) {
                this.speedY = -1.5;
            } else {
                this.speedY = 1.5;
            }
            angleChange = 2;
        }
        if (myCenterY < leftplatformbottom - leftplatform60p && myCenterY > leftplatformbottom - leftplatform40p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform60p && myCenterY > leftplatformtop - leftplatform40p && myleft < leftplatformright) {
            if (this.speedY < 0) {
                this.speedY = -1;
            } else {
                this.speedY = 1;
            }
            angleChange = 2;
        }

        //walls

        if (myCenterX < 0 + horizontalWall10p && myCenterX > 0 && mytop < 2 || myCenterX > screenWidth - horizontalWall10p && myCenterX < screenWidth && mytop < 2) {
            if (this.speedX < 0) {
                this.speedX = -3;
            } else {
                this.speedX = 3;
            }
            angleChange = 1;
        }


        if (myCenterX > 0 + horizontalWall10p && myCenterX > horizontalWall10p + horizontalWall30p && mytop < 2 || myCenterX < screenWidth - horizontalWall10p && myCenterX > screenWidth - horizontalWall30p && mytop < 2) {
            if (this.speedX < 0) {
                this.speedX = -2;
            } else {
                this.speedX = 2;
            }
            angleChange = 1;
        }
        if (myCenterX > 0 + horizontalWall30p && myCenterX > 0 + horizontalWall40p && mytop < 2 || myCenterX < screenWidth - horizontalWall30p && myCenterX > screenWidth - horizontalWall40p && mytop < 2) {
            if (this.speedX < 0) {
                this.speedX = -1.5;
            } else {
                this.speedX = 1.5;
            }
            angleChange = 1;
        }

        if (myCenterX > 0 + horizontalWall40p && myCenterX < 0 + horizontalWall60p && mytop < 2 || myCenterX < screenWidth - horizontalWall40p && myCenterX > screenWidth - horizontalWall60p && mytop < 2) {
            if (this.speedX < 0) {
                this.speedX = -1;
            } else {
                this.speedX = 1;
            }
            angleChange = 1;
        }



        if (myCenterY > screenHeight - verticalWall10p && myCenterY < screenHeight && myleft < 2 || myCenterY < 0 + verticalWall10p && myCenterY > 0 && myleft < 2 || myCenterY > screenHeight - verticalWall10p && myCenterY < screenHeight && myright > screenWidth - 2 || myCenterY < 0 + verticalWall10p && myCenterY > 0 && myright > screenWidth - 2) {
            if (this.speedY < 0) {
                this.speedY = -3;
            } else {
                this.speedY = 3;
            }
            angleChange = 2;
        }

        if (myCenterY < screenHeight - verticalWall30p && myCenterY > screenHeight - verticalWall10p && myleft < 2 || myCenterY < 0 + verticalWall30p && myCenterY > 0 + verticalWall10p && myleft < 2 || myCenterY < screenHeight - verticalWall30p && myCenterY > screenHeight - verticalWall10p && myright > screenWidth - 2 || myCenterY < 0 + verticalWall30p && myCenterY > 0 + verticalWall10p && myright > screenWidth - 2) {
            if (this.speedY < 0) {
                this.speedY = -2;
            } else {
                this.speedY = 2;
            }
            angleChange = 2;
        }

        if (myCenterY < screenHeight - verticalWall40p && myCenterY > screenHeight - verticalWall30p && myleft < 2 || myCenterY < 0 + verticalWall40p && myCenterY > 0 + verticalWall30p && myleft < 2 || myCenterY < screenHeight - verticalWall40p && myCenterY > screenHeight - verticalWall30p && myright > screenWidth - 2 || myCenterY < 0 + verticalWall40p && myCenterY > 0 + verticalWall30p && myright > screenWidth - 2) {
            if (this.speedY < 0) {
                this.speedY = -1.5;
            } else {
                this.speedY = 1.5;
            }
            angleChange = 2;
        }
        if (myCenterY < screenHeight - verticalWall60p && myCenterY > screenHeight - verticalWall40p && myleft < 2 || myCenterY < 0 + verticalWall60p && myCenterY > 0 - verticalWall40p && myleft < 2 || myCenterY < screenHeight - verticalWall60p && myCenterY > screenHeight - verticalWall40p && myright > screenHeight - 2 || myCenterY < 0 + verticalWall60p && myCenterY > 0 - verticalWall40p && myright > screenWidth - 2) {
            if (this.speedY < 0) {
                this.speedY = -1;
            } else {
                this.speedY = 1;
            }
            angleChange = 2;
        }

        return angleChange;
    }

    collisionWithBlocks = function(block) {
        var myCenterX = this.x;
        var myCenterY = this.y;
        var myleft = myCenterX - (this.size);
        var myright = myCenterX + (this.size);
        var mytop = myCenterY - (this.size);
        var mybottom = myCenterY + (this.size);

        var blockleft = block.x;
        var blockright = block.x + (block.width);
        var blocktop = block.y;
        var blockbottom = block.y + (block.height);

        var collistion = false;


        var block10pX = block.width * 0.1;
        var block30pX = block.width * 0.3;
        var block40pX = block.width * 0.4;
        var block60pX = block.width * 0.6;

        var block10pY = block.height * 0.1;
        var block30pY = block.height * 0.3;
        var block40pY = block.height * 0.4;
        var block60pY = block.height * 0.6;


        if (myCenterX < blockleft + block10pX && myCenterX > blockleft && mybottom > blocktop && mytop < blockbottom || myCenterX > blockright - block10pX && myCenterX < blockright && mybottom > blocktop && mytop < blockbottom) {
            if (this.speedY < 0) {
                this.speedY = 3;
            } else {
                this.speedY = -3;
            }
        }

        if (myCenterX > blockleft + block10pX && myCenterX < blockleft + block30pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block10pX && myCenterX > blockright - block30pX && mybottom > blocktop && mytop < blockbottom) {
            if (this.speedY < 0) {
                this.speedY = 2;
            } else {
                this.speedY = -2;
            }
        }
        if (myCenterX > blockleft + block30pX && myCenterX < blockleft + block40pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block30pX && myCenterX > blockright - block40pX && mybottom > blocktop && mytop < blockbottom) {
            if (this.speedY < 0) {
                this.speedY = 1.5;
            } else {
                this.speedY = -1.5;
            }
        }

        if (myCenterX > blockleft + block40pX && myCenterX < blockleft + block60pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block40pX && myCenterX > blockright - block60pX && mybottom > blocktop && mytop < blockbottom) {
            if (this.speedY < 0) {
                this.speedY = 1;
            } else {
                this.speedY = -1;
            }
        }


        if (myCenterY > blockbottom - block10pY && myCenterY < blockbottom && myleft > blockright && myright < blockleft || myCenterY < blocktop + block10pY && myCenterY > blocktop && myleft > blockright && myright < blockleft) {
            if (this.speedX < 0) {
                this.speedX = 3;
            } else {
                this.speedX = -3;
            }
        }

        if (myCenterY < blockbottom - block30pY && myCenterY > blockbottom - block10pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block30pY && myCenterY > blocktop + block10pY && myleft > blockright && myright < blockleft) {
            if (this.speedX < 0) {
                this.speedX = 2;
            } else {
                this.speedX = -2;
            }
        }

        if (myCenterY < blockbottom - block40pY && myCenterY > blockbottom - block30pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block40pY && myCenterY > blocktop + block30pY && myleft > blockright && myright < blockleft) {
            if (this.speedX < 0) {
                this.speedX = 1.5;
            } else {
                this.speedX = -1.5;
            }
        }
        if (myCenterY < blockbottom - block60pY && myCenterY > blockbottom - block40pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block60pY && myCenterY > blocktop - block40pY && myleft > blockright && myright < blockleft) {
            if (this.speedX < 0) {
                this.speedX = 1.5;
            } else {
                this.speedX = -1.5;
            }
        }

        if (blockleft < myright && blockright > myleft && blockbottom > mytop && blocktop < mybottom) {
            collistion = true;
        }


        // if ((mybottom >= blocktop || myleft > blockleft || myright < blockright)) {
        //     collistion = true;
        // }


        return collistion;
    }


    collisionWithBall = function(anotherBall) {
        // console.log("wchodzi w kolizje");
        if ((this.x + this.size >= anotherBall.x - anotherBall.size && this.x - this.size <= anotherBall.x + anotherBall.size) && (this.y + this.size >= anotherBall.y && this.y - this.size <= anotherBall.y)) {
            // console.log("collision // time - " + time);
            this.speedX *= -1;
            this.speedY *= -1;
        }
        if ((this.y + this.size >= anotherBall.y - anotherBall.size && this.y - this.size <= anotherBall.y + anotherBall.size) && (this.x - this.size <= anotherBall.x && this.x + this.size >= anotherBall.x)) {
            // console.log("collision // time - " + time);
            this.speedX *= -1;
            this.speedY *= -1;
        }
    }

}