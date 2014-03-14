function BlockWorld(width,height,tileWidth,tileHeight) {
    this.width = width;
    this.height= height;
    this.tileWidth = tileWidth;
    this.tileHeight= tileHeight;
    this.background = 'http://i.imgur.com/cFhGA14.jpg';

    this.tiles = [];
    this.gameObjects = [];
    this.gameState = {};

    this.canvas = document.createElement('canvas');
    this.context = null;

    this.init = function() {
        this.canvas.width = this.width;
        this.canvas.height= this.height;
        this.canvas.style.margin = "auto";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.bottom = "0";
        this.canvas.style.left = "0";
        this.canvas.style.right = "0";
        this.canvas.style.borderStyle = "solid";
        this.canvas.style.borderColor = "black";
        this.canvas.style.background = "url('" + this.background + "')";
        this.context = this.canvas.getContext('2d');
        
        var center = document.createElement('center');
        var sms = document.createElement('span');
        sms.style.color = "white";
        sms.style.fontSize = "25px"
    }

    this.exportData = function() {
        alert("export data");
    }

    this.getCanvas = function() {
        return this.canvas;
    }

    this.init();
}
