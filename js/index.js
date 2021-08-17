const expClasses = JSON.parse(data);

const qs = document.querySelector.bind(document);

const unit = " kg/m3";

// set some elements were going to place data into
const el_cname = qs(".name");
const span_min_dur = qs(".min_dur");
let span_cat = qs('.cat');
let span_wc = qs('.max_wc');
let span_desc = qs('.desc');
const span_min_cem = qs('.min_cem_no_ash');
const span_cem_1_ash = qs('.cem_1_ash');
const span_min_ash_cem1 = qs('.min_ash_cem1');


//set actual class to default null and update element
let actClass = 0;

// controll buttons
let nextBtn = qs(`div[data-set="next"]`);
let prevBtn = qs(`div[data-set="prev"]`);
let buttons = [nextBtn, prevBtn];

for(const e of buttons){
  e.addEventListener("click", ()=>{
    e.dataset.set  == 'next' ? next() :" ";
    e.dataset.set == 'prev' ? prev() :" ";
  })
}

//set variable for actualClass object and init fx
let actClassEl = expClasses[`${actClass}`];
elUpdate();


// controll functions - prev next +-=
function prev() {
  //check if var is bigger than 0 and if is not 0
  if(actClass>0 && actClass != 0) {
    actClass -= 1;
    //if act var is equal 0
  } else if (actClass == 0) {
    actClass = 20;
  }
  // update elem
  elUpdate();
}

function next() {
  if (actClass < (expClasses.length - 1)) {
    actClass += 1;
  } else {
    actClass = 0;
  }

  elUpdate();
}

// our baaad looking updater
// needs some upgrades in the future :/
function elUpdate() {
  actClassEl = expClasses[`${actClass}`];
  el_cname.innerHTML = expClasses[`${actClass}`].name;
  span_wc.innerText = "W/C max: " + actClassEl.max_wc;
  span_desc.innerText = "Opis: " + actClassEl.desc;
  span_cat.innerText = actClassEl.cat;
  span_min_dur.innerText = "Minimalna klasa wytrzymałości: " + actClassEl.min_dur;
  span_min_cem.innerText = "Bez stosowania popiołu lotnego: " + actClassEl.min_cem_no_ash + unit;
  span_cem_1_ash.innerText = "CEM I: " + actClassEl.cem_1_ash + unit;
  span_min_ash_cem1.innerText = "Minimum zawartości popiołu lotnego (PN-EN450): " + actClassEl.min_ash_cem1 + unit;
 }

// arrow left/right gestures
window.addEventListener('keydown', (e) => {
  e.keyCode == 37 ? prev() : " ";
  e.keyCode == 39 ? next() : " ";
});

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

const appClass = qs(".app").classList;
appClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];
  appClass.replace(current, next);
  localStorage.setItem('theme', next);
}

qs('li[data-set="themeBtn"]').onclick = toggleTheme;
