$(document).ready(function () {
  $('.stages__slider').slick({
    prevArrow: '.stages__slider-prev',
    nextArrow: '.stages__slider-next',
    infinite: false,
    dots: true,
    appendDots: '.stages__title',
    //autoplay: true,
    //autoplaySpeed: 8000
    //fade: true
  });
  $('.stages__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    const dots = document.querySelectorAll('.slick-dots li')
    for (let i = 0; i <= dots.length - 1; i++) {
      if (i <= nextSlide) {
        dots[i].classList.add('active');
      }
      else {
        dots[i].classList.remove('active');
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.header__menuBtn');
  const menu = document.querySelector('.header__menu');
  const ppOpeners = document.querySelectorAll('.popup-open');
  const ppClosers = document.querySelectorAll('.popup-close');
  const popups = document.querySelectorAll('.popup');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');
  const menuLinks = document.querySelectorAll('.header__menu>ul>li>a');
  //const decorsLeft = document.querySelectorAll('.decor-left');
  const decoratedBlocks = document.querySelectorAll('.decorated');
  const form = document.querySelector('form#sendForm');
  const catalogForm = document.querySelector('form#sendCatalog');

  //const prevDef = document.querySelectorAll('.prevDef');
  //prevDef.forEach((el) => { el.addEventListener('click', (e) => { e.preventDefault(); }) });

  console.dir(form);
  form.onsubmit = (event) => {
    send(form, event, 'mailer/sendForm.php', 'Спасибо! Ваша заявка была отправлена.')
  }
  catalogForm.onsubmit = (event) => {
    send(catalogForm, event, 'mailer/sendCatalog.php', 'Спасибо за Ваш интерес. Скоро вышлем каталог!')
  }

  //form.addEventListener('sumbit', (e) => {
  //})
  console.log(decoratedBlocks);
  document.addEventListener('mousemove', event => {
    if (event.target.closest('.decorated')) {
      block = event.target.closest('.decorated');
      const decorLeft = block.querySelector('.decor-left');
      const decorRight = block.querySelector('.decor-right');
      //console.log(`Y(${event.clientY}) X(${event.clientX})`);
      const width = block.offsetWidth;
      const height = block.offsetHeight;
      const offset = 10;
      decorLeft.style.transform = `translate(${-1 * (offset * (event.clientX / width))}px, ${-1 * (offset * (event.clientY / height))}px)`;
      decorRight.style.transform = `translate(${-1 * (offset * (event.clientX / width))}px, ${-1 * (offset * (event.clientY / height))}px)`;
      //decorRight.style.transform = `rotateX(${-(event.clientX / 70)}deg) rotateY(${-(event.clientY / 70)}deg)`;

    }
  })
  for (let i = 0; i < decoratedBlocks.length; i++) {
    block = decoratedBlocks[i];

  }
  menuLinks.forEach((item, index, arr) => {
    item.addEventListener('click', () => {
      if (isMobileMenu) {
        onBurgerClicked();
      }
    })
  })
  let isMobileMenu = false;
  let unlock = true;
  let timeout = 400;

  //Listeners
  document.addEventListener('click', (e) => {
    if (e.target.closest('.header__menuBtn')) {
      onBurgerClicked();
    }
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
    const lockPaddingValue = window.innerWidth - document.querySelector('.intro').offsetWidth + 'px';
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
    //console.log(typeof (e.key));
  })
  //Functions
  function onBurgerClicked() {
    menuBtn.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
      openMobileMenu();
    }
    else {
      closeMobileMenu();
    }
  }
  function openMobileMenu() {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
    isMobileMenu = true;
  }
  function closeMobileMenu() {
    menu.classList.remove('active');
    document.body.style.overflow = '';
    isMobileMenu = false;
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

})
