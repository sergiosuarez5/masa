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

// ---------- Typewriter effect for hero title (multi-frase en ciclo) ----------
  (function(){
    const target = document.getElementById('typeHero');
    if(!target) return;
    const textSpan = target.querySelector('.tw-text');

    // cada frase es un array de partes {text, em}
    const phrases = [
      [
        { text: "Masa madre, ", em: false },
        { text: "24 horas", em: true },
        { text: " de fermentación", em: false }
      ],
      [
        { text: "...y el toque crujiente perfecto.", em: false }
      ]
    ];

    const typeSpeed   = 55;    // ms por letra al escribir
    const eraseSpeed  = 25;    // ms por letra al borrar
    const startDelay  = 300;   // ms antes de la primera escritura
    const pauseAfter  = 3000;  // 3s de pausa para leer antes de borrar

    let phraseIndex = 0;
    let partIndex = 0;
    let charIndex = 0;
    let currentEl = null;

    function typeStep(){
      const parts = phrases[phraseIndex];

      if(partIndex >= parts.length){
        // terminó de escribir la frase -> esperar y luego borrar
        setTimeout(eraseAll, pauseAfter);
        return;
      }

      const part = parts[partIndex];

      if(charIndex === 0){
        currentEl = part.em ? document.createElement('em') : document.createTextNode('');
        if(part.em) textSpan.appendChild(currentEl);
      }

      if(charIndex < part.text.length){
        const nextChar = part.text.charAt(charIndex);
        if(part.em){
          currentEl.textContent += nextChar;
        } else {
          textSpan.appendChild(document.createTextNode(nextChar));
        }
        charIndex++;
        setTimeout(typeStep, typeSpeed);
      } else {
        partIndex++;
        charIndex = 0;
        setTimeout(typeStep, typeSpeed);
      }
    }

    function eraseAll(){
      if(textSpan.lastChild){
        const last = textSpan.lastChild;
        last.textContent = last.textContent.slice(0, -1);
        if(last.textContent.length === 0) textSpan.removeChild(last);
        setTimeout(eraseAll, eraseSpeed);
      } else {
        // pasar a la siguiente frase (o volver a la primera)
        phraseIndex = (phraseIndex + 1) % phrases.length;
        partIndex = 0;
        charIndex = 0;
        setTimeout(typeStep, typeSpeed);
      }
    }

    setTimeout(typeStep, startDelay);
  })();