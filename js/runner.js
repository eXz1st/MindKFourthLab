function Runner() {
  var speed;
  var position;
  var image;

  this.getSpeed = function() {
    return this.speed;
  }

  this.setSpeed = function(speed) {
    if(speed >= 0) {
      this.speed = speed;
    }        
  }

  this.getPosition = function() {
    return this.position;
  }

  this.setPosition = function(position) {
    this.position = position;
  }

  this.getImage = function() {
    return this.image;
  }

  this.setImage = function(image) {
    this.image = image;
  }
}

Runner.prototype.init = function() {
  var player = document.querySelector('.player').cloneNode(true);
  player.classList.add(this.getImage());
  player.classList.remove('hidden');
  return player;
}

Runner.prototype.run = function() {
  if(this.getPosition() + this.getSpeed() >= Game.TRACK_LENGTH) {
    this.setPosition(Game.TRACK_LENGTH);
  } else {
    this.setPosition(this.getPosition() + this.getSpeed());
  }    
  document.querySelector('.' + this.getImage()).style.left = Game.CEIL_WIDTH * this.getPosition() + 'px';
}

