// dark / light theme - toggler
const themeMap = {
  dark: "light",
  light: "dark"
};

//check if local item exist or create one
const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);

const appClass = document.querySelector(".app").classList;
appClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];
  appClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.querySelector('li[data-set="themeBtn"]').onclick = toggleTheme;
