(function(){"use strict";/* === BEGIN main.js (with Cloudinary GLightbox support) === */

/* Apply .scrolled class */
function toggleScrolled(){const b=document.body;const h=document.querySelector('#header');if(!h)return;if(!h.classList.contains('scroll-up-sticky')&&!h.classList.contains('sticky-top')&&!h.classList.contains('fixed-top'))return;window.scrollY>100?b.classList.add('scrolled'):b.classList.remove('scrolled');}

document.addEventListener('scroll',toggleScrolled);window.addEventListener('load',toggleScrolled);

/* Mobile nav toggle */
const mobileNavToggleBtn=document.querySelector('.mobile-nav-toggle');
function mobileNavToogle(){document.body.classList.toggle('mobile-nav-active');mobileNavToggleBtn.classList.toggle('bi-list');mobileNavToggleBtn.classList.toggle('bi-x');}
if(mobileNavToggleBtn)mobileNavToggleBtn.addEventListener('click',mobileNavToogle);

/* Hide mobile nav on same-page/hash links */
document.querySelectorAll('#navmenu a').forEach(n=>{n.addEventListener('click',()=>{if(document.querySelector('.mobile-nav-active')){mobileNavToogle();}});});

/* Toggle mobile nav dropdowns */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(n=>{n.addEventListener('click',function(e){e.preventDefault();this.parentNode.classList.toggle('active');this.parentNode.nextElementSibling.classList.toggle('dropdown-active');e.stopImmediatePropagation();});});

/* Preloader */
const preloader=document.querySelector('#preloader');if(preloader){window.addEventListener('load',()=>{preloader.remove();});}

/* Scroll top button */
let scrollTop=document.querySelector('.scroll-top');function toggleScrollTop(){if(scrollTop){window.scrollY>100?scrollTop.classList.add('active'):scrollTop.classList.remove('active');}}
if(scrollTop)scrollTop.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});window.addEventListener('load',toggleScrollTop);document.addEventListener('scroll',toggleScrollTop);

/* AOS */
function aosInit(){AOS.init({duration:600,easing:'ease-in-out',once:true,mirror:false});}
window.addEventListener('load',aosInit);

/* Auto carousel indicators */
document.querySelectorAll('.carousel-indicators').forEach(ci=>{const c=ci.closest('.carousel');if(!c)return;c.querySelectorAll('.carousel-item').forEach((item,i)=>{ci.innerHTML+=`<li data-bs-target="${'#'+c.id}" data-bs-slide-to="${i}" ${i===0?'class="active"':''}></li>`;});});

/* === Cloudinary / MP4 video -> GLightbox config normalizer === */
function normalizeVideoLinks(){document.querySelectorAll('a.glightbox').forEach(a=>{const href=a.getAttribute('href')||'';const explicitType=a.dataset.type||'';if(/\.mp4($|[?#])/i.test(href)||explicitType==='video'){let conf='type:video;source:local;autoplay:true';if(a.dataset.poster)conf+=`;poster:${a.dataset.poster}`;a.setAttribute('data-glightbox',conf);}});}normalizeVideoLinks();

/* Init GLightbox */
const glightbox=GLightbox({selector:'.glightbox',autoplayVideos:true,touchNavigation:true,closeButton:true,openEffect:'fade',closeEffect:'fade'});

/* Isotope */
document.querySelectorAll('.isotope-layout').forEach(function(isoItem){let layout=isoItem.getAttribute('data-layout')??'masonry';let filter=isoItem.getAttribute('data-default-filter')??'*';let sort=isoItem.getAttribute('data-sort')??'original-order';let initIsotope;imagesLoaded(isoItem.querySelector('.isotope-container'),function(){initIsotope=new Isotope(isoItem.querySelector('.isotope-container'),{itemSelector:'.isotope-item',layoutMode:layout,filter:filter,sortBy:sort});});isoItem.querySelectorAll('.isotope-filters li').forEach(function(f){f.addEventListener('click',function(){isoItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');this.classList.add('filter-active');initIsotope.arrange({filter:this.getAttribute('data-filter')});if(typeof aosInit==='function'){aosInit();}},false);});});

/* Skills progress */
let skillsAnimation=document.querySelectorAll('.skills-animation');skillsAnimation.forEach(item=>{new Waypoint({element:item,offset:'80%',handler:function(){item.querySelectorAll('.progress .progress-bar').forEach(el=>{el.style.width=el.getAttribute('aria-valuenow')+'%';});}});});

/* Swiper */
function initSwiper(){document.querySelectorAll('.init-swiper').forEach(function(swEl){let config=JSON.parse(swEl.querySelector('.swiper-config').innerHTML.trim());if(swEl.classList.contains('swiper-tab')){initSwiperWithCustomPagination(swEl,config);}else{new Swiper(swEl,config);}});}window.addEventListener('load',initSwiper);

/* === END main.js === */
})();
