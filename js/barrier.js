function Barrier() {
  var position;
  var affect;
  var image;

  this.getPosition = function() {
    return this.position;
  }

  this.setPosition = function(position) {
    this.position = position;
  }

  this.getAffect = function() {
    return this.affect;
  }

  this.setAffect = function(affect) {
    this.affect = affect;
  }

  this.getImage = function() {
    return this.image;
  }

  this.setImage = function(image) {
    this.image = image;
  }
}

Barrier.prototype.init = function() {
  var pos = 0;
  this.getPosition >= Game.TRACK_LENGTH ? pos = Game.TRACK_LENGTH : pos = this.getPosition();
  var image;
  this.affect > 0 ? image = 'yagoda' : image = 'kamen'; 
  this.setImage(image);
  var elem = document.querySelector('.' + image).cloneNode(true);
  document.querySelector('.' + image).parentElement.appendChild(elem);    
  elem.style.left = Game.CEIL_WIDTH * pos + 'px';
  elem.classList.add('on-track');
  elem.setAttribute('position', pos);
  return elem;
}

Barrier.prototype.destroy = function() {
  var elem = document.querySelector('.on-track.' + this.getImage());
  if(elem.getAttribute('position') == this.getPosition()) {
    elem.remove();
    delete this;
  }
}