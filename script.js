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
      const original = decls.map(([prop]) => [prop, el.style.getPropertyValue(prop)]);
      el.addEventListener('mouseenter', () => {
        decls.forEach(([prop, value]) => el.style.setProperty(prop, value));
      });
      el.addEventListener('mouseleave', () => {
        original.forEach(([prop, value]) => el.style.setProperty(prop, value));
      });
    });
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
  });
})();
