function Zaec() {
  Runner.call(this);
    
  this.setImage('zaec');
  this.setSpeed(Zaec.SPEED);
  this.setPosition(0);
}

Zaec.SPEED = 5;

Zaec.prototype = Object.create(Runner.prototype);

Zaec.prototype.constructor = Zaec;

