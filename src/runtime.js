//'use strict';

/**
 * Stage
 */
  
Stage.container = '';

Stage.setContainer = function(container) {
  Stage.container = container;
}
  
Stage.startMainAnimationLoop = function() {
  mainAnimationLoop();
}

function Stage(side) {
  this.side = side;
  this.$_element = $("<div class='container_" + side + "'>\
                      <div class='bubble_" + side + "' id='chat_bubble'></div>\
                    </div>");
  this.$_element.appendTo(Stage.container);
  this.$bubble = this.$_element.find('div#chat_bubble');
  this.sprites = [];
}

Stage.prototype.triggerEvent = function(event) {
  this.$_element.trigger(event);
}

Stage.prototype.on = function(event, handler) {
  this.$_element.on(event, handler);
}

function _which(section) {
 return (typeof section != 'string'? '.message' : '.' + section);
}


/*  Because of CSS inheritance rules
    use classes and not IDs for the text slots
    otherwise can't override the font rules for text effects */
Stage.prototype.createBubble = function(layout) {
  var pattern =  "<table class='chat_text'>\
                    __ROW1__\
                    <tr><td class='message'></td></tr>\
                  </table>";
  switch(layout) {
    case 1: default:
      var html = pattern.replace(/__ROW1__/,"");
      break;
    case 2:
      var html = pattern.replace(/__ROW1__/, "<tr><td class='title'></td></tr>");
      break;
    case 3:
      var html = pattern.replace(/__ROW1__/,
                                 "<tr>\
                                    <td class='title' style='width:70%'></td>\
                                    <td rowspan=2 class='rightcol' style='width:30%'></td>\
                                  </tr>");
      break;
    case 4:
      var html = pattern.replace(/__ROW1__/,
                                "<tr>\
                                  <td rowspan=2 class='leftcol' style='width:25%'></td>\
                                  <td class='title' style='width:50%'></td>\
                                  <td rowspan=2 class='rightcol' style='width:25%'></td>\
                                </tr>");
      break;
  }
  this.$bubble.html(html);
}

Stage.prototype.setTextContent = function(content, section) {
  this.$bubble.find(_which(section)).text(content);
}

Stage.prototype.setHTMLContent = function(content, section) {
  this.$bubble.find(_which(section)).html(content);
}

Stage.prototype.setBackgroundColor = function(color, section) {
  if(section == undefined)
    this.$bubble.css('backgroundColor', color); // whole bubble by default
  else
    this.$bubble.find(_which(section)).css('backgroundColor', color);
}

Stage.prototype.setFont = function(font, section) {
  this.$bubble.find(_which(section)).css('fontFamily', font);
}

Stage.prototype.setFontSize = function(size /*in em*/, section) {
  size = (size < 0.1 ? 0.1 : size > 4.0 ? 4.0 : size);
  this.$bubble.find(_which(section)).css('fontSize', size + 'em' );
}

Stage.prototype.setTextColor = function(color, section) {
  this.$bubble.find(_which(section)).css('color', color);
}
  
Stage.TextEffects = ['fire', 'neon', 'typewriter'];

Stage.prototype.setTextEffect = function(effect, section, doneCallback) {
  if(effect == 'typewriter')
    this.setTypewriterEffect(section, 
                             // can be in spot 1 or 2 since section is optional
                             (typeof arguments[2]) == 'function' ? doneCallback : arguments[1]); 
  else {
    if(Stage.TextEffects.indexOf(effect) > -1) {
      this.$bubble.find(_which(section)).addClass(effect);
    }
    // Note: MUST issue the callback in any case otherwise the interpreter will stall
    doneCallback('setTextEffect'); 
  }
}

Stage.prototype.setTypewriterEffect = function(section, doneCallback) {
  var audio = new Audio('../media/keystroke.mp3');
  function animate($elem) {
    $elem.css('visibility','visible');
    audio.load(); // Chrome bug - must reload for subsequent plays
    audio.play();
  }
  var timeout = 100;
  this.$bubble.find(_which(section))
    .lettering('words').children('span').lettering()
    .each(function(index, element) {
      $(element).children('span').each(function(index, element) {
        $(element).css('visibility','hidden');
        window.setTimeout(function() {animate($(element));}, timeout);
        timeout += 150;
      });
    });
  window.setTimeout(doneCallback, timeout); //accumulated timeout
}
// Note this a special function that returns a Sprite object
// It's not included in the Stage.FUNCTIONS below
Stage.prototype.createSprite = function(name, image, scale, path) {
  if(!this.sprites[name]) {
    this.sprites[name] = new Sprite(name, image, scale, path);
    this.sprites[name].$_element.appendTo(this.$bubble);
  }
  return this.sprites[name];
}  

Stage.prototype.getSprite = function(name) {
  if(this.sprites[name])
    return this.sprites[name];
  else 
    throw new Error('Unknow sprite: ' + name);
}

Stage.prototype.wait = function(timeout, doneCallback) {
  window.setTimeout(doneCallback, timeout);
}

Stage.FUNCTIONS = [ {'name':'setTextContent',      'blocking':false},
                    {'name':'setHTMLContent',      'blocking':false},
                    {'name':'setBackgroundColor',  'blocking':false},
                    {'name':'setFont',             'blocking':false},
                    {'name':'setFontSize',         'blocking':false},
                    {'name':'setTextColor',        'blocking':false},
                    {'name':'setTextEffect',       'blocking':true},
                    {'name':'setTypewriterEffect', 'blocking':true},
                    {'name':'wait',                'blocking':true}];

/**
* Sprite
*/

Sprite.prototype.defaultSize = 24; // in pixels, can be modified with scale()

function Sprite(name, images, scale, path) {
  this.$_element = $('<div id="sprite_' + name + '" class="sprite"></div>');
  this._selector = this.$_element[0];
  this.$_current = null;
  this.angle = 0;
  var $sprite = this.$_element;
  
  if(!(images instanceof Array)) images = [images];  
  if(path == undefined) path = './';
  if(path.slice(-1) != '/') path += '/';
  var autoscale = (scale < 0.1 ? 0.1 : scale > 4.0 ? 4.0 : scale);
  
  for(var i = 0; i < images.length; i++) {
    var $img = $('<img class="costume">')
    $img.error(function() {console.log("Can't load image " + $(this).attr('src'));})
        .attr('src', path + images[i])
        .css({ 'width': (this.defaultSize * autoscale) + 'px',
               'height': 'auto',
               'visibility': i==0 ? 'visible' : 'hidden' })
        .appendTo(this.$_element)
        .on('click', this.nextCostume.bind(this));
    if(i == 0)
      this.$_current = $img;
  }
  // Find the largest image and stretch the div boundaries to it
  // Uses imageLoader library
  this.$_element.imagesLoaded().always(function() {
    var maxHeight = 0, maxWidth = 0;
    $sprite.children('img').each(function(index, img) {
      var w = parseInt($(img).css('width'));
      var h = parseInt($(img).css('height'));
      if(maxWidth < w)  maxWidth =  w;
      if(maxHeight < h) maxHeight = h;
    });
    $sprite.css({'width': maxWidth + 'px', 'height': maxHeight + 'px'});
  });
}


// public methods
Sprite.prototype.nextCostume = function() {
  var $next = this.$_current.next();
  if($next.size() == 0) 
    $next = this.$_current.siblings(':eq(0)');
  if($next.size() > 0) {
    this.$_current.css('visibility', 'hidden');
    this.$_current = $next;
    this.$_current.css('visibility', 'visible');
  }
}

Sprite.prototype.goto = function(xTo, yTo) {
  if(xTo) this.$_element.css('top', xTo + 'px');
  if(yTo) this.$_element.css('left', yTo + 'px');
}

Sprite.prototype.addX = function(xTo) {
  if(xTo) this.$_element.css('top', xTo + 'px');
}

Sprite.prototype.addY = function(yTo) {
  if(yTo) this.$_element.css('left', yTo + 'px');
}

Sprite.prototype.glide = function(xTo, yTo, duration, doneCallback) {
  var $sprite = this.$_element;
  var start = { x: parseInt($sprite.css('left')), y: parseInt($sprite.css('top')) }
  //console.log('x='+start.x+' y='+start.y);
  new TWEEN.Tween(start)
              .to({ x: xTo, y: yTo }, duration)
			  //.easing( TWEEN.Easing.Elastic.InOut )
              .onUpdate(function() {
                  //var transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
                  //$sprite.css('webkitTransform', transform);
				  //$sprite.css('transform', transform);
                  $sprite.css({'left': this.x + 'px', 'top': this.y + 'px'});
                  //console.log(Math.round(this.x)+','+Math.round(this.y));
              })
              .onComplete(doneCallback)
              .start();
}

Sprite.prototype.jump = function(width, height, duration, doneCallback) {
  var $sprite = this.$_element;
  var x0 = parseInt($sprite.css('left')), y0 = parseInt($sprite.css('top'));
  new TWEEN.Tween({ x: x0, y: y0 })
              .to({ x: [x0+width*0.65, x0+width], y: [y0-height, y0] }, duration )
              .onUpdate( function() {
                  $sprite.css({'left': this.x + 'px', 'top': this.y + 'px'});
              })
              .interpolation(TWEEN.Interpolation.CatmullRom)
              .easing( TWEEN.Easing.Cubic.InOut )
              .onComplete(doneCallback)
              .start();
}

//Interpolations: TWEEN.Interpolation.Linear, TWEEN.Interpolation.Bezier, TWEEN.Interpolation.CatmullRom
// See demos at http://www.createjs.com/#!/TweenJS/demos/sparkTable
//Ease transitions see http://www.createjs.com/Docs/TweenJS/classes/Ease.html

Sprite.prototype.rotate = function(deg, duration, doneCallback) {
  var $sprite = this.$_element; 
  new TWEEN.Tween({ rotation: this.angle })
		      .to({ rotation: this.angle + deg }, duration )
		      .onUpdate(function() {
				  var transform = 'rotate(' + Math.floor(this.rotation) + 'deg)';
                  //$sprite.css({'transform-origin': 'center center','transform': transform});
                  $sprite.css('transform-origin', 'center center');
                  $sprite.css('transform', transform);
		      })
              .onComplete(doneCallback)
              .start();
  this.angle += deg;
}

Sprite.prototype.turn = function(deg) {
  this.angle += deg;
  this.$_element.css('transform', 'rotate(' + this.angle + 'deg)');
}


Sprite.FUNCTIONS = [{'name':'nextCostume',  'blocking': false},
                    {'name':'goto',         'blocking': false},
                    {'name':'glide',        'blocking': true},
                    {'name':'jump',         'blocking': true},
                    {'name':'addX',         'blocking': false},
                    {'name':'addY',         'blocking': false},
                    {'name':'rotate',       'blocking': true},
                    {'name':'turn',         'blocking': false},
                    {'name':'scale',        'blocking': true},
                    {'name':'opacity',      'blocking': true}];



/**
 * Main animation loop
 */
function mainAnimationLoop(time) {
  requestAnimationFrame(mainAnimationLoop);
  TWEEN.update(time);
}


