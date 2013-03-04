(function () {

console.log('loading main.js');

// var VIDEO_PLAYER_WIDTH = 420;
// var VIDEO_PLAYER_HEIGHT = 315;
var START_COUNT = 120;
var YOUTUBE_KEY = 'AIzaSyAzbxEzpDORl5gUwugGG8z8IGcxRULSEMQ';

var $button = $('.start-button');
var $message = $('.message');
var current_count = 0;

var init = function () {
  console.log('init!');
  $button.on('click', start);
};

var start = function () {
  console.log('start!');
  $('#video').hide();
  $('.start').addClass('is-hidden');
  $('.play').removeClass('is-hidden');

  $.getJSON(
    build_url(),
    function (data) {
      console.log('callback from google!');
      var videos = [];
      if (!data || 0 === data.items.length) {
        $message.html('Something went wrong!');
      }
      for (var i = 0, len = data.items.length; i < len; ++i) {
        videos.push(data.items[i].id.videoId);
      }
      var randomized_index = Math.floor( Math.random() * videos.length);
      $('#video')
        .html( build_iframe( videos[randomized_index] ) )
        .fadeIn(300, start_timer);
    }
  );
};

var build_url = function () {
  console.log('build_url');
  var endpoint = 'https://www.googleapis.com/youtube/v3/search';
  var option = {
    part: 'snippet',
    maxResults: 10,
    q: 'cute+funny',
    type: 'video',
    videoDuration: 'short',
    key: YOUTUBE_KEY
  };
  return [endpoint, '?', $.param(option)].join('');
};

var build_iframe = function (video_id) {
  console.log('build_iframe');
  var option = {
    id: 'ytplayer',
    type: 'text/html',
    // width: VIDEO_PLAYER_WIDTH,
    // height: VIDEO_PLAYER_HEIGHT,
    src: 'http://www.youtube.com/embed/' + video_id + '?autoplay=1',
    frameborder: '0'
  };
  var attr = $.map(
    option,
    function (val, key) {
      return [key, '="', val, '"'].join('');
    }
  );  
  var arr = ['<iframe', '/>'];
  var splice_args = [1, 0].concat(attr);
  Array.prototype.splice.apply(arr, splice_args);
  return arr.join(' ');
};

var start_timer = function () {
  console.log('start_timer!');
  current_count = START_COUNT;
  timer();
};

var timer = function () {
  console.log('timer!');
  if (current_count < 1) {
    $message.html( $message.data('finish') );
    return;
  }
  $message.html( current_count );
  --current_count;
  setTimeout(timer, 1000);  
};

$(init);

})();

