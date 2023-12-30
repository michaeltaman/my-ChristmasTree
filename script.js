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

  //var audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/3/34/Sound_Effect_-_Door_Bell.ogg');
  var audio = new Audio('./enchanted-chimes-177906.mp3');

  function launchConfettiAnimation() {
    // Your code to launch confetti animation goes here
    // This function will be called when 5 drag stop positions are saved
    console.log('Launching confetti animation!');
    toggleConfetti();
    audio.play();
    // Replace console.log with your confetti animation code
    // For example, you can use libraries like confetti-js to create confetti animation
  }

  el.addEventListener('mouseup', stopDragging);
  el.addEventListener('touchend', stopDragging);
});
