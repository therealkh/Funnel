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
    console.log(parent);
    const slides = document.querySelectorAll('.services__slider .single-slide');
    //console.log(slides);
    const bgUrl = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${slides[nextSlide].getAttribute('data-bg')}')`;
    parent.style.backgroundImage = bgUrl;
    console.log(bgUrl);
  });




  $('.portfolio-items').slick({
    slidesToShow: 1,
    arrows: true,
    infinite: false,
    variableWidth: true,
    prevArrow: '.portfolio-items-p',
    nextArrow: '.portfolio-items-n',
  });
  const dots = document.querySelectorAll('.portfolio-dot');
  const dotsBlock = document.querySelector('.portfolio-dots');
  dots.forEach((dot, id) => {
    dot.addEventListener('click', () => {
      if (!dot.classList.contains('active')) {
        $('.portfolio-items').slick('slickGoTo', id);
      }
    })
  })
  $('.portfolio-items').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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

});


document.body.onload = () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.style.opacity = '0'
  }, 0)
  setTimeout(() => {
    preloader.style.display = 'none'
  }, 0);
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
  const portfolio_wrapper = document.querySelector('.partfolio__wrapper');
  const intro_container = document.querySelector('.intro>.container');
  const portfolio_container = document.querySelector('.partfolio>.container');
  const team_circles = document.querySelectorAll('.team-circle');
  const team_name = document.querySelector('.team__info-name');
  const team_text = document.querySelector('.team__info-text');
  const team_img = document.querySelector('.team__img');
  const team_info = document.querySelector('.team__info');
  const team_all = document.querySelector('.team-all');
  console.log(team_all);
  let intro_container_left = (parseFloat(window.getComputedStyle(intro_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(intro_container).getPropertyValue("padding-left")));
  let portfolio_container_left = (parseFloat(window.getComputedStyle(portfolio_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(portfolio_container).getPropertyValue("padding-left")));
  let unlock = true;
  let timeout = 400;
  let portfolio_left_offset = portfolio_container_left - intro_container_left;
  portfolio_wrapper.style.marginLeft = `-${portfolio_left_offset}px`;



  //Listeners
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
      openMenu();
    }
    else {
      closeMenu();
    }
  })
  team_all.addEventListener('mouseenter', () => {
    team_info.classList.add('hide');
    //alert(123);
    //team_img.classList.remove('hide');
  })
  team_all.addEventListener('mouseleave', () => {
    team_info.classList.remove('hide');
    //team_img.classList.remove('hide');
  })
  team_circles.forEach(item => {
    item.addEventListener('click', () => {
      if (item.getAttribute('data-name') && item.getAttribute('data-surname') && item.getAttribute('data-img') && item.getAttribute('data-text')) {
        let name = `${item.getAttribute('data-name')}<span> ${item.getAttribute('data-surname')}</span>`;
        let img = `<img src="${item.getAttribute('data-img')}" alt="">`
        if (!team_img.classList.contains('hide')) {
          team_info.classList.add('hide');
          team_img.classList.add('hide');
          setTimeout(() => {
            team_name.innerHTML = name;
            team_img.innerHTML = img;
            team_text.textContent = item.getAttribute('data-text');
            //team_info.classList.remove('hide');
            team_img.classList.remove('hide');
          }, 300)
        }
      }
    })
  })

  window.addEventListener('resize', () => {
    intro_container_left = (parseFloat(window.getComputedStyle(intro_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(intro_container).getPropertyValue("padding-left")));
    portfolio_container_left = (parseFloat(window.getComputedStyle(portfolio_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(portfolio_container).getPropertyValue("padding-left")));
    portfolio_left_offset = portfolio_container_left - intro_container_left;
    portfolio_wrapper.style.marginLeft = `-${portfolio_left_offset}px`;

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
    console.log(popup);
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


  //Elements
  new fullpage('#fullpage', {
    onLeave: function (origin, destination, direction) {
      let leavingSection = this;

      //after leaving section 1
      if (origin.index == 0 && direction == 'down') {
        header.classList.remove('ontop');
      }

      else if (origin.index == 1 && direction == 'up') {
        header.classList.add('ontop');
      }
    }
  });
})
