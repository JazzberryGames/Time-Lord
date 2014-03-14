function load() {
    setUpBlockWorld();
    if (isMobile()) {
        document.body.style.webkitUserSelect = 'none';
        document.body.style.userSelect = 'none';
    }
}

function setUpBlockWorld() {
    var height = 600;
    var width = 1200;
    var tileSize = 30;

    var blockWorld = new BlockWorld(width,height,tileSize,tileSize);
    var environment= new Environment(blockWorld);
    $ENVIRONMENT = environment;
    $CONTROLLER = {};
    $CONTROLLER = new Controller(new Player(new Vector(100,540),environment),environment);
    $SMS = new Sms();
    setWorld($WORLD1,environment);
    setWorldHandlerFunctions();
}

function setWorld(world,environment) {
    var height = 600;
    var width = 1200;
    var tileSize = 30;
    $ARROW = false;

    var blockWorld = new BlockWorld(width,height,tileSize,tileSize);
    environment.blockWorld.gameObjects = [];
    environment.started = false;
    importMap(environment,world);
    setPlayer(new Player(new Vector(100,540),environment),environment);
    var time = 10000;
    setTimer(time,environment);
    setSms("","",environment);
}


function setWorldHandlerFunctions() {
    $WORLD_TEXT =
    [
        {
            "title" : "World 1",
            "message" : "Arrow keys to move and jump. Get to the hourglass, you have 10 seconds."
        },
        {
            "title" : "World 2",
            "message" : "Jump by pressing the up arrow, pressing 'r' resets the level"
        },
        {
            "title" : "World 3",
            "message" : "Pro Tip: Stick to walls while moving vertically by holding right or left (this resets your jump, but you cannot jump while against a wall)"
        },
        {
            "title" : "World 4",
            "message" : "Clock Tokens will provide additional time"
        },
        {
            "title" : "World 5",
            "message" : "Jump for it! Also watch out for those red things"
        },
        {
            "title" : "World 6",
            "message" : "Careful :/"
        },
        {
            "title" : "World 7",
            "message" : "Only stick to the wall selectively"
        },
        {
            "title" : "World 8",
            "message" : "Presicion is everything, waste no time"
        },
        {
            "title" : "World 9",
            "message" : "Pro Tip: tap away from the wall while sticking to it and then jump"
        },
        {
            "title" : "World 10",
            "message" : "The last level, do you have what it takes?"
        }
    ];
    $WORLDS = [$WORLD1,$WORLD2,$WORLD3,$WORLD4,$WORLD5,$WORLD6,$WORLD7,$WORLD8,$WORLD9,$WORLD10];
    $CURRENT_WORLD = 0;
    $NEXT_WORLD = function() {
        if ($CURRENT_WORLD == 9) {
            $WIN();
            return;
        }
        if ($CONTROLLER.left || $CONTROLLER.right) {
            $CONTROLLER.stale = true;
        }
        $CURRENT_WORLD++;
        var text = $WORLD_TEXT[$CURRENT_WORLD];
        $SMS.setMessage(text.message);
        $SMS.setTitle(text.title);
        setWorld($WORLDS[$CURRENT_WORLD],$ENVIRONMENT);
    }
    $GAMEOVER = function(timer) {
        $CURRENT_WORLD--;
        $NEXT_WORLD();
    }
    document.body.addEventListener('keypress',
        function(event) {
            if (event.keyCode == 114) { //r
                $GAMEOVER();
            }
        }
    );
    $WIN = function() {
        clearInterval($ENVIRONMENT.tickInterval);
        $ENVIRONMENT.clear();
        $SMS.setTitle("You Win!");
        $SMS.setMessage("Congratulations :) - http://i.imgur.com/5fftdNz.png");
    }
}

function importMap(environment, map) {
    var tiles = JSON.parse(unescape(map));
    var workingTiles = []; 
    for (var i=0;i<tiles.length;i++) {
        var tile = tiles[i];
        var workingTile = new Tile(new Vector(tile.position.x,tile.position.y),tile.color,tile.imageUrl,tile.solid,environment.blockWorld.tileWidth,environment.blockWorld.tileHeight,tile.zIndex);
        workingTiles.push(workingTile);
    }   
    environment.blockWorld.tiles = workingTiles;
}

function setPlayer(player,environment) {
    environment.blockWorld.gameObjects.push(player);
}

function setTimer(time,environment) {
    var timer = new Timer(time,environment);
    $TIMER = timer;
    environment.blockWorld.gameObjects.push(timer);
}

function setSms(title, message, environment) {
    environment.blockWorld.gameObjects.push($SMS);
}
