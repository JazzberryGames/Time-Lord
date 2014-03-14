function Tile(position, color, imageUrl, solid, width, height, zIndex) {
    this.position = (position)?position:null;
    this.color = (color)?color:null;
    this.imageUrl = (imageUrl)?imageUrl:null;
    this.solid = (solid)?solid:false;
    this.zIndex = (zIndex)?zIndex:1;
    this.width = width;
    this.height= height;

    this.update = function() {
        noOperation();
    }

    this.onCollision = function(gameObject,collision) {
        if (this.imageUrl == 'http://i.imgur.com/m75LYGt.png') { // HOURGLASS
            $NEXT_WORLD();
        }
        if (this.imageUrl == 'http://i.imgur.com/jri6XZN.png') { // cron
            this.solid = false; 
            this.draw = function() {}
            $TIMER.startTime += 3000;
        }
        if (this.imageUrl == 'http://i.imgur.com/Ch3l2gO.png') { // arrow
            this.solid = false;
            this.draw = function() {}
            $ARROW = !$ARROW;
        }
        if (this.imageUrl == 'http://i.imgur.com/VJ92Wd0.png') { // redthing
            $GAMEOVER();
        }
    }

    this.draw = function(context,width,height) {
        if (this.imageUrl !== null) {
            this.drawUsingImage(context,width,height);
        } else if(this.color !== null) {
            this.drawUsingColor(context,width,height);
        } else {
            console.log("Whoops! Could not draw tile...",tile);
        }
    }

    this.drawUsingImage = function(context,width,height) {
        var startX = this.position.x * width;
        var startY = this.position.y * height;
        try {
            context.drawImage(this.image,startY,startX,width,height);
        } catch(e) {
            this.image = document.createElement('img');
            var image = this.image;
            this.image.onload = function() {
                context.drawImage(image,startY,startX,width,height);
            }
            this.image.src = this.imageUrl;
        }
    }

    this.drawUsingColor = function(context,width,height) {
        var startX = this.position.x * width;
        var startY = this.position.y * height;
        context.fillStyle = this.color;
        context.fillRect(startY,startX,width,height);
    }

    this.drawExtension = function() {
        noOperation();
    }

    this.isSolid = function() {
        return this.solid;
    }

    var positionVector = this.position.multiply(this.width);
    this.upperLeftCorner = positionVector;
    this.upperRightCorner = positionVector.add(new Vector(0,this.height));
    this.lowerLeftCorner = positionVector.add(new Vector(this.height,0));
    this.lowerRightCorner = positionVector.add(new Vector(this.width,this.height));
}
