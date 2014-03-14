function Player(position, environment) {
    inherit(new GameObject(position), this);
    this.previousPosition = position;
    this.position = position;
    this.environment = environment;

    // Physics Constants
    this.gravityConstant = 25;
    this.frameModifier = 0.05;
    this.speed = 1.5;
    this.jumpStrength = 75;
    this.jumpCounter = 0;

    this.velocity = new Vector(0,0);
    this.height = 30;
    this.width = 30;
    this.imageSource = "http://i.imgur.com/8xzSMrU.png";
    this.controller = $CONTROLLER;
    this.controller.player = this;

    this.update = function() {
        this.previousPosition = new Vector(this.position.x,this.position.y);
        this.gravity();
        if (this.controller.right) {
            this.position = this.position.add(new Vector(this.speed,0));
        } 
        else if (this.controller.left) {
            this.position = this.position.add(new Vector(-this.speed,0));
        }
        this.moveDueToVelocity();
        this.collisionDetection();
        this.checkArrow();
    }

    this.checkArrow = function() {
        if (this.position.y > this.environment.blockWorld.height) {
            if ($ARROW) {
                this.position.y = -this.environment.blockWorld.tileHeight;
            } else {
                $GAMEOVER();
            }
        }
    }

    this.gravity = function() {
        this.velocity.y += this.gravityConstant*this.frameModifier;
    }

    this.moveDueToVelocity = function(){ 
        this.position = this.position.add(this.velocity.multiply(this.frameModifier));
    }

    this.collisionDetection = function() {
        this.collisionWithTiles(); 
    }

    this.collisionWithTiles = function() {
        var tiles = this.environment.blockWorld.tiles;
        for (var i=0;i<tiles.length;i++) {
            var tile = tiles[i];
            if(tile.solid) {
                this.collisionWithTile(tile);
            }
        }
    }

    this.collisionWithTile = function(tile) {
        var collisionDetector = new CollisionDetector();
        this.updateCornerPositions();
        var collision = collisionDetector.detectCollision(this,tile);
        if (collision.downward ||
            collision.upward ||
            collision.rightward ||
            collision.leftward) {
            tile.onCollision(this,collision);
        }
        if (tile.imageUrl !== "http://i.imgur.com/m5ECmVT.png") {
            return;
        }
        if (collision.downward) {
            this.position.y = this.previousPosition.y;
            this.velocity.y = 0;
            this.jumpCounter = 0;
        }
        this.updateCornerPositions();
        var collision = collisionDetector.detectCollision(this,tile);
        if (collision.upward) {
            this.position.y = this.previousPosition.y;
            this.velocity.y = 0;
        }
        this.updateCornerPositions();
        var collision = collisionDetector.detectCollision(this,tile);
        if (collision.rightward) {
            this.position.x = this.previousPosition.x;
            this.velocity.x = 0;
        }
        this.updateCornerPositions();
        var collision = collisionDetector.detectCollision(this,tile);
        if (collision.leftward) {
            this.position.x = this.previousPosition.x;
            this.velocity.x = 0;
        }
    }

    this.draw = function(context) {
        var player = this;
        if (this.image !== undefined) {
            context.drawImage(this.image,player.position.x,player.position.y,player.width,player.height);
        } else {
            this.image = document.createElement('img');
            var image = this.image;
            this.image.onload = function() {
                context.drawImage(image,player.position.x,player.position.y,player.width,player.height);
            }   
            this.image.src = this.imageSource;
        }   
    } 

    this.jump = function() {
        if (this.jumpCounter == 0) {
            this.velocity.y -= this.jumpStrength;
        }
        this.jumpCounter++;
    }

    this.updateCornerPositions = function() {
        var positionVector = this.position;
        this.upperLeftCorner = positionVector;
        this.upperRightCorner = positionVector.add(new Vector(this.width,0));
        this.lowerLeftCorner = positionVector.add(new Vector(0,this.height));
        this.lowerRightCorner = positionVector.add(new Vector(this.width,this.height));
    }

}
