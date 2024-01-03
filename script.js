let dragStopPositions = []; // Array to store drag stop positions

document.querySelectorAll('div img').forEach(el => {
  let isDragging = false;

  el.addEventListener('mousedown', startDragging);
  el.addEventListener('touchstart', startDragging);

  function moveItem(e) {
    if (isDragging) {
      if (e.type === 'touchmove') {
        e = e.touches[0];
      }
      el.style.top = e.pageY - el.height / 2 + 'px';
      el.style.left = e.pageX - el.width / 2 + 'px';
    }
  }

  function startDragging(e) {
    e.preventDefault();

    isDragging = true;
    document.body.append(el);
    el.style.position = 'absolute';
    el.ondragstart = () => false;

    moveItem(e);

    document.addEventListener('mousemove', moveItem);
    document.addEventListener('touchmove', moveItem);
  }


  function stopDragging(e) {
    isDragging = false;
    document.removeEventListener('mousemove', moveItem);
    document.removeEventListener('touchmove', moveItem);

    // Save the drag stop position
    dragStopPositions.push({ x: e.pageX, y: e.pageY });

    // Check if there are 5 saved positions
    if (dragStopPositions.length === 5) {
      launchConfettiAnimation();
    }
  }

/*function stopDragging(e) {
  console.log(dragStopPositions.length);
  isDragging = false;
  document.removeEventListener('mousemove', moveItem);
  document.removeEventListener('touchmove', moveItem);

  // Get the bounding rectangle of the Christmas tree image
  var treeRect = document.querySelector('.tree').getBoundingClientRect();

  // Check if the dropped position is within the bounds of the Christmas tree image
  const isInsideTree = (e.pageX >= treeRect.left && e.pageX <= treeRect.right && e.pageY >= treeRect.top && e.pageY <= treeRect.bottom);

  // Remove the oldest saved position that is outside the tree bounds
  dragStopPositions = dragStopPositions.filter(position =>
    position.x >= treeRect.left && position.x <= treeRect.right &&
    position.y >= treeRect.top && position.y <= treeRect.bottom
  );

  // If inside tree and there is space in the array, add the new position
  if (isInsideTree && dragStopPositions.length < 5) {
    dragStopPositions.push({ x: e.pageX, y: e.pageY });
  }

  // Check if there are 5 saved positions within the tree bounds to trigger the animation
  if (dragStopPositions.length === 5) {
    launchConfettiAnimation();
  }
}*/

function convertDivToButton() {
  // Select the div
  var div = document.querySelector('div');

  // Create a parent div
  var parentDiv = document.createElement('div');

  // Set the parent div's styles to match the div's
  var divStyle = window.getComputedStyle(div);
  parentDiv.style.width = divStyle.width;
  parentDiv.style.height = divStyle.height;
  parentDiv.style.position = divStyle.position;
  parentDiv.style.top = divStyle.top;
  parentDiv.style.right = divStyle.right;
  parentDiv.style.bottom = divStyle.bottom;
  parentDiv.style.left = divStyle.left;

  // Create a new button
  var button = document.createElement('button');

  // Set the button's text
  button.style.fontFamily = 'Roboto, sans-serif';
  button.style.fontSize = '20px';
  button.style.fontWeight = 'bold';
  button.style.color = 'white';
  button.innerHTML = 'Game over !!!';

  // Set the button's dimensions to fill the parent div
  button.style.width = '100%';
  button.style.height = '100%';
  button.style.borderRadius = '8px';


  button.style.background = 'linear-gradient(to right, #008000, #00FF00)';
  button.style.boxShadow = 'rgba(60,64,67,0.3) 0px 1px 2px 0px';

  button.addEventListener('click', function() {
    location.reload();
  });

  // Replace the div with the parent div
  div.parentNode.replaceChild(parentDiv, div);

  // Add the button to the parent div
  parentDiv.appendChild(button);
}





  var audio = new Audio('./enchanted-chimes-177906.mp3');

  function launchConfettiAnimation() {
    console.log('Launching confetti animation!');
    toggleConfetti();
    audio.play();
    // Call the function
    convertDivToButton();

  }

  el.addEventListener('mouseup', stopDragging);
  el.addEventListener('touchend', stopDragging);


  // If user leaves page  stop the audio

  function stopAudio() {
      audio.pause();
      audio.currentTime = 0;
      audioPlaying = false;
  }

  function handleVisibilityChange() {
    debugger
    if (document.hidden) {
      stopAudio();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);



  window.addEventListener('beforeunload', function (e) {
    stopAudio();
    if (isRunning()) {
      resumeConfetti();
    }
  });

  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      // The page is loaded from the bfcache
      // This might indicate the user has returned to this page

      // Add your logic here for actions to be taken when the user returns
      // For example, restarting audio or re-initiating certain functionalities
      if (isRunning()) {
        audio.play(); // Assuming 'audio' is the reference to your audio element
      }
    }
  });

});
