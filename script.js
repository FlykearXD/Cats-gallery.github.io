function openImage(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
}

function closeImage() {
  document.getElementById("lightbox").style.display = "none";
}

const body = document.getElementById('body');
const themeBtns = document.querySelectorAll('.theme-btn');

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const bgChoice = btn.getAttribute('data-bg');
    localStorage.setItem('bgChoice', bgChoice);
    setBg(bgChoice);
  });
});

function setBg(bgChoice) {
  switch(bgChoice) {
    case 'soft':
      body.style.background = 'linear-gradient(90deg, rgb(150, 255, 220), rgb(150, 255, 255))';
      break;
    case 'dark':
      body.style.background = 'linear-gradient(90deg, #111, #333)';
      break;
    case 'purple-dark':
      body.style.background = 'linear-gradient(90deg, #2c003e, #5e006f)';
      break;
    case 'purple-light':
      body.style.background = 'linear-gradient(90deg, #a47cff, #d9aaff)';
      break;
    case 'sunset':
      body.style.background = 'linear-gradient(90deg, #ff9a8b, #ff6a88, #ff99ac)';
      break;
  }
}

// при загрузке страницы ставим сохранённый фон
window.onload = () => {
  const savedBg = localStorage.getItem('bgChoice') || 'soft';
  setBg(savedBg);
};

function setBtnBorders(bgChoice) {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const darkThemes = ['dark', 'purple-dark'];
  const lightThemes = ['soft', 'purple-light', 'sunset'];

  themeBtns.forEach(btn => {
    if (darkThemes.includes(bgChoice)) {
      btn.style.borderColor = 'white';
    } else {
      btn.style.borderColor = 'black';
    }
  });
}

// Пример при выборе темы
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const bgChoice = btn.getAttribute('data-bg');
    localStorage.setItem('bgChoice', bgChoice);
    setBg(bgChoice);        // твоя функция смены фона
    setBtnBorders(bgChoice); // обновляем обводку
  });
});

// При загрузке страницы
window.onload = () => {
  const savedBg = localStorage.getItem('bgChoice') || 'soft';
  setBg(savedBg);
  setBtnBorders(savedBg);
};

// === НИК ===
window.addEventListener('load', () => {
  const nicknameInput = document.getElementById('nickname');
  const saveBtn = document.getElementById('save-nickname');

  if (nicknameInput && saveBtn) {
    // Загружаем сохранённый ник
    const savedNick = localStorage.getItem('nickname') || 'Гость';
    nicknameInput.value = savedNick;

    // Сохраняем новый ник без уведомления
    saveBtn.addEventListener('click', () => {
      const newNick = nicknameInput.value.trim();
      if (newNick !== '') {
        localStorage.setItem('nickname', newNick);
        nicknameInput.value = newNick;
      }
    });
  }
});



// ==== Аватар для всех страниц ====
const avatarBtn = document.getElementById('change-avatar-btn'); 
const avatarChoicesBlock = document.getElementById('avatar-choices'); 
const avatarChoices = document.querySelectorAll('.avatar-choice'); 
const navAvatar = document.querySelector('.my-avatar'); 
const currentAvatar = document.getElementById('current-avatar'); 
const settingsAvatar = document.querySelector('.settings-avatar'); 

// функция для обновления аватара везде
function updateAvatar(path) {
  [navAvatar, currentAvatar, settingsAvatar].forEach(img => {
    if (img) img.src = path;
  });
}

// при загрузке страницы подгружаем аватар
window.addEventListener('load', () => {
  const savedAvatar = localStorage.getItem('userAvatar') || 'avatars/ava1.jpg';
  updateAvatar(savedAvatar);
});

// если есть кнопка и панель выбора
if (avatarBtn && avatarChoicesBlock) {
  // открыть/закрыть панель
  avatarBtn.addEventListener('click', () => {
    avatarChoicesBlock.classList.toggle('active');
  });

  // выбор аватара
  avatarChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      const selectedAvatar = choice.getAttribute('data-avatar');
      if (selectedAvatar) {
        localStorage.setItem('userAvatar', selectedAvatar);
        updateAvatar(selectedAvatar);
        avatarChoicesBlock.classList.remove('active');
      }
    });
  });
}

// ==== Секретный аватар ====
document.addEventListener("DOMContentLoaded", () => {
  const avatarChoicesBlock = document.getElementById("avatar-choices");

  if (localStorage.getItem("secretUnlocked") === "true" && avatarChoicesBlock) {
    const img = document.createElement("img");
    img.src = "avatars/secret.jpg"; // можно тоже хранить в localStorage
    img.alt = "Секретный аватар";
    img.classList.add("avatar-choice");
    img.setAttribute("data-avatar", img.src);

    avatarChoicesBlock.appendChild(img);

    img.addEventListener("click", () => {
      localStorage.setItem("userAvatar", img.src);
      updateAvatar(img.src);
      avatarChoicesBlock.classList.remove("active");
    });
  }
});

const secretBtn = document.getElementById("secret-avatar");
const avatarchoicesblock = document.getElementById("avatar-choices");
const navavatar = document.querySelector('.my-avatar');
const currentavatar = document.getElementById('current-avatar');

window.addEventListener("DOMContentLoaded", () => {
  const secretBtn = document.getElementById("secret-btn"); // кнопка в новости
  const avatarChoicesBlock = document.getElementById("avatar-choices");
  const navAvatar = document.querySelector('.my-avatar');
  const currentAvatar = document.getElementById('current-avatar');

  // Если кнопка уже нажата ранее — скрываем её
  if (secretBtn && localStorage.getItem('secretUnlocked') === 'true') {
    secretBtn.style.display = 'none';
  }

  if (secretBtn) {
    secretBtn.addEventListener("click", () => {
      const secretAvatarPath = 'avatars/secret.jpg';

      // Сохраняем секрет для текущего пользователя
      localStorage.setItem('secretUnlocked', 'true');
      localStorage.setItem('userAvatar', secretAvatarPath);

      // Обновляем аватары на странице
      [navAvatar, currentAvatar].forEach(img => {
        if (img) img.src = secretAvatarPath;
      });

      // Добавляем в выбор аватаров
      if (avatarChoicesBlock) {
        const img = document.createElement("img");
        img.src = secretAvatarPath;
        img.alt = "Секретный аватар";
        img.classList.add("avatar-choice");
        img.setAttribute("data-avatar", secretAvatarPath);

        // клик по аватару
        img.addEventListener("click", () => {
          localStorage.setItem('userAvatar', secretAvatarPath);
          [navAvatar, currentAvatar].forEach(i => { if(i) i.src = secretAvatarPath });
          avatarChoicesBlock.classList.remove("active");
        });

        avatarChoicesBlock.appendChild(img);
      }

      // Скрываем кнопку после клика
      secretBtn.style.display = 'none';
      alert("🎉 Секретный аватар открыт! Теперь он доступен в настройках профиля.");
    });
  }
});
 