function load() {
    setUpBlockWorld();
}

function setUpBlockWorld() {
    var height = 600;
    var width = 1200;
    var tileSize = 30;

    var blockWorld = new BlockWorld(width,height,tileSize,tileSize);
    var environment= new Environment(blockWorld);
    environment.drawExtender = function() {
        drawGrid(blockWorld);
    }
    drawGrid(blockWorld);
    setEventListeners(environment);
    setImportExportButtons(environment);
    setTileButtons(environment);
}

function setTileButtons(environment) {
    var tiles = 
    [
        new Tile(new Vector(0,0),'black','http://i.imgur.com/m5ECmVT.png',true,0,0,1), // grass / dirt
        new Tile(new Vector(0,0),'black','http://i.imgur.com/m75LYGt.png',true,0,0,1), // hourglass
        new Tile(new Vector(0,0),'black','http://i.imgur.com/jri6XZN.png',true,0,0,1),  // cron
        new Tile(new Vector(0,0),'black','http://i.imgur.com/Ch3l2gO.png',true,0,0,1),  // arrow
        new Tile(new Vector(0,0),'black','http://i.imgur.com/VJ92Wd0.png',true,0,0,1)  // redthing
    ];
    var tileDivs = [];
    for(var i=0;i<tiles.length;i++) {
        var tile = tiles[i];
        var tileDiv = document.createElement('img');
        tileDiv.width = '30px';
        tileDiv.height = '30px';
        tileDiv.style.width = '30px';
        tileDiv.style.height = '30px';
        tileDiv.style.cursor = 'pointer';
        tileDiv.tile = tile;
        tileDiv.onclick = function() {
            $TILE = this.tile;
        }
        tileDiv.src = tile.imageUrl;
        tileDivs.push(tileDiv);
    }
    var center = document.createElement('center');
    for (var i=0;i<tileDivs.length;i++) {
        center.appendChild(tileDivs[i]);
    }
    $TILE = tiles[0];
    document.body.appendChild(center);
}

function setImportExportButtons(environment) {
    var exportButton = document.createElement('input');
    exportButton.type = 'button';
    exportButton.value = "export";
    exportButton.onclick = function() {
        exportMap(environment);
    }

    var importButton = document.createElement('input');
    importButton.type = 'button';
    importButton.value = 'import';
    importButton.onclick = function() {
        importMap(environment);
    }

    var center = document.createElement('center');
    center.appendChild(exportButton);
    center.appendChild(importButton);

    document.body.appendChild(center);
}

function exportMap(environment) {
    var tiles = environment.blockWorld.tiles;
    for(var i=0;i<tiles.length;i++) {
        var tile = tiles[i];
        tile.image = undefined;
    }
    var tilesJSON = escape(JSON.stringify(tiles));
    console.log(tilesJSON);
}

function importMap(environment) {
    var map = prompt("Paste Map Here:");
    var tiles = JSON.parse(unescape(map));
    var workingTiles = [];
    for (var i=0;i<tiles.length;i++) {
        var tile = tiles[i];
        var workingTile = new Tile(new Vector(tile.position.x,tile.position.y),tile.color,tile.imageUrl,tile.solid,environment.blockWorld.tileWidth,environment.blockWorld.tileHeight,tile.zIndex);
        workingTiles.push(workingTile);
    }
    environment.blockWorld.tiles = workingTiles;
}

function setEventListeners(environment) {
    var canvas = environment.canvas;
    canvas.addEventListener('click',function(event) {
        var mousePosition = getMousePosition(canvas,event);
        var mousePositionVector = new Vector(mousePosition.x,mousePosition.y);
        click(mousePositionVector,environment);
    });
}


function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function click(position,environment) {
    var tilePosition = getTilePosition(position,environment);
    toggleTile(new Tile(tilePosition,$TILE.color,$TILE.imageUrl,$TILE.solid,environment.blockWorld.tileWidth,environment.blockWorld.tileHeight,$TILE.zIndex),environment,tilePosition);
}

function toggleTile(tile,environment,tilePosition) {
    if (tileExists(tile,environment)) {
        removeTile(tile,environment);
    } else {
        addTile(tile,environment);
    }
}

function tileExists(tile,environment) {
    var tiles = environment.blockWorld.tiles;
    for (var i=0;i<tiles.length;i++) {
        var tile2 = tiles[i];
        if (tile2.position.equals(tile.position)) {
            return true;
        }
    }
    return false;
}

function addTile(tile,environment) {
    environment.blockWorld.tiles.push(tile);
}

function removeTile(tile,environment) {
    var tiles = environment.blockWorld.tiles;
    for (var i=0;i<tiles.length;i++) {
        var tile2 = tiles[i];
        if (tile2.position.equals(tile.position)) {
            environment.blockWorld.tiles.splice(i,1);
        }
    }
    return false;
}

function getTilePosition(mousePosition, environment) {
    var yTilePosition = Math.floor(mousePosition.x / environment.blockWorld.tileWidth);
    var xTilePosition = Math.floor(mousePosition.y / environment.blockWorld.tileHeight);
    var tilePosition = new Vector(xTilePosition,yTilePosition);
    return tilePosition;
}

function drawGrid(blockWorld) {
    drawVerticalLines(blockWorld);
    drawHorizontalLines(blockWorld);
}

function drawVerticalLines(blockWorld) {
    var start = 0;
    var end = blockWorld.width;
    var context = blockWorld.context;
    var height = blockWorld.height;
    for (var i=start;i<end;i=i+blockWorld.tileWidth) {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
    }
}

function drawHorizontalLines(blockWorld) {
    var start = 0;
    var end = blockWorld.height;
    var context = blockWorld.context;
    var width = blockWorld.width;
    for (var i=start;i<end;i=i+blockWorld.tileWidth) {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.stroke();
    }
}
