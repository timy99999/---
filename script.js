(() => {
  function parseDecls(str) {
    return str.split(';').map(s => s.trim()).filter(Boolean).map(pair => {
      const i = pair.indexOf(':');
      return [pair.slice(0, i).trim(), pair.slice(i + 1).trim()];
    });
  }

  function initHover() {
    document.querySelectorAll('[data-hover]').forEach(el => {
      const decls = parseDecls(el.getAttribute('data-hover'));
      let original = [];
      el.addEventListener('mouseenter', () => {
        original = decls.map(([prop]) => [prop, el.style.getPropertyValue(prop)]);
        decls.forEach(([prop, value]) => el.style.setProperty(prop, value));
      });
      el.addEventListener('mouseleave', () => {
        original.forEach(([prop, value]) => el.style.setProperty(prop, value));
      });
    });
  }

  function initDecorFly() {
    const anims = ['floatA', 'floatB', 'floatC', 'floatD', 'floatE'];
    document.querySelectorAll('.bg-decor, .hero-decor').forEach(container => {
      Array.from(container.children).forEach(orig => {
        const clone = orig.cloneNode(true);
        clone.style.left = (Math.random() * 90 + 3).toFixed(1) + '%';
        clone.style.top = (Math.random() * 82 + 5).toFixed(1) + '%';
        clone.style.right = '';
        clone.style.bottom = '';
        clone.style.opacity = '.55';
        const anim = anims[Math.floor(Math.random() * anims.length)];
        const duration = (7 + Math.random() * 7).toFixed(1) + 's';
        const delay = (-Math.random() * 10).toFixed(1) + 's';
        clone.style.animation = `${anim} ${duration} ease-in-out ${delay} infinite`;
        container.appendChild(clone);
      });
    });
  }

  function initSectionNav() {
    const links = Array.from(document.querySelectorAll('.nav-links a'));
    const map = new Map();
    links.forEach(a => {
      const section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) map.set(section, a);
    });
    const setActive = (a, active) => { a.style.color = active ? '#fff' : 'rgba(255,255,255,.6)'; };
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const a = map.get(entry.target);
        if (a) setActive(a, entry.isIntersecting);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    map.forEach((a, section) => io.observe(section));
  }

  function initReveal() {
    const show = el => { el.style.opacity = '1'; el.style.transform = 'none'; };
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { show(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show(el);
      else io.observe(el);
    });

    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(show);
    }, 3000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHover();
    initReveal();
    initDecorFly();
    initSectionNav();
  });
})();
