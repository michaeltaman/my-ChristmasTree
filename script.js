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




  var audio = new Audio('./enchanted-chimes-177906.mp3');

  function launchConfettiAnimation() {
    console.log('Launching confetti animation!');
    toggleConfetti();
    audio.play();

  }

  el.addEventListener('mouseup', stopDragging);
  el.addEventListener('touchend', stopDragging);
});
