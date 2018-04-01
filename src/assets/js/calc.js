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
      PRECISION = 10,
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
        neg = false,
        dataNumber = null,
        dataOperator = null,
        dataEquals = null,
        dataDot = null,
        dataAc = null,
        dataPm = null;

    // Handle Mouse Events
    eventUtil.addEvent(document, 'click', function (evt) {

      dataNumber = evt.target.attributes['data-number'];
      dataOperator = evt.target.attributes['data-operator'];
      dataDot = evt.target.attributes['data-dot'];
      dataEquals = evt.target.attributes['data-equals'];
      dataAc = evt.target.attributes['data-ac'];
      dataPm = evt.target.attributes['data-pm'];


      // Toggle flip container class
      if( evt.target.id === "flipper" ) {
        
        calculatorFlipper.classList.toggle( 'flipp' );
        
      }

      // Call eventManager
      eventManager ( dataNumber, dataOperator, dataDot, dataEquals, dataAc, dataPm );

      
    });

    // Handle Keyboard Events
    eventUtil.addEvent(document, 'keypress', function (evt) {

      var invalidKey = false;

      dataNumber = null;
      
      if ( evt.keyCode === 61 || evt.keyCode === 13 ) {

        dataOperator = { value: "equals" };

      } else if ( evt.keyCode >= 42 && evt.keyCode <= 47 ) { // fix
        
        switch ( evt.keyCode ) {

            case 42:

              dataOperator = { value: "multiply" };
              break;

            case 43:

              dataOperator = { value: "plus" };
              break;

            case 44:

              invalidKey = true;
              break;

            case 45:

              dataOperator = { value: "minus" };
              break;

            case 46:

              dataDot = true;
              break;

            case 47:

              dataOperator = { value: "divide" };
              break;

            default:

              invalidKey = true;
              break;
        }

      } else if ( evt.keyCode >= 48 && evt.keyCode <= 57 ) {
          
          dataNumber = { value: evt.key };

       } else if ( evt.keyCode === 37) {

          dataOperator = { value: "percentage"};

       } else {

        invalidKey = true;

       }

      // Call eventManager
      if ( !invalidKey && evt.keyCode !== 16 ) {

        eventManager ( dataNumber, dataOperator, dataDot, dataEquals, dataAc, dataPm );

      }
      

    });


    function displayUpdate ( updateString, refreshCache ) {
      
      if ( refreshCache ) {

        cache = [];
        funcCache = [];

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

            resultDisplay = formatResult( result, true );

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
        if ( !isNaN ( result ) && result.toExponential().length > MAXDIGITS ) {

          return result.toPrecision( PRECISION ).replace ( /\+/g, '');

        } else {

          return result;

        }

    }

    function eventManager ( dataNumber, dataOperator, dataDot, dataEquals, dataAc, dataPm ) {

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

        } else {

          return;
        }

        
        displayUpdate ( resultDisplay, false );


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