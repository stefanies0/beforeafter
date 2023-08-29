var scratch = document.getElementById("scratch"),
scratchCanvas = scratch.getContext('2d'),
brushRadius = (scratch.width / 100) * 5,
img = new Image();

if (brushRadius < 50) { brushRadius = 50 }

scratchCanvas.imageSmoothingEnabled = true;

img.onload = function(){  
	scratchCanvas.drawImage(img, 0, 0, scratch.width, scratch.height);
}
img.loc = '';
img.filename = 'before.jpg';
if (window.devicePixelRatio >= 2) {
	var nameParts = img.filename.split('.');
	img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
} else {
	img.src = img.loc + img.filename;
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
	var scratchRect = scratch.getBoundingClientRect();
    return {
	  x: Math.floor((xRef-scratchRect.left)/(scratchRect.right-scratchRect.left)*scratch.width),
	  y: Math.floor((yRef-scratchRect.top)/(scratchRect.bottom-scratchRect.top)*scratch.height)
    };
}
      
function drawDot(mouseX,mouseY){
	scratchCanvas.beginPath();
    scratchCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    scratchCanvas.fillStyle = '#000';
    scratchCanvas.globalCompositeOperation = "destination-out";
    scratchCanvas.fill();
}

scratch.addEventListener("mousemove", function(e) {
	var brushPos = getBrushPos(e.clientX, e.clientY);
  var leftBut = detectLeftButton(e);
  if (leftBut == 1) {
		drawDot(brushPos.x, brushPos.y);
  }
}, false);

scratch.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
    var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);