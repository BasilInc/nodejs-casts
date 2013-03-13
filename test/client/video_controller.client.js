chai.should();

describe('VideoCtrl', function(){

  it('should parse video html', function() {
    var scope = {},
    ctrl = new VideoCtrl(scope);

    scope.videoHTML = '\
<video id="video1" class="sublime" poster="https://cdn.sublimevideo.net/vpa/ms_800.jpg" width="640" height="360" data-autoresize="none" data-uid="a240e92d" data-name="Midnight Sun" preload="none">\
  <source src="https://cdn.sublimevideo.net/vpa/ms_360p.mp4" />\
  <source src="https://cdn.sublimevideo.net/vpa/ms_720p.mp4" data-quality="hd" />\
  <source src="https://cdn.sublimevideo.net/vpa/ms_360p.webm" />\
  <source src="https://cdn.sublimevideo.net/vpa/ms_720p.webm" data-quality="hd" />\
</video>';

    scope.parseVideo();
    scope.video.should.have.property('poster').that.equals("https://cdn.sublimevideo.net/vpa/ms_800.jpg");
    scope.video.should.have.property('uid').that.equals('a240e92d');
    scope.video.should.have.property('sources').with.length(4);
  });
  
});
