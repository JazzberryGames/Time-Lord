function Timer(time,environment) {
    this.totalTime = time;
    this.time = time; //ms
    this.startTime = new Date().getTime();
    this.firstRun = true;

    this.update = function() {
        if (this.firstRun) {
            this.startTime = new Date().getTime();
            this.firstRun = false;
        }
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - this.startTime;
        this.time = this.totalTime - elapsedTime;
        if (this.time <= 0) {
            this.time = 0;
            $GAMEOVER(this);
        }
    }

    this.draw = function() {
        if (this.domObject == undefined) {
            this.setDomObject();
        }
        this.domObject.innerText = this.timeToInnerText(this.time);
    }

    this.setDomObject = function() { 
        var domObject = document.getElementById('zac_timer');
        if (domObject !== null) {
            this.domObject = domObject;
        } else {
            this.createDomObject();
        }
    }

    this.createDomObject = function() {
        var domObject = document.createElement('h2');
        domObject.style.fontSize = "45px";
        domObject.style.position = 'absolute';
        domObject.style.margin = 'auto';
        domObject.style.top = "0";
        domObject.style.left = "0";
        domObject.style.right = "0";
        domObject.style.bottom = "400px";
        domObject.style.height = "20px";
        domObject.style.width = "100%";
        domObject.style.textAlign = "center";
        domObject.id = "zac_timer";
        domObject.innerText = this.timeToInnerText(time);
        domObject.style.color = "white";
        this.domObject = domObject;
        document.body.appendChild(this.domObject);
    }

    this.timeToInnerText = function(time) {
        var timeString = time + "";
        if (timeString.length == 5) {
            return timeString.substr(0,2) + "." + timeString.substr(2);
        } else if (timeString.length == 4) {
            return timeString.substr(0,1) + "." + timeString.substr(1);
        } else {
            return timeString;
        }
    }
}
