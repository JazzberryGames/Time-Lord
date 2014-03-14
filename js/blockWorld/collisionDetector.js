function CollisionDetector() {
    this.detectCollision = function(activeObject,passiveObject) {
        var collision = 
        {
            'downward' : false,
            'upward' : false,
            'rightward' : false,
            'leftward' : false,
        };
        if (activeObject.velocity.y > 0) {
            collision.downward = this.detectDownwardCollision(activeObject,passiveObject);
        }
        if (activeObject.velocity.y < 0) {
            collision.upward = this.detectUpwardCollision(activeObject,passiveObject);
        }
        if (activeObject.velocity.x > 0 || activeObject.controller.right) {
            collision.rightward = this.detectRightWardCollision(activeObject,passiveObject);
        }
        if (activeObject.velocity.x < 0 || activeObject.controller.left) {
            collision.leftward = this.detectLeftWardCollision(activeObject,passiveObject);
        }
        return collision;
    }

    this.detectDownwardCollision = function(activeObject, passiveObject) {
        if (activeObject.lowerRightCorner.y > passiveObject.upperRightCorner.x && activeObject.lowerRightCorner.y < passiveObject.lowerRightCorner.x) {
            if (activeObject.lowerRightCorner.x <= passiveObject.upperRightCorner.y && activeObject.lowerRightCorner.x >= passiveObject.upperLeftCorner.y) {
                return true;
            }
            if (activeObject.lowerLeftCorner.x  <= passiveObject.upperRightCorner.y && activeObject.lowerLeftCorner.x  >= passiveObject.upperLeftCorner.y) {
                return true;
            }
        }
        return false;
    }

    this.detectUpwardCollision = function(activeObject, passiveObject) {
        if (activeObject.upperRightCorner.y < passiveObject.lowerRightCorner.x && activeObject.lowerRightCorner.y > passiveObject.upperRightCorner.x) {
            if (activeObject.lowerRightCorner.x <= passiveObject.upperRightCorner.y && activeObject.lowerRightCorner.x >= passiveObject.upperLeftCorner.y) {
                return true;
            }
            if (activeObject.lowerLeftCorner.x  <= passiveObject.upperLeftCorner.y && activeObject.lowerLeftCorner.x  >= passiveObject.upperRightCorner.y) {
                return true;
            }
        }
        return false;
    }

    this.detectRightWardCollision = function(activeObject, passiveObject) {
        if (activeObject.lowerRightCorner.x >= passiveObject.lowerLeftCorner.y && activeObject.lowerRightCorner.x <= passiveObject.lowerRightCorner.y) {
            if (activeObject.upperRightCorner.y >= passiveObject.upperLeftCorner.x && activeObject.upperRightCorner.y <= passiveObject.lowerLeftCorner.x) {
                return true;
            }
            if (activeObject.lowerLeftCorner.y < passiveObject.lowerRightCorner.x && activeObject.lowerLeftCorner.y > passiveObject.upperRightCorner.x) {
                return true;
            }
        }
        return false;
    }

    this.detectLeftWardCollision = function(activeObject, passiveObject) {
        if (activeObject.lowerLeftCorner.x <= passiveObject.lowerRightCorner.y && activeObject.lowerLeftCorner.x >= passiveObject.lowerLeftCorner.y) {
            if (activeObject.upperRightCorner.y >= passiveObject.upperLeftCorner.x && activeObject.upperRightCorner.y <= passiveObject.lowerLeftCorner.x) {
                return true;
            }
            if (activeObject.lowerLeftCorner.y < passiveObject.lowerRightCorner.x && activeObject.lowerLeftCorner.y > passiveObject.upperRightCorner.x) {
                return true;
            }
        }
        return false;
    }
}
