define(function(){

		return {
			
			clearCanvas:function(canvas, preserveTransform) {
				var context = canvas.getContext('2d');
				if (preserveTransform) {
			      context.save();
			      context.setTransform(1, 0, 0, 1, 0, 0);
			    }

			    context.clearRect(0, 0, canvas.width, canvas.height);

			    if (preserveTransform) {
			      context.restore();
			    }  
			}

		}
})