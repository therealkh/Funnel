document.body.onload = () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
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
  const menuBtn = document.querySelector('.menu-btn');
  const wrappers = document.querySelectorAll('.block__wrapper');
  const menu = document.querySelector('.header__links');
  const footer = document.querySelector('footer');
  const pItems = document.querySelectorAll('.news-item');
  const menuLinks = document.querySelectorAll('.menu-link');
  console.log(wrappers);
  let unlock = true;
  let timeout = 400;
  const lang = document.querySelector('.header__lang');
  lang.addEventListener('click', () => {
    lang.classList.toggle('opened');
  })
  const map = document.querySelector('.footer-left__map');
  map.style.maxHeight = `${map.clientWidth}px`;
  let pMarginBottom = pItems[1].getBoundingClientRect().left - (pItems[0].getBoundingClientRect().left + pItems[0].offsetWidth);
  pItems.forEach((item, index) => {
    item.style.marginBottom = `${pMarginBottom}px`;
    let id = item.querySelector('.news-item__id');
    id.textContent = `0${index + 1}`;
  })


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

  menuLinks.forEach((link, id) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      let anchor = link.getAttribute('href');
      fullpage_api.moveTo(getSectionIdByAnchor(anchor));
      closeMenu();
      menuBtn.classList.remove('active');
    })
  })






  window.addEventListener('resize', () => {
  })
  window.addEventListener('scroll', () => {
    let footerOffset = footer.getBoundingClientRect().top;
    //console.log(footerOffset);
    if (footerOffset < 100) {
      header.classList.add('ontop');
    }
    else {
      header.classList.remove('ontop');
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
    wrappers.forEach((item, index, arr) => {
      item.style.opacity = 0;
    })
  }
  function closeMenu() {
    menu.classList.remove('active')
    wrappers.forEach((item, index, arr) => {
      item.style.opacity = 1;
    })
  }
})
