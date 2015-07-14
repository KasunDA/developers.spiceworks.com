// >=IE10 no longer supports conditional comments so we have to manually add
// the 'ie' class to html for that browser
// See: http://jsfiddle.net/evildonald/jLuF5/

jQuery(function(){
  var ie10Styles = [
    'msTouchAction', 'msWrapFlow', 'msWrapMargin',
    'msWrapThrough', 'msOverflowStyle', 'msScrollChaining',
    'msScrollLimit', 'msScrollLimitXMin', 'msScrollLimitYMin',
    'msScrollLimitXMax', 'msScrollLimitYMax', 'msScrollRails',
    'msScrollSnapPointsX', 'msScrollSnapPointsY', 'msScrollSnapType',
    'msScrollSnapX', 'msScrollSnapY', 'msScrollTranslation',
    'msFlexbox', 'msFlex', 'msFlexOrder'];

  var ie11Styles = ['msTextCombineHorizontal'];

  /*
   * Test all IE only CSS properties
   */
  var body = document.body;
  var style = body.style;
  var ieVersion = null;
  var i, property;

  for (i = 0; i < ie10Styles.length; i++) {
    property = ie10Styles[i];

    if (style[property] != undefined) {
      ieVersion = "ie10";
      break; //short circuit the loop
    }
  }

  for (i = 0; i < ie11Styles.length; i++) {
    property = ie11Styles[i];

    if (style[property] != undefined) {
      ieVersion = "ie11";
      break; //short circuit the loop
    }
  }

  //Update DOM to know about IE-ness
  if (ieVersion) {
    jQuery('html').removeClass('no-ie').addClass('ie').addClass(ieVersion);
  }

  //Legacy support for <= IE9
  if (document.attachEvent && !jQuery('html').hasClass('ie')) {
    jQuery('html').removeClass('no-ie').addClass('ie');
  }
});
