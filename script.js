/* =========================================================
   BRISA MARINA — script.js
   Contenido editable + interacciones
   ========================================================= */

/* Número de WhatsApp (formato internacional, sin +, sin espacios) */
const WA = '573146034150';
const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* =========================================================
   1) HOSPEDAJES  —  👉 EDITA AQUÍ PARA AGREGAR MÁS
   Copia un objeto { ... } y añádelo al arreglo. La tarjeta
   se genera sola. Para el botón de Airbnb, pega el enlace real;
   déjalo en "" si aún no está publicado y el botón no aparece.
   ========================================================= */
const HOSPEDAJES = [
  {
    nombre: 'Suite Brisa Marina',
    etiqueta: 'Hasta 5 personas',
    img: 'img/habitacion.webp',
    alt: 'Habitación de la Suite Brisa Marina con cama amplia y detalles en verde frente al mar',
    descripcion: 'Suite cómoda y funcional, ideal para parejas, familias pequeñas o grupos que buscan descansar cerca del mar. Perfecta para una estadía tranquila con acceso a las zonas sociales de Laguna Beach.',
    features: [
      'Capacidad hasta para 5 personas',
      'Acceso a playa frente al mar',
      'Acceso a piscinas',
      'Acceso a jacuzzis',
      'Ideal para parejas o familias pequeñas',
    ],
    waMsg: 'Hola, quiero consultar disponibilidad de la Suite Brisa Marina en Laguna Beach.',
    airbnb: 'https://www.airbnb.com.co/rooms/1046014681177142432',
  },
  {
    nombre: 'Suite Brisa Marina Familiar',
    etiqueta: 'Hasta 5 personas',
    img: 'img/balcon3.webp',
    alt: 'Balcón con vista al mar y veleros al atardecer en la Suite Brisa Marina Familiar',
    descripcion: 'Segunda suite disponible para quienes desean disfrutar una experiencia de playa con comodidad, descanso y acceso a las zonas comunes del complejo.',
    features: [
      'Capacidad hasta para 5 personas',
      'Ambiente cómodo y familiar',
      'Acceso a playa frente al mar',
      'Acceso a piscinas y jacuzzis',
      'Ideal para grupos pequeños',
    ],
    waMsg: 'Hola, quiero consultar disponibilidad de la Suite Brisa Marina Familiar en Laguna Beach.',
    airbnb: 'https://www.airbnb.com.co/rooms/1045892901415562165',
  },
  {
    nombre: 'Apartamento Brisa Marina',
    etiqueta: 'Familias y grupos',
    img: 'img/balcon.webp',
    alt: 'Terraza del Apartamento Brisa Marina con mobiliario blanco y vista al mar',
    descripcion: 'Apartamento moderno de 2 habitaciones, sala, 3 camas tipo tarima y cocina. Ideal para familias o grupos que buscan más espacio, independencia y comodidad durante su estadía frente al mar.',
    features: [
      '2 habitaciones',
      'Sala y cocina equipada',
      '3 camas tipo tarima',
      'Diseño moderno',
      'Acceso a playa, piscinas y jacuzzis',
      'Ideal para familias o grupos',
    ],
    waMsg: 'Hola, quiero consultar disponibilidad del Apartamento Brisa Marina en Laguna Beach.',
    airbnb: 'https://www.airbnb.com.co/rooms/1194985151704329947',
  },
];

/* =========================================================
   2) BENEFICIOS / EL LUGAR (íconos SVG en línea)
   ========================================================= */
const ICONS = {
  wave: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2M3 10c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2"/>',
  pool: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M8 15V6a2 2 0 0 1 4 0M12 15V6a2 2 0 0 1 4 0M8 9h4"/>',
  jacuzzi: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zM7 11V6a2 2 0 1 1 4 0M9 4v1M13 6l1-1M16 7l1-1"/>',
  bar: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M5 4h14l-7 8zM12 12v6M8 21h8"/>',
  food: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4 3v7a2 2 0 0 0 4 0V3M6 10v11M17 3c-1.5 0-2.5 2-2.5 5S15 21 17 21s2-1 2-4V3z"/>',
  music: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="16" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  bed: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M3 18V7M3 12h18a0 0 0 0 1 0 0v6M21 18v-4M3 12V9a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v3"/>',
  home: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4 11 12 4l8 7M6 10v9h12v-9M10 19v-5h4v5"/>',
  kitchen: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M6 3h12v18H6zM6 9h12M10 5v2M10 13h.01"/>',
  family: '<circle cx="8" cy="7" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M3.5 20v-2a4.5 4.5 0 0 1 9 0v2M13.5 20v-1.5a3.5 3.5 0 0 1 7 0V20"/>',
  heart: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 20s-7-4.6-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7-.3C19 15.4 12 20 12 20z"/>',
  chat: '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M5 5h14v10H9l-4 4z"/>',
  globe: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17"/>',
};
const BENEFICIOS = [
  { i:'wave',    t:'Playa frente al mar',      d:'Sal directo a la arena y disfruta el mar de Tolú.' },
  { i:'pool',    t:'3 piscinas',               d:'Amplias piscinas para refrescarte todo el día.' },
  { i:'jacuzzi', t:'8 jacuzzis',               d:'Relájate en el agua caliente frente al paisaje.' },
  { i:'bar',     t:'Bar',                      d:'Cócteles y bebidas para acompañar tu descanso.' },
  { i:'food',    t:'Restaurante',              d:'Comparte una buena comida sin salir del complejo.' },
  { i:'music',   t:'Shows los fines de semana',d:'Música y ambiente para vivir noches inolvidables.' },
  { i:'bed',     t:'Suites hasta para 5',      d:'Cómodas y funcionales para parejas o familias.' },
  { i:'home',    t:'Apartamento moderno',      d:'2 habitaciones, sala y más espacio para tu grupo.' },
  { i:'kitchen', t:'Cocina en el apartamento', d:'Prepara tus comidas con total independencia.' },
  { i:'family',  t:'Ambiente familiar',        d:'Un entorno seguro y tranquilo para todos.' },
  { i:'heart',   t:'Parejas, familias y grupos',d:'La opción ideal según tu plan de viaje.' },
  { i:'chat',    t:'Reservas por WhatsApp',    d:'Consulta disponibilidad y reserva en minutos.' },
];

/* =========================================================
   3) GALERÍA
   ========================================================= */
const GALERIA = [
  { src:'img/panoramica.webp',  alt:'Vista aérea del complejo Brisa Marina con piscinas, bar y playa en Laguna Beach' },
  { src:'img/habitacion.webp',  alt:'Habitación de suite con cama amplia y decoración en tonos verdes' },
  { src:'img/balcon.webp',      alt:'Terraza del apartamento con mobiliario blanco frente al mar' },
  { src:'img/lugar.webp',       alt:'Piscinas y jacuzzis vistos desde lo alto con la playa al fondo' },
  { src:'img/atardecer.webp',   alt:'Atardecer sobre el mar de Tolú con cielo naranja y veleros' },
  { src:'img/vista.webp',       alt:'Playa de Laguna Beach con palmera y camastros junto al mar' },
  { src:'img/nocturno.webp',    alt:'Piscinas iluminadas con luces de colores durante un show nocturno' },
  { src:'img/balcon2.webp',     alt:'Terraza con mesa frente al mar al anochecer' },
];

/* =========================================================
   4) FAQ
   ========================================================= */
const FAQ = [
  { q:'¿Dónde están ubicados?', a:'En Laguna Beach, kilómetro 4 vía El Francés, Tolú, Sucre, frente al mar.' },
  { q:'¿Qué tipos de hospedaje tienen?', a:'2 suites con capacidad hasta para 5 personas cada una y un apartamento moderno de 2 habitaciones, sala, 3 camas tipo tarima y cocina.' },
  { q:'¿Cómo reservo?', a:'Consulta disponibilidad y reserva directamente por WhatsApp al 314 603 4150. También estamos en Airbnb y Booking.' },
  { q:'¿Qué incluye el lugar?', a:'Playa frente al mar, 3 piscinas, 8 jacuzzis, bar y restaurante, en un ambiente familiar ideal para parejas, familias y grupos.' },
  { q:'¿Los shows de fin de semana tienen costo adicional?', a:'Algunos shows o actividades de fin de semana pueden tener costo adicional. Recomendamos consultar al momento de reservar.' },
];

/* =========================================================
   RENDER
   ========================================================= */
const chk = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 6 9 17l-5-5"/></svg>';

function renderStays(){
  const grid = document.getElementById('staysGrid');
  if(!grid) return;
  grid.innerHTML = HOSPEDAJES.map((h, idx) => {
    const airbnbBtn = h.airbnb
      ? `<a class="btn btn--airbnb" href="${h.airbnb}" target="_blank" rel="noopener">Ver en Airbnb</a>` : '';
    return `
    <article class="stay-card reveal" style="transition-delay:${idx*90}ms">
      <div class="stay-card__media">
        <img src="${h.img}" alt="${h.alt}" loading="lazy" />
        <span class="stay-card__cap">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">${ICONS.family}</svg>
          ${h.etiqueta}
        </span>
      </div>
      <div class="stay-card__body">
        <h3 class="stay-card__name">${h.nombre}</h3>
        <p class="stay-card__desc">${h.descripcion}</p>
        <ul class="stay-card__features">
          ${h.features.map(f => `<li>${chk}<span>${f}</span></li>`).join('')}
        </ul>
        <div class="stay-card__actions">
          <a class="btn btn--wa" href="${wa(h.waMsg)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
          ${airbnbBtn}
        </div>
      </div>
    </article>`;
  }).join('');
}

function renderPerks(){
  const grid = document.getElementById('perksGrid');
  if(!grid) return;
  grid.innerHTML = BENEFICIOS.map((b, idx) => `
    <div class="perk reveal" style="transition-delay:${(idx%6)*50}ms">
      <div class="perk__ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[b.i]||''}</svg></div>
      <span>${b.t}</span>
    </div>`).join('');
}

function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  const zoom = '<span class="zoom" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4M11 8v6M8 11h6"/></svg></span>';
  grid.innerHTML = GALERIA.map((g, idx) => `
    <figure class="gallery__item reveal" data-index="${idx}" style="transition-delay:${(idx%4)*60}ms">
      <img src="${g.src}" alt="${g.alt}" loading="lazy" />
      ${zoom}
    </figure>`).join('');
}

function renderFaq(){
  const list = document.getElementById('faqList');
  if(!list) return;
  list.innerHTML = FAQ.map((f, idx) => `
    <div class="faq-item reveal" style="transition-delay:${Math.min(idx,6)*50}ms">
      <button class="faq-item__q" aria-expanded="false" aria-controls="faq-a-${idx}">
        ${f.q}<span class="plus" aria-hidden="true"></span>
      </button>
      <div class="faq-item__a" id="faq-a-${idx}" role="region"><p>${f.a}</p></div>
    </div>`).join('');
}

/* =========================================================
   INTERACCIONES
   ========================================================= */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
  els.forEach(e=>io.observe(e));
}

function initNav(){
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const toggle = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => toggle(!document.body.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') toggle(false); });
}

function initCounters(){
  const nums = document.querySelectorAll('.num[data-count]');
  if(!nums.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count;
      let cur = 0; const step = Math.max(1, Math.ceil(target/24));
      const tick = () => { cur = Math.min(target, cur+step); el.textContent = cur; if(cur<target) requestAnimationFrame(tick); };
      tick(); io.unobserve(el);
    });
  }, { threshold:.6 });
  nums.forEach(n=>io.observe(n));
}

function initFaq(){
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const ans = item.querySelector('.faq-item__a');
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : null;
    });
  });
}

function initParallax(){
  const layer = document.querySelector('[data-parallax]');
  if(!layer) return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const rect = layer.parentElement.getBoundingClientRect();
    const offset = (rect.top + rect.height/2 - window.innerHeight/2) * -0.12;
    layer.style.transform = `translateY(${offset}px)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if(!ticking){ requestAnimationFrame(update); ticking = true; } }, { passive:true });
  update();
}

function initLightbox(){
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  const items = [...document.querySelectorAll('.gallery__item')];
  if(!lb || !items.length) return;
  let current = 0;

  const show = (i) => {
    current = (i + GALERIA.length) % GALERIA.length;
    img.src = GALERIA[current].src;
    img.alt = GALERIA[current].alt;
    cap.textContent = GALERIA[current].alt;
  };
  const open = (i) => { show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };

  items.forEach((it,i) => it.addEventListener('click', () => open(i)));
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(current-1));
  document.getElementById('lbNext').addEventListener('click', () => show(current+1));
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('is-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') show(current-1);
    if(e.key === 'ArrowRight') show(current+1);
  });
}

function initVideo(){
  const v = document.getElementById('tourVideo');
  const btn = document.getElementById('tourPlay');
  if(!v || !btn) return;
  const play = () => { v.play().catch(()=>{}); btn.classList.add('is-hidden'); };
  btn.addEventListener('click', play);
  v.addEventListener('play', () => btn.classList.add('is-hidden'));
  v.addEventListener('pause', () => { if(!v.ended) btn.classList.remove('is-hidden'); });
  v.addEventListener('ended', () => btn.classList.remove('is-hidden'));
}

/* =========================================================
   LOADER + INIT
   ========================================================= */
function initLoader(){
  const loader = document.getElementById('loader');
  if(!loader) return;
  const hide = () => setTimeout(() => loader.classList.add('is-done'), 850);
  if(document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderStays();
  renderPerks();
  renderGallery();
  renderFaq();
  initReveal();
  initNav();
  initCounters();
  initFaq();
  initParallax();
  initLightbox();
  initVideo();
  initLoader();
});
