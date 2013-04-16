// Site wide JS
$(function(){
	$('#tags').tagsInput();

	$('#add_source').click(function(){
		var source_html =$('<div class="source"><div class="source-header">Source</div><label for="src" class="control-label">SRC</label><div class="controls"><input id="url" type="text" name="video[source][src]" placeholder="SRC"></div><label for="quality" class="control-label">Quality</label><div class="controls"><input id="url" type="text" name="video[source][quality]" placeholder="Quality"></div></div>');
		$('.source').last().after(source_html);
	});
});