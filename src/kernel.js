/**
  Library for executing javascript code through an interpreter, with multithreading
  and native entry points.
**/

/* globals define */
//define(function (require, exports, module) {
  
// Removed by DavidKad
//var wecodeRuntime = require('wecodeRuntime');


/**
 * Runs a script on a interpreter (as a single thread/single entry point)
 * @param {String} code to run
 * @param {Object} stage - wecode runtime's stage
 */
function Runner(code, stage) {
  this.code = code;
  this.stage = stage;
  this.interpreter = new Interpreter(code, this.initFunc.bind(this));
  this.paused = false;
}

// Removed by DavidKad
//Runner.prototype.initFunc =


/**
 * Initialize the interpreter with the runtime types
 * @param  {[type]} interpreter
 * @param  {[type]} scope
 * @return {[type]}
 */
Runner.prototype.initFunc = function(interpreter, scope) {
  /**
   * Returns a generic wrapper for a native function
   * @param  {Object} nativeObj - object to apply the function on
   * @param  {[type]} funcName - function name
   * @param  {[type]} retConversionFunc - interpreter conversion value for the returned value
   * @param  {[type]} withWait - should a aSync counterpart be added
   * @return {[type]} a wrapper function to be used with the interpreter
   */

  var Runner = this;
  
  function nativeArray(proxyArray) {
    for(var i = 0, arr = []; i < proxyArray.length; i++) {
      arr[i] = proxyArray.properties[i];
    }
    return arr;
  }
  function createGenericWrapper(nativeObj, func, retValConversionFunc) {
    return function() {
      var argsArray = Array.prototype.slice.call(arguments, 0);
      // Convert args to native data
      var argsData = argsArray.map(function(argObj) {
        if(argObj.isPrimitive)
          return argObj.data;
        // Added by Davidkad: support arrays
        else if(interpreter.isa(argObj, interpreter.ARRAY))
          return nativeArray(argObj);
        else
          throw new Error('Only primitives and arrays are supported as native function args.');
      });

      if(func.blocking) {
        Runner.block(func.name);
        argsData.push(function() {Runner.unblock(func.name)});
      }

      // This is the actual call to the native function
      var retVal = nativeObj[func.name].apply(nativeObj, argsData);
      return retValConversionFunc ? retValConversionFunc(retVal) : interpreter.createPrimitive(retVal);
    };
  };

  /**
   * Create an interpreter object for a native object
   * @param  {[type]} parent
   * @param  {[type]} nativeObject
   * @param  {[type]} funcNames
   * @return {[type]}
   */
  function defineNativeObject(proxyObj, nativeObj, funcNames) {
    funcNames.forEach(function(func) {
      var wrapper = createGenericWrapper(nativeObj, func);
      interpreter.setProperty(proxyObj, func.name, interpreter.createNativeFunction(wrapper));
    });
  };
  
  var proxyConsole = interpreter.createObject(interpreter.OBJECT);
  interpreter.setProperty(scope, 'console', proxyConsole);
  defineNativeObject(proxyConsole, console, [{'name':'log', 'blocking':false}]);
  
  var proxyStage = interpreter.createObject(interpreter.OBJECT);
  interpreter.setProperty(scope, 'stage', proxyStage);
  defineNativeObject(proxyStage, Runner.stage, Stage.FUNCTIONS); // All methods except createSprite

  // Special treatment for getSprite since it returns an object
  var getSpriteRetValConversionFunc = function(retVal) {
      var proxySprite = interpreter.createObject(interpreter.OBJECT);
      defineNativeObject(proxySprite, retVal, Sprite.FUNCTIONS);
      return proxySprite;
    }
  var getSpriteWrapper = createGenericWrapper(Runner.stage, 
                                                 {name:'getSprite', blocking:false},
                                                 getSpriteRetValConversionFunc);
  interpreter.setProperty(proxyStage,
                          'getSprite',
                          interpreter.createNativeFunction(getSpriteWrapper));

}; //end of init func


/**
 * Run the interpreter
 * @return {[type]}
 *
 * TODO:
 *   possibly to prevent busy-loops schedule the next step via setTimeout
 *   every N steps.
 */
Runner.prototype.run = function() {
  var interpreter = this.interpreter;
  var runner = this;

  function nextStep() {
    if(runner.isPaused()) {
      window.setTimeout(nextStep, 10);
    } 
    else {
      try {
        if(interpreter.stateStack[0]) {
          var node = interpreter.stateStack[0].node;
          console.log(runner.code.substring(node.start, node.end));
        }
        var ok = interpreter.step();
      }
      finally {
        if(ok)
          nextStep();
        else
          console.log('script ended');
      }
    }
  }
  nextStep();
}

Runner.prototype.block = function(caller) {
  this.paused = true;
  console.log('block ' + caller);
}

Runner.prototype.unblock = function(caller) {
  this.paused = false;
  console.log('unblock ' + caller);
}

Runner.prototype.isPaused = function() {
  return this.paused;
}



/**
 * Kernel for running multiple scripts on a stage.
 * @param {[type]} stage
 */
function Kernel(stage) {
  this.stage = stage;
  this.scriptsByEvent = [];
}

/**
 * Execute scripts for a specific entry point (event). typically used internally.
 * @param  {[type]} event
 * @return {[type]}
 */
Kernel.prototype.executeHandlers = function(event) {
  var kernel = this;
  var scripts = this.scriptsByEvent[event] || [];
  scripts.forEach(function(script) {
    new Runner(script.code, kernel.stage).run();
  });
};


/**
 * Bind scripts to be executed on their specified entry points.
 * Resets the bindings for previous scripts.
 * @param {[type]} scripts
 */
Kernel.prototype.setScripts = function (scripts) {
  var kernel = this;
  scripts.forEach(function (script) {
    if(!kernel.scriptsByEvent[script.event]) {
      // create a new array and add handler
      kernel.scriptsByEvent[script.event] = [script];
      kernel.stage.on(script.event, function() {kernel.executeHandlers(script.event);});
    } 
    else
      kernel.scriptsByEvent[script.event].push(script);
  });
};


Kernel.prototype.run = function(code) {
  this.setScripts(code);
  this.stage.triggerEvent('start');
};
