document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 900);
});
  }

  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu){
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  const revealEls = document.querySelectorAll('.reveal, .gold-line');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));

  const heroFrames = document.querySelectorAll('[data-parallax]');
  function parallax(){
    heroFrames.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const y = window.scrollY * speed;
      el.style.transform = `translateY(${y}px)`;
    });
  }
  document.addEventListener('scroll', parallax, {passive:true});

  const form = document.getElementById('consideration-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      const confirmBox = document.getElementById('form-confirm');
      if (confirmBox) confirmBox.classList.add('show');
    });
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

});
