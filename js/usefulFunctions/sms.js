function Sms() {
    
    this.title = "World 1";
    this.message = "Arrow keys to move and jump. Get to the hourglass, you have 10 seconds.";

    this.update = function() {
        if (this.titleObject !== undefined) {
            this.titleObject.innerText = this.title;
        }
        if (this.messageObject !== undefined) {
            this.messageObject.innerText = this.message;
        }
    }

    this.draw = function() {
        if (this.titleObject == undefined) {
            this.setTitleObject();
        }
        if (this.messageObject == undefined) {
            this.setMessageObject();
        }
    }

    this.setTitleObject = function() {
        var titleObject = document.getElementById('zac_title');
        if (titleObject !== null) {
            this.titleObject = titleObject;
        } else {
            this.createTitleObject();
        }
    }

    this.createTitleObject = function() {
        var titleObject = document.createElement('h2');
        titleObject.style.fontSize = "40px";
        titleObject.style.position = 'absolute';
        titleObject.style.margin = 'auto';
        titleObject.style.top = "0";
        titleObject.style.left = "0";
        titleObject.style.right = "0";
        titleObject.style.bottom = "575px";
        titleObject.style.height = "20px";
        titleObject.style.width = "100%";
        titleObject.style.textAlign = "center";
        titleObject.id = "zac_title";
        titleObject.innerText = this.title;
        titleObject.style.color = "white";
        this.titleObject = titleObject;
        document.body.appendChild(this.titleObject);
    }

    this.setMessageObject = function() {
        var messageObject = document.getElementById('zac_message');
        if (messageObject !== null) {
            this.messageObject = messageObject;
        } else {
            this.createMessageObject();
        }
    }

    this.createMessageObject = function() {
        var messageObject = document.createElement('h2');
        messageObject.style.fontSize = "20px";
        messageObject.style.position = 'absolute';
        messageObject.style.margin = 'auto';
        messageObject.style.top = "0";
        messageObject.style.left = "0";
        messageObject.style.right = "0";
        messageObject.style.bottom = "460px";
        messageObject.style.height = "20px";
        messageObject.style.width = "100%";
        messageObject.style.textAlign = "center";
        messageObject.id = "zac_message";
        messageObject.innerText = this.message;
        messageObject.style.color = "#eae68b";
        messageObject.style.textShadow = "0 0 10px grey";
        this.messageObject = messageObject;
        document.body.appendChild(this.messageObject);
    }

    this.setTitle = function(title) {
        this.title = title;
    }

    this.setMessage = function(message) {
        this.message = message;
    }

}
