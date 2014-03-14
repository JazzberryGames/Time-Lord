function Controller(player) {
    this.player = player;
    this.left = false;
    this.right = false;
    this.stale = false;
    
    this.init = function() {
        this.setEventListeners();
    }

    this.setEventListeners = function () {
        var controller = this;
        document.body.addEventListener('keydown',
            function(event) {
                if (controller.stale) {
                    return;
                }
                if (event.keyCode == 37 || event.keyCode == 65) {
                    controller.left = true;
                    controller.right = false;
                    controller.player.environment.started = true;
                } else if (event.keyCode == 39 || event.keyCode == 68) {
                    controller.right = true;
                    controller.left = false;
                    controller.player.environment.started = true;
                } else if (event.keyCode == 38 || event.keyCode == 87) {
                    controller.player.jump();
                    controller.player.environment.started = true;
                }
        });
        document.body.addEventListener('keyup',
            function(event) {
                controller.stale = false;
                if (event.keyCode == 37 || event.keyCode == 65) {
                    controller.left = false;
                } else if (event.keyCode == 39 || event.keyCode == 68) {
                    controller.right = false;
                }
        });
    }

    this.init(); 

}
