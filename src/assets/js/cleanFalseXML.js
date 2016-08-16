;(function(){
	var images = document.querySelectorAll('.falsexml img');
	var forDelete = document.querySelectorAll('.falsexml script, .falsexml link');
	
	[].forEach.call(forDelete, function(elem){
		elem.parentNode.removeChild(elem);
	});

	[].forEach.call(images, function(image){
		image.setAttribute('data-src', image.src);
		image.src = "";
	});

})();
