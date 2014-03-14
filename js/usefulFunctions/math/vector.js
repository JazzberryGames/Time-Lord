function Vector(x,y) {
    this.x = x;
    this.y = y;

    this.multiply = function(factor) {
        return new Vector(this.x*factor,this.y*factor); 
    }

    this.add = function(vector) {
        return new Vector(this.x+vector.x,this.y+vector.y);
    }

    this.subtract = function(vector) {
        return new Vector(this.x-vector.x,this.y-vector.y);
    }

    this.reverse = function() {
        return new Vector(-this.x,-this.y);
    }

    this.sqrt = function(x) {
        return Math.sqrt(x);
    }

    this.length = function() {
        return this.sqrt
    }

    this.unit = function() {
        var length = this.length();
        return new Vector(this.x/length,this.y/length);
    }

    this.scale = function(length) {
        var unit = this.unit();
        return new Vector(unit.x*length,unit.y*length);
    }

    this.equals = function(vector) {
        return (this.x == vector.x && this.y == vector.y);
    }

    this.compareTo = function(vector) {
        return this.length()-vector.length();
    }

    this.toArray = function() {
        return [this.x,this.y];
    }

    this.toString = function() {
        return '(' + this.x + ',' + this.y + ')';
    }
}
