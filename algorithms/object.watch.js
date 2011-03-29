/*
* object.watch v0.0.1: Cross-browser object.watch
*
* By Elijah Grey, http://eligrey.com
*
* A shim that partially implements object.watch and object.unwatch
* in browsers that have accessor support.
*
* Public Domain.
* NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

// object.watch
console.log(1)
if (!Node.prototype.watch)
	console.log(2)
    Node.prototype.watch = function(prop, handler) {
	console.log(3)
        var oldval = this[prop]
	var newval = oldval
        var getter = function () {
            return newval;
        }
        var setter = function (val) {
            oldval = newval;
            return newval = handler.call(this, prop, oldval, val);
        }

        if (delete this[prop]) { // can't watch constants
            if (Node.defineProperty) // ECMAScript 5
                Node.defineProperty(this, prop, {
                    get: getter,
                    set: setter
                });
            else if (Node.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
                Node.prototype.__defineGetter__.call(this, prop, getter);
                Node.prototype.__defineSetter__.call(this, prop, setter);
            }
        }
    };

// object.unwatch
if (!Node.prototype.unwatch)
    Node.prototype.unwatch = function (prop) {
        var val = this[prop];
        delete this[prop]; // remove accessors
        this[prop] = val;
    };
