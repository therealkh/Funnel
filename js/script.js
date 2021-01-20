const anchor = window.location.hash;
window.location.hash = '';
$(document).ready(function () {

  $('.services__slider').slick({
    prevArrow: '.services__slider-p',
    nextArrow: '.services__slider-n',
    infinite: false,
    dots: true,
    appendDots: '.services__dots',
  });

  $('.services__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    const parent = document.querySelector('.services')
    //console.log(parent);
    const slides = document.querySelectorAll('.services__slider .single-slide');
    //console.log(slides);
    const bgUrl = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${slides[nextSlide].getAttribute('data-bg')}')`;
    parent.style.backgroundImage = bgUrl;
    //console.log(bgUrl);
  });

  $('.news-items').slick({
    slidesToShow: 1,
    arrows: true,
    infinite: false,
    variableWidth: true,
    dots: false,
    prevArrow: '.news-items-p',
    nextArrow: '.news-items-n',
  });


  $('.partfolio-items').slick({
    slidesToShow: 1,
    arrows: true,
    infinite: false,
    variableWidth: true,
    prevArrow: '.partfolio-items-p',
    nextArrow: '.partfolio-items-n',
  });
  const dots = document.querySelectorAll('.partfolio-dot');
  const dotsBlock = document.querySelector('.partfolio-dots');
  dots.forEach((dot, id) => {
    dot.addEventListener('click', () => {
      if (!dot.classList.contains('active')) {
        $('.partfolio-items').slick('slickGoTo', id);
      }
    })
  })
  $('.partfolio-items').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    dots.forEach((dot, id) => {
      if (id === nextSlide) {
        dot.classList.add('active');
        dotsBlock.scroll({
          top: 0,
          left: dot.getBoundingClientRect().left - dotsBlock.getBoundingClientRect().left,
          behavior: 'smooth'
        })
      }
      else if (dot.classList.contains('active')) {
        dot.classList.remove('active');
      }
    })
  });
  $('.reviews__slider').slick({
    prevArrow: '.reviews-slide-p',
    nextArrow: '.reviews-slide-n',
    infinite: false,
  });
});


document.body.onload = () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    if (anchor) {
      setTimeout(() => {
        fullpage_api.moveTo(getSectionIdByAnchor(anchor));
      }, 500);
    }
  }, 500)
  setTimeout(() => {
    preloader.style.display = 'none'
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {

  const ppOpeners = document.querySelectorAll('.popup-open');
  const ppClosers = document.querySelectorAll('.popup-close');
  const popups = document.querySelectorAll('.popup');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');
  const header = document.querySelector('header')
  const sections = document.querySelectorAll('section');
  const menuBtn = document.querySelector('.menu-btn');
  const wrappers = document.querySelectorAll('.block__wrapper');
  const menu = document.querySelector('.header__links');
  const partfolio_wrapper = document.querySelector('.partfolio__wrapper');
  const news_wrapper = document.querySelector('.news__wrapper');
  const intro_container = document.querySelector('.intro>.container');
  const partfolio_container = document.querySelector('.partfolio>.container');
  const team_circles = document.querySelectorAll('.team-circle');
  const team_name = document.querySelector('.team__info-name');
  const team_text = document.querySelector('.team__info-text');
  const team_img = document.querySelector('.team__img');
  const team_info = document.querySelector('.team__info');
  const team_all = document.querySelector('.team-all');
  const team_all_m = document.querySelector('.team-all-mobile');
  const team_all_btn = document.getElementById('team_see_all');
  const news = document.querySelectorAll('.news-item');
  const gotoSlideAnchors = document.querySelectorAll('.gotoSlide');
  const menuLinks = document.querySelectorAll('.menu-link');
  const promoPopup = document.getElementById('promo');
  setTimeout(() => {
    openPopup(promoPopup)
    startPromoTimer();
  }, 3000);
  //console.log(team_all);
  let intro_container_left = (parseFloat(window.getComputedStyle(intro_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(intro_container).getPropertyValue("padding-left")));
  let partfolio_container_left = (parseFloat(window.getComputedStyle(partfolio_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(partfolio_container).getPropertyValue("padding-left")));
  let unlock = true;
  let timeout = 400;
  let promo_timeOut = 300;
  let partfolio_left_offset = partfolio_container_left - intro_container_left;
  partfolio_wrapper.style.marginLeft = `-${partfolio_left_offset}px`;
  news_wrapper.style.marginLeft = `-${partfolio_left_offset}px`;

  const form = document.querySelector('form#sendForm');
  const catalogForm = document.querySelector('form#sendDiagnostics');
  const promoForm = document.querySelector('form#sendPromo');
  form.onsubmit = (event) => {
    send(form, event, 'mailer/sendForm.php', 'Спасибо! Ваша заявка была отправлена.')
  }
  promoForm.onsubmit = (event) => {
    send(form, event, 'mailer/sendPromo.php', 'Спасибо! Ваша заявка была отправлена.')
  }
  catalogForm.onsubmit = (event) => {
    send(catalogForm, event, 'mailer/sendDiagnostics.php', 'Ваша заявка была отправлена. Спасибо за Ваш интерес!')
  }



  const lang = document.querySelector('.header__lang');
  lang.addEventListener('click', () => {
    lang.classList.toggle('opened');
  })
  const map = document.querySelector('.footer-left__map');
  map.style.maxHeight = `${map.clientWidth}px`;

  news.forEach((item, index) => {
    let id = item.querySelector('.news-item__id');
    id.textContent = `0${index + 1}`;
  })

  //Listeners
  menuLinks.forEach((link, id) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      let anchor = link.getAttribute('href');
      fullpage_api.moveTo(getSectionIdByAnchor(anchor));
      closeMenu();
      menuBtn.classList.remove('active');
    })
  })
  gotoSlideAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      fullpage_api.moveTo(3);
      const target = e.target;
      let slideId = parseInt(target.getAttribute('data-slide-id'));
      $('.services__slider').slick('slickGoTo', slideId);
    })

  })
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
      openMenu();
    }
    else {
      closeMenu();
    }
  })


  team_all_btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let team_block;
    if (document.body.clientWidth > 991) {
      team_block = team_all;
    }
    else {
      team_block = document.querySelector('.team-all-mobile')
    }
    if (!team_block.classList.contains('opened')) {
      team_block.classList.add('opened');
      team_info.classList.add('hide');
      team_img.classList.add('hide');
    }
  })

  team_circles.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.getAttribute('data-name') && item.getAttribute('data-surname') && item.getAttribute('data-img') && item.getAttribute('data-text')) {
        let name = `${item.getAttribute('data-name')}<span> ${item.getAttribute('data-surname')}</span>`;
        let img = `<img src="${item.getAttribute('data-img')}" alt="">`
        //if (!team_img.classList.contains('hide')) {
        team_info.classList.add('hide');
        team_img.classList.add('hide');
        setTimeout(() => {
          team_name.innerHTML = name;
          team_img.innerHTML = img;
          team_text.textContent = item.getAttribute('data-text');
          //team_info.classList.remove('hide');
          team_img.classList.remove('hide');
          team_info.classList.remove('hide');

          let team_block;
          if (document.body.clientWidth > 1024) {
            team_block = team_all;
          }
          else {
            team_block = document.querySelector('.team-all-mobile')
          }
          if (team_block.classList.contains('opened')) {
            team_block.classList.remove('opened');
          }
        }, 300)
        //}
      }
    })
  })

  team_all_m.addEventListener('click', (e) => {
    if (team_all_m.classList.contains('opened')) {
      team_all_m.classList.remove('opened');
      team_img.classList.remove('hide');
      team_info.classList.remove('hide');
    }
  })
  document.querySelector('.team').addEventListener('click', (e) => {
    if (team_all.classList.contains('opened')) {
      team_all.classList.remove('opened');
      team_img.classList.remove('hide');
      team_info.classList.remove('hide');
    }
  })
  team_all.addEventListener('mouseenter', (e) => {
    if (!team_all.classList.contains('opened')) {
      if (!team_info.classList.contains('hide')) {
        team_info.classList.add('hide');
      }
    }
  })
  team_all.addEventListener('mouseleave', (e) => {
    if (!team_all.classList.contains('opened')) {
      if (team_info.classList.contains('hide')) {
        team_info.classList.remove('hide');
      }
    }
  })
  window.addEventListener('resize', () => {
    intro_container_left = (parseFloat(window.getComputedStyle(intro_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(intro_container).getPropertyValue("padding-left")));
    partfolio_container_left = (parseFloat(window.getComputedStyle(partfolio_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(partfolio_container).getPropertyValue("padding-left")));
    partfolio_left_offset = partfolio_container_left - intro_container_left;
    partfolio_wrapper.style.marginLeft = `-${partfolio_left_offset}px`;

  })
  //PopUp
  if (ppOpeners.length > 0) {
    for (let i = 0; i < ppOpeners.length; i++) {
      const ppOpener = ppOpeners[i];
      ppOpener.addEventListener('click', (event) => {
        const ppCurrent = document.querySelector(ppOpener.getAttribute('href'));
        openPopup(ppCurrent);
        event.preventDefault();
      })
    }
  }
  if (ppClosers.length > 0) {
    ppClosers.forEach((item, index, arr) => {
      item.addEventListener('click', (event) => {
        const activePopup = document.querySelector('.popup.opened');
        if (activePopup) { closePopup(activePopup) }
        event.preventDefault();
      })
    })
  }
  if (popups.length > 0) {
    for (let i = 0; i < popups.length; i++) {
      popups[i].addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(popups[i]);
        }
      })
    }
  }
  function openPopup(popup) {
    fullpage_api.setAllowScrolling(false);
    if (popup && unlock) {
      const popupActive = document.querySelector('.popup.opened');
      if (popupActive) {
        closePopup(popupActive, false);
      }
      else {
        bodyLock();
      }
      popup.classList.add('opened');
      popup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(event.target.closest('.popup'));
        }
      })
    }
  }
  function closePopup(popup, doUnlock = true) {
    fullpage_api.setAllowScrolling(true);
    if (unlock) {
      popup.classList.remove('opened');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
  function openResultPopup(msg = 'Спасибо! Ваша заявка была отправлена.') {
    const msgNode = document.querySelector('#result .result-msg');
    msgNode.textContent = msg;
    openPopup(document.querySelector('#result'));
  }
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px';
    //console.log(lockPaddingValue);
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  function bodyUnlock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = '';
        }
      }
      body.style.paddingRight = '';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const activePopup = document.querySelector('.popup.opened');
      closePopup(activePopup);
    }
    if (e.key === 'r') {
      //ScrollTo(sections[currentSection]);
    }
  })



  //Functions
  function startPromoTimer() {
    let promoTimer = setInterval(() => {
      const timerNode = document.getElementById('promo-time');
      let min = Math.floor(promo_timeOut / 60);
      let sec = promo_timeOut - min * 60;
      let secS = ''
      let minS = ''
      if (sec < 10) {
        secS = `0${sec}`;
        console.log(secS);
      }
      else {
        secS = `${sec}`;
      }


      if (min < 10) {
        minS = `0${min}`
        console.log(minS);
      }
      else {
        minS = `${min}`;
      }


      let timeStr = `${minS}:${secS}`;
      console.log(timeStr);
      timerNode.textContent = timeStr;
      if (promo_timeOut <= 0) {
        clearInterval(promoTimer);
        if (promoPopup.classList.contains('opened')) {
          closePopup(promoPopup);
        }
      }
      promo_timeOut--;
    }, 1000);
  }
  function openResultPopup(msg = 'Спасибо! Ваша заявка была отправлена.') {
    const msgNode = document.querySelector('#result .result-msg');
    msgNode.textContent = msg;
    openPopup(document.querySelector('#result'));
  }
  function openMenu() {
    menu.classList.add('active')
    fullpage_api.setAllowScrolling(false);
    wrappers.forEach((item, index, arr) => {
      item.style.opacity = 0;
    })
  }
  function closeMenu() {
    menu.classList.remove('active')
    fullpage_api.setAllowScrolling(true);
    wrappers.forEach((item, index, arr) => {
      item.style.opacity = 1;
    })
  }
  function send(form, event, php, succesMSG) {
    const btn = form.querySelector('#formSubmit');

    const oldTextContent = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.setAttribute('disabled', 'disabled');
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(succesMSG);
        } else {
          // Если произошла ошибка
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(`Ой... Ошибка. Сообщение не отправлено (${json.result})`);
        }
        // Если не удалось связаться с php файлом
      } else {
        btn.textContent = oldTextContent;
        btn.removeAttribute('disabled');
        openResultPopup('Ошибка сервера. Код ошибки: ' + req.status);
        //alert("Ошибка сервера. Номер: " + req.status);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
  }




  //Elements
  new fullpage('#fullpage', {
    normalScrollElements: '.popup',
    onLeave: function (origin, destination, direction) {
      let leavingSection = this;
      //console.log(origin);
      //console.log(destination);
      //after leaving section 1
      if (origin.index == 0 && direction == 'down') {
        header.classList.remove('ontop');
      }

      else if (origin.index == 1 && direction == 'up') {
        header.classList.add('ontop');
      }
      //parfolio block
      if (destination.index == 3) {
        menu.classList.add('black')
      }
      else if (destination.index == 5) {
        menu.classList.add('black')
      }
      else if (destination.index == 6) {
        menu.classList.add('black')
      }
      else {
        menu.classList.remove('black')
      }
    }
  });
})
function getSectionIdByAnchor(anchor) {
  anchor = anchor.slice(anchor.indexOf('#') + 1);
  //console.log(anchor);
  let secID = 0;
  switch (anchor) {
    case 'intro':
      secID = 1;
      break;
    case 'problems':
      secID = 2;
      break;
    case 'services':
      secID = 3;
      break;
    case 'partfolio':
      secID = 4;
      break;
    case 'team':
      secID = 5;
      break;
    case 'news':
      secID = 6;
      break;
    case 'footer':
      secID = 7;
      break;
    default:
      secID = 0;
      break;
  }
  return secID;
}

