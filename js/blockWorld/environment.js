function Environment(blockWorld) {
    this.blockWorld = blockWorld;
    this.canvas = null;
    this.started = false;

    this.init = function() {
        this.canvas = this.createCanvas();
        this.setTick();
    }

    this.tick = function() {
        if (this.started) {
            this.update();
        }
        this.clear();
        this.draw();
        this.drawExtender();
    }

    this.setTick = function() {
        var environment = this;
        this.tickInterval = setInterval(function() {
            environment.tick();
        },10);
    }

    this.update = function() {
        this.updateTiles();
        this.updateObjects();
    }

    this.drawExtender = function() {
    }

    this.clear = function() {
        this.blockWorld.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    this.draw = function() {
        this.drawTiles();
        this.drawObjects();
    }

    this.updateTiles = function() {
        var tiles = this.blockWorld.tiles;
        for(var i=0;i<tiles.length;i++) {
            var tile = tiles[i];
            tile.update();
        }
    }

    this.updateObjects = function() {
        var gameObjects = this.blockWorld.gameObjects;
        for(var i=0;i<gameObjects.length;i++) {
            var gameObject = gameObjects[i];
            gameObject.update();
        }
    }

    this.drawObjects = function() {
        var gameObjects = this.blockWorld.gameObjects;
        for(var i=0;i<gameObjects.length;i++) {
            var gameObject = gameObjects[i];
            gameObject.draw(this.blockWorld.context);
        }
    }

    this.drawTiles = function() {
        var tiles = this.blockWorld.tiles;
        for(var i=0;i<tiles.length;i++) {
            var tile = tiles[i];
            tile.draw(this.blockWorld.context,this.blockWorld.tileWidth,this.blockWorld.tileHeight);
        }
    }

    this.createCanvas = function() {
        return document.body.appendChild(this.blockWorld.getCanvas());
    }

    this.init();
}
