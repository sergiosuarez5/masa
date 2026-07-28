const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 400);
  });
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // duplicate the track content once so the loop is seamless
  const track = document.getElementById('track');
  track.innerHTML += track.innerHTML;