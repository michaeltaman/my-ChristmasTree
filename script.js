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

  function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', moveItem);
    document.removeEventListener('touchmove', moveItem);
  }

  el.addEventListener('mouseup', stopDragging);
  el.addEventListener('touchend', stopDragging);
});