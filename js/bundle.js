document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.order-tab-button');
  const tabPanels = document.querySelectorAll('.order-tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab-id');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      this.classList.add('active');
      document.querySelector(`.order-tab-panel[data-tab-panel="${tabId}"]`).classList.add('active');
    });
  });

  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }
});


const menuButton = document.querySelector('.popup-menu-btn');
const mainMenu = document.querySelector('.header-nav');

if (menuButton && mainMenu) {
  menuButton.onclick = function () {
    const isMenuOpen = mainMenu.classList.toggle('show');
    menuButton.classList.toggle('active');

    if (window.matchMedia('(max-width: 1024px)').matches) {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    document.addEventListener('click', closeMenuOnClickOutside);

    function closeMenuOnClickOutside(event) {
      if (!mainMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mainMenu.classList.remove('show');
        menuButton.classList.remove('active');

        if (window.matchMedia('(max-width: 1024px)').matches) {
          document.body.style.overflow = '';
        }

        document.removeEventListener('click', closeMenuOnClickOutside);
      }
    }
  };
}

const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

function updatePlaceholder() {
  const searchInput = document.querySelector('.search-wrapper input[type="search"]');

  if (!searchInput) {
    return;
  }

  if (window.innerWidth <= 600) {
    searchInput.placeholder = "Введите трек-номер";
  }
}

window.addEventListener('load', updatePlaceholder);
window.addEventListener('resize', updatePlaceholder);


document.addEventListener('DOMContentLoaded', function () {
  const orderTabPanels = document.querySelector('.order-tab-panels');
  const mobileOrderDetails = document.querySelector('.mobile-order-details');
  const detailButtons = document.querySelectorAll('.btn-mobile');
  const closeButtons = document.querySelectorAll('.btn-close-order');

  detailButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const orderId = button.getAttribute('data-order');

      orderTabPanels.classList.add('hidden');

      mobileOrderDetails.classList.add('show');

      document.querySelectorAll('.order-details').forEach(detail => {
        detail.classList.remove('show');
      });

      const targetDetail = document.querySelector(`.order-details[data-order="${orderId}"]`);
      if (targetDetail) {
        targetDetail.classList.add('show');
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      mobileOrderDetails.classList.remove('show');

      document.querySelectorAll('.order-details').forEach(detail => {
        detail.classList.remove('show');
      });

      orderTabPanels.classList.remove('hidden');
    });
  });
});




document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');


  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
          modalElem = document.querySelector('.modal-dialog.' + modalId);
      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';
      overlay.style.overflow = 'hidden';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        resolve();
      }, 0);
    });
  }

  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');
      overlay.style.overflow = 'initial';

      setTimeout(function() {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        resolve();
      }, 500);
    });
  }

  /* open modal */
  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(item) {
    item.addEventListener('click', async function(e) {
      if (e.target !== e.currentTarget) {
        return;
      } else {
        await closeModal(this);
      }
    });
  });

});

if (typeof jQuery === 'undefined') {
  console.log('jQuery не подключен, слайдеры не будут инициализированы');
} else {
  $(document).ready(function(){
    if ($('.work-slider').length) {
      $('.work-slider').slick({
        slidesToShow: 5,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: false,
        infinite: true,
        variableWidth: false,
        initialSlide: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: '0',
              centerMode: false,
              initialSlide: 0,
            }
          },
          {
            breakpoint: 601,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
              variableWidth: false,
              centerPadding: '0',
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
              variableWidth: false,
              centerPadding: '0',
            }
          },
        ]
      });
    }

    $(document).ready(function() {
      $('.banner-slider-v2').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav-v2'
      });

      // Навигационный слайдер
      $('.slider-nav-v2').slick({
        slidesToShow: 'auto',
        slidesToScroll: 1,
        asNavFor: '.banner-slider-v2',
        dots: false,
        focusOnSelect: true,
        variableWidth: true,
        centerPadding: '0px',
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 4,
              variableWidth: false,
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 4,
              variableWidth: false,
            }
          }
        ]
      });
    });

  });
}




document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.input-js').forEach(container => {
    const inputText = container.querySelector('.input-text');
    const editForm = container.querySelector('.edit-form');
    const editedText = container.querySelector('.edited-text');

    editedText.value = inputText.textContent.trim();
    editForm.style.display = 'none';
  });

  // Делегирование событий
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-button')) {
      const container = e.target.closest('.input-js');
      const inputText = container.querySelector('.input-text');
      const editForm = container.querySelector('.edit-form');
      const editedText = container.querySelector('.edited-text');

      if (editForm.style.display === 'none') {
        inputText.style.display = 'none';
        editForm.style.display = 'flex';
        editForm.classList.add('show');
        editedText.value = inputText.textContent.trim();
        editedText.focus();
      } else {
        saveChanges(container);
        editForm.classList.remove('show');
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('edited-text')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveChanges(e.target.closest('.input-js'));
      }
    }
  });

  function saveChanges(container) {
    const inputText = container.querySelector('.input-text');
    const editForm = container.querySelector('.edit-form');
    const editedText = container.querySelector('.edited-text');
    const editButton = container.querySelector('.edit-button');

    inputText.textContent = editedText.value.trim() || inputText.textContent;
    inputText.style.display = 'flex';
    inputText.style.display = 'flex';
    editForm.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const notificationItems = document.querySelectorAll('.input-item-checkbox');

  notificationItems.forEach(function(item) {
    const label = item.querySelector('label');
    const checkbox = item.querySelector('input[type="checkbox"]');

    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-wrapper';
    item.insertBefore(wrapper, checkbox);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    wrapper.addEventListener('click', function(e) {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }

      if (checkbox.checked) {
        wrapper.classList.add('active');
      } else {
        wrapper.classList.remove('active');
      }

      checkbox.dispatchEvent(new Event('change'));
      checkbox.dispatchEvent(new Event('input'));
    });

    if (checkbox.checked) {
      wrapper.classList.add('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const passwordContainers = document.querySelectorAll('.password-js');

  passwordContainers.forEach(container => {
    const button = container.querySelector('.show-pass-button');
    const input = container.querySelector('.edited-text');

    button.addEventListener('click', function() {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });
  });
})



