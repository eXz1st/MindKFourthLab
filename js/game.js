function Game() {
  var track1;
  var track2;

  this.getTrack1 = function() {
    return this.track1;
  }

  this.setTrack1 = function(track) {
     this.track1 = track;
  }

  this.getTrack2 = function() {
    return this.track2;
  }

  this.setTrack2 = function(track) {
     this.track2 = track;
  }
}

Game.CEIL_WIDTH = 55;
Game.TRACK_LENGTH = 20;
var firstTrackBarrier = [];
var secondTrackBarrier = [];

Game.prototype.init = function() {
  this.setTrack1(document.querySelector('.track.first'));
  this.setTrack2(document.querySelector('.track.second'));
  zaec = new Zaec();
  volk = new Volk();
  this.getTrack1().appendChild(zaec.init());
  this.getTrack2().appendChild(volk.init());
}

Game.prototype.generateBarrier = function(barrier, runner) {
  barrier[barrier.length - 1].setPosition(game.randomInteger(runner.getPosition() + 1, runner.getPosition() + runner.getSpeed()));
  barrier[barrier.length - 1].setAffect(game.randomInteger(-3,3));
  document.querySelector('.' + runner.getImage()).parentNode.appendChild(barrier[barrier.length - 1].init());
}

Game.prototype.showWinner = function(winnerCssSelector) {
  document.querySelector(winnerCssSelector).classList.remove('hidden');
  setTimeout(function() {
    document.querySelector(winnerCssSelector).classList.add('hidden')
  }, 3000);
}

Game.prototype.randomInteger = function(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  if(rand === 0) {
      rand = 1;
  }
  return rand;
}

Game.prototype.end = function(winnerCssSelector) {
  game.showWinner(winnerCssSelector);
  document.querySelector('#run').classList.add('hidden');
  document.querySelector('#restart').classList.remove('hidden');
  [].forEach.call(document.querySelectorAll('.on-track'),  function(item) { 
    item.classList.remove('hidden');
  });
}

Game.prototype.run = function() {
  document.querySelector('.stadium').setAttribute('finish', '1');
  if(zaec.getPosition() !==0 && zaec.getPosition() <= volk.getPosition()){
    game.end('.volkWin');
  } else if(zaec.getPosition() < Game.TRACK_LENGTH){
      
      firstTrackBarrier.push(new Barrier());
      secondTrackBarrier.push(new Barrier());

      game.generateBarrier(firstTrackBarrier, zaec);
      game.generateBarrier(secondTrackBarrier, volk);

      zaec.run();
      volk.run();

      zaec.setSpeed(Zaec.SPEED + firstTrackBarrier[firstTrackBarrier.length - 1].getAffect());
      volk.setSpeed(Volk.SPEED + secondTrackBarrier[secondTrackBarrier.length - 1].getAffect());
  } else {
    game.end('.zaecWin');
  }
}

Game.prototype.restart = function() {
  document.querySelector('#run').classList.remove('hidden');
  document.querySelector('#restart').classList.add('hidden'); 

  firstTrackBarrier.forEach(function(item) {
    item.destroy();
  });

  secondTrackBarrier.forEach(function(item) {
    item.destroy();
  });

  firstTrackBarrier = [];
  secondTrackBarrier = [];

  zaec.setPosition(0);
  zaec.setSpeed(5);

  volk.setPosition(0);
  volk.setSpeed(3);

  document.querySelector('.' + zaec.getImage()).style.left = Game.CEIL_WIDTH * zaec.getPosition() + 'px';
  document.querySelector('.' + volk.getImage()).style.left = Game.CEIL_WIDTH * volk.getPosition() + 'px'; 
}