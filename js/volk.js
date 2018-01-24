function Volk() {
  Runner.call(this);

  this.setImage('volk');
  this.setSpeed(Volk.SPEED);
  this.setPosition(0);
}

Volk.SPEED = 3;

Volk.prototype = Object.create(Runner.prototype);

Volk.prototype.constructor = Volk;