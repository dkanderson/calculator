(function(){
  
  'use strict';

  var eventUtil = {},
      keyPad = document.getElementById('keyPad'),
      flipper = document.getElementById('flipper'),
      calculatorFlipper = document.getElementById('calculator-flipper'),
      displayText = document.getElementById('display-text'),
      ac = document.getElementById('ac'),
      acFlag = false,
      MAXDIGITS = 17,
      displayLength = 0,
      resultDisplay = '',
      result = 0;
      

  
  var calculator = {

        calculate: function () {

            var fn = Array.prototype.pop.apply(arguments);
            return fn.apply(null, arguments);

        },

        plus: function () {
            
            var i = 0,
                total = 0,
                l = arguments.length;
            for (i = 0; i < l; i += 1) {
                
                total += arguments[i];

            }

            return total;
        },

        multiply: function () {
            var i = 0,
                total = Array.prototype.shift.apply(arguments),
                l = arguments.length;

            for (i = 0; i < l; i += 1) {

                total *= arguments[i];

            }

            return total;
        },

        minus: function () {
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
        },

        percentage: function () {

            var i = 0,
                total = Array.prototype.shift.apply(arguments),
                l = arguments.length;

            for (i = 0; i < l; i += 1) {
                
                total = arguments[i] / 100;

            }

            return total;

        }

  };

  

  function handleInput() {

    var cache = [],
        numCache = [],
        memCache = 0,
        lastfunc = '',
        dotFlag = false,
        num1Flag = false,
        funcCache = [],
        result = 0,
        neg = false;

    //event delegation
    eventUtil.addEvent(document, 'click', function (evt) {

      var dataNumber = evt.target.attributes['data-number'],
          dataOperator = evt.target.attributes['data-operator'],
          dataDot = evt.target.attributes['data-dot'],
          dataEquals = evt.target.attributes['data-equals'],
          dataAc = evt.target.attributes['data-ac'],
          dataPm = evt.target.attributes['data-pm'];


      // Toggle flip container class
      if( evt.target.id === "flipper" ) {
        
        calculatorFlipper.classList.toggle( 'flipp' );
        
      }



      if( dataNumber ) {

        acFlag = true;
        ac.innerHTML = 'C';

        if ( cache.length < MAXDIGITS ) {

            cache.push ( dataNumber.value );

            displayLength = cache.join( '' ).length;
            resultDisplay = cache.join( '' );

            

            // Update font size when over 10 characters
            if( displayLength > 10 ) {

              displayText.classList.add( 'small-text' );

            }

        }


      } else if ( dataOperator ) {

          cache = [];
          numCache.push( parseFloat( resultDisplay ) );
          funcCache.push( dataOperator.value );


          if ( dataOperator.value === 'equals' ){

              calculateSomeShit( numCache, funcCache[0], true );
              funcCache.shift ();

          } else {

            calculateSomeShit( numCache, dataOperator.value, 1 );

          }
          


        } else if ( dataDot ) {

          if ( !dotFlag ){

            if (cache.length === 0) {

                cache.push('0.');

              } else {

                cache.push('.');

              }

              dotFlag = true;
          }


        } else if (dataAc) {

          if ( acFlag && cache.length > 1 ) {

            cache = [];
            resultDisplay = '0';
            acFlag = false;
            ac.innerHTML = 'AC';

            if ( numCache ) {

              numCache.pop();

            }
            

          } else {

            clearAll();


          }
          

        } else if ( dataPm ) {

          if ( cache.length > 0 ) {

              neg = (-1 * parseFloat(cache.join('')));
              console.log(neg);
              resultDisplay = neg;

          }

        }

        
        displayUpdate ( resultDisplay, false );

    });

    function displayUpdate ( updateString, refreshCache ) {
      
      if ( refreshCache ) {

        cache = [];

      }

      displayText.innerHTML = updateString;

    }

    function calculateSomeShit ( numCache, func, updateDisplay ) {

        var result, calculate = calculator.calculate;

        if ( numCache[1] ) {

          result = calculate(numCache[0], numCache[1], calculator[func]);
          numCache[1] = result;
          numCache.shift();
          funcCache.shift();

          if ( updateDisplay ) {

            resultDisplay = result;

          }
          
        } else {

          return;

        }
        

    }

    function clearAll () {

      cache = [];
      numCache = [];
      funcCache = [];
      result = 0;
      dotFlag = false;
      resultDisplay = '0';
      ac.innerHTML = 'AC';

    }

   
    // Make sure result is not too big for display
    function formatResult ( result ) {

        // Number.

    }

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
  displayText.innerHTML = result;
  
}());