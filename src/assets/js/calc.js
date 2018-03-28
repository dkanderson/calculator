(function(){
  
  'use strict';

  var eventUtil = {},
      calcButtonArray = [],
      navButtonArray = [],
      keyPad = document.getElementById('keyPad'),
      flipper = document.getElementById('flipper'),
      calculatorFlipper = document.getElementById('calculator-flipper'),
      displayText = document.getElementById('display-text');
      

  
  var calculator = {

    button: {
        
        name: '',
        type: '',
        value: ''

    },
    
    calculate: {
        calc: function () {

            var fn = Array.prototype.pop.apply(arguments);
            return fn.apply(null, arguments);

        },

        sum: function () {
            
            var i = 0,
                total = 0,
                l = arguments.length;
            for (i = 0; i < l; i += 1) {
                
                total += arguments[i];

            }

            return total;
        },

        prod: function () {
            var i = 0,
                total = Array.prototype.shift.apply(arguments),
                l = arguments.length;

            for (i = 0; i < l; i += 1) {

                total *= arguments[i];

            }

            return total;
        },

        diff: function () {
            var i = 0,
                total = Array.prototype.shift.apply(arguments),
                l = arguments.length;

            for (i = 0; i < l; i += 1) {
                
                total -= arguments[i];

            }

            return total;
        },

        divide: function () {

            var i = 0,
                total = Array.prototype.shift.apply(arguments),
                l = arguments.length;

            for (i = 0; i < l; i += 1) {
                
                total /= arguments[i];

            }

            return total;
        }
      }
  };

  

  function handleInput() {

    var cache = [],
        numCache = [],
        temp = '',
        memCache = 0,
        lastfunc = '',
        counter = 0,
        funcCache = [],
        result = 0,
        neg = false;

    //event delegation
    eventUtil.addEvent(document, 'click', function (evt) {
      
      // console.log(evt);

      if( evt.target.id === "flipper") {
        
        calculatorFlipper.classList.toggle('flipp');
        // console.log(calculatorFlipper.classList);
      }


      if(evt.target.attributes['data-number']) {

        numCache.push(evt.target.attributes['data-number'].value);
        console.log(numCache);
        console.log(typeof(evt.target.attributes['data-number'].value));

      }

    });
  }
  
  eventUtil = {

      addEvent: function (el, type, fn) {

          if (typeof addEventListener !== "undefined") {
              
              el.addEventListener(type, fn, false);

          } else if (typeof attachEvent !== "undefined") {
              
              el.attachEvent("on" + type, fn);

          } else {
              
              el["on" + type] = fn;

          }
      },
      removeEvent: function (el, type, fn) {
          
          if (typeof removeEventListener !== "undefined") {
             
              el.removeEventListener(type, fn, false);

          } else if (typeof detachEvent !== "undefined") {
              
              el.detachEvent("on" + type, fn);

          } else {
              
              el["on" + type] = null;
          }
      },
      getTarget: function (event) {
          
          if (typeof event.target !== "undefined") {
              
              return event.target;

          } else {
              
              return event.srcElement;

          }
      },
      preventDefault: function (event) {
          
          if (typeof event.preventDefault !== "undefined") {
             
              event.preventDefault();

          } else {
              
              event.returnValue = false;

          }
      },
      getCharCode: function (event) {
          
          if (typeof event.charCode === "number") {
              
              return event.charCode;

          } else {
              
              return event.keyCode;

          }
      }
  };

  handleInput();
  
}());