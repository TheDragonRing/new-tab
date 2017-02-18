/*
  New Tab by TheDragonRing (thedragonring.me)
  Copyright © 2017 TheDragonRing - Creative Commons Attribution 4.0 International License
*/

$(document).ready(function(){

  var $fadeIn = $('[fadeIn]');
  $fadeIn.removeAttr('fadeIn');
  $fadeIn.hide();
  $fadeIn.fadeIn(1250);

  var $searchBar = $('#searchBar');
  $searchBar.focus();
  $searchBar.keypress(function(event){
    var $url = $searchBar.val();
    if(event.which === 13){
      if($url !== ''){
        if($url.indexOf(' ') >= 0 || $url.indexOf('.') <= 0){
          $url = 'https://google.com/search?q=' + $url;
        }else if(!/^((http|https|ftp):\/\/)/.test($url)){
          $url = 'http://' + $url;
        }
        window.location.assign($url);
      }
    }
  });

  function getName(){
    if(localStorage['name'] === undefined || localStorage['name'] === null){
      var name = prompt('Hello, please enter your name:', '');
      if(name !== '' && name !== null && name !== undefined){
        localStorage['name'] = name;
      }else{
        getName();
      }
    }
  }
  getName();
  $('#name').html('Hello, ' + localStorage['name'] + '.');

  function startTime() {
    var date = new Date();
    var h = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
    var m = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    var s = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    var t = (date.getHours() > 11) ? 'pm' : 'am';
    $('#time').html(h + ':' + m + ':' + s + ' ' + t);
    var t = setTimeout(function () {
      startTime();
    }, 500);
  }
  startTime();

  var $notesTab = $('#notesTab');
  $('#openNotes').click(function(){
    event.preventDefault();
    $('*').css('pointer-events', 'none');
    $('*').css('filter', 'blur(5px)');
    var tabObjects = [$('body'), $('html'), $('#notesTab'), $('#saveNotes'), $('#notes')];
    for(var i = 0; i < tabObjects.length; i++){
      tabObjects[i].css('pointer-events', '');
      tabObjects[i].css('filter', '');
    }
    $notesTab.removeClass('startHidden');
    $notesTab.hide();
    $notesTab.animate({ width: 'toggle' }, 350);
    var notes = localStorage['notes'];
    $('#notes').val(notes);
  });
  $('#saveNotes').click(function(){
    event.preventDefault();
    $('*').css('pointer-events', '');
    $('*').css('filter', '');
    localStorage['notes'] = $('#notes').val();
    $notesTab.animate({ width:'toggle' }, 350);
  });

  function getYear(){
    var year = new Date().getFullYear();
    if(year === 2017){
      return year;
    }else{
      return '2017 - ' + year;
    }
  }
  $('#copyright').html('&copy; ' + getYear() + ' TheDragonRing');

});
