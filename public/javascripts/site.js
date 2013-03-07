// Site wide JS
$(function(){
	$('#tags').tagsInput();

	$('#add_source').click(function(){
		var source_html =$('<div class="source"><div class="source-header">Source</div><label for="src" class="control-label">SRC</label><div class="controls"><input id="url" type="text" name="video[source][src]" placeholder="SRC"></div><label for="quality" class="control-label">Quality</label><div class="controls"><input id="url" type="text" name="video[source][quality]" placeholder="Quality"></div></div>');
		$('.source').last().after(source_html);
	});
});





function TodoCtrl($scope) {
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}


function VideoCtrl($scope) {
  $scope.video = {
    poster : '',
  };
 
  $scope.parseVideo = function() {
    $scope.video.poster = $scope.videoHTML;
    $scope.videoHTML = '';
  };

  $scope.grabPoster = function() {
    return $scope.videoHTML;
  };
}