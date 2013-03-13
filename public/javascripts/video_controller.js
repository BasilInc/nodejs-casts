function VideoCtrl($scope) {
  $scope.video = {
    poster : '',
    uid : '',
    sources : []
  };

  $scope.parseVideo = function() {
    var video = $($scope.videoHTML);
    $scope.video.uid = video.data('uid') || '';
    $scope.video.poster = video.attr('poster') || '';

    var sources = video.find("source");
    for(var i = 0; i < sources.length; i++) {
      var source = $(sources[i]);
      var src = source.attr('src');
      var quality = source.data('quality') || 'sd';
      $scope.video.sources.push({src: src, quality: quality });
    }
  };
}