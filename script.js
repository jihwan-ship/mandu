// 재료 목록: good=true 가 정답 재료 (고향만두 원작과 같은 정답 구성)
const INGREDIENTS = [
  {name:"돼지고기", icon:"🥩", good:true},
  {name:"두부",     icon:"🧈", good:true},
  {name:"양파",     icon:"🧅", good:true},
  {name:"양배추",   icon:"🥬", good:true},
  {name:"계란",     icon:"🥚", good:false},
  {name:"참기름",   icon:"🫗", good:true},
  {name:"건빵",     icon:"🍘", good:false},
  {name:"매운 고추",icon:"🌶️", good:false},
  {name:"마늘",     icon:"🧄", good:true},
  {name:"치즈",     icon:"🧀", good:false},
  {name:"대파",     icon:"🌿", good:true},
  {name:"고추장",   icon:"🟥", good:false},
  {name:"마요네즈", icon:"🥫", good:false},
  {name:"해병짜장", img:"haebyeong-jajang.png", marine:true},
  {name:"해병 전우애", icon:"🫂", marine:true},
  {name:"한재민 해병님", img:"chef.png", marine:true},
  {name:"해병 밀크쉐이크", img:"haebyeong-milkshake.png", marine:true},
  {name:"해병 수육", img:"haebyeong-suyuk.png", marine:true},
  {name:"해병 햄버거", img:"haebyeong-burger.png", marine:true},
  {name:"해병 통조림", img:"haebyeong-can.png", marine:true, plain:true}
];
const MARINE_TOTAL = INGREDIENTS.filter(i => i.marine).length;
// 진엔딩 조건: 해병 재료 전부 + 다른 재료 없음 (+ 아래에서 지정한 불리기/모양/조리법)
const CORRECT_SOAK = "와인"; // null이면 상관없음. "주스" / "와인" / "물"
const CORRECT_SHAPE = null;  // null이면 상관없음. "반달" / "복주머니" / "삼각"
const CORRECT_COOK = null;   // null이면 상관없음. "찌기" / "굽기" / "삶기"
const S = x => '<svg viewBox="0 0 64 64" stroke="#3b2418" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' + x + '</svg>';
const ICONS = {
"돼지고기": S('<path d="M8 38C6 22 18 12 34 12s24 10 22 24c-2 12-14 18-27 17C18 52 9 48 8 38Z" fill="#e4605f"/><path d="M13 31c4-10 16-13 28-11" fill="none" stroke="#ffd9d2" stroke-width="5"/><path d="M24 40c6 2 14 0 20-6" fill="none" stroke="#f6a8a0" stroke-width="3"/><circle cx="44" cy="22" r="4" fill="#fff0e6"/>'),
"두부": S('<path d="M8 26 32 14l24 12-24 12z" fill="#fffef4"/><path d="M8 26v20l24 12V38z" fill="#efe8cf"/><path d="M56 26v20L32 58V38z" fill="#dcd2b0"/>'),
"양파": S('<path d="M32 6c2 6 2 8 3 11 12 3 21 12 21 25 0 10-10 16-24 16S8 52 8 42c0-13 9-22 21-25 1-3 1-5 3-11Z" fill="#c9609f"/><path d="M32 17c-9 9-11 22-6 38M32 17c9 9 11 22 6 38M32 17c-1 12-1 26 0 38" fill="none" stroke="#f0b3dc" stroke-width="2"/>'),
"양배추": S('<circle cx="32" cy="33" r="23" fill="#8fd24a"/><path d="M32 10C20 18 18 42 30 56M32 10c12 8 14 32 2 46M11 28c14 8 28 8 42 0M12 42c13 5 27 5 40 0" fill="none" stroke="#e6ffbf" stroke-width="2.5"/>'),
"계란": S('<path d="M32 7C45 7 53 27 53 40c0 10-9 17-21 17S11 50 11 40C11 27 19 7 32 7Z" fill="#fff4dc"/><ellipse cx="24" cy="28" rx="4" ry="8" fill="#fff" stroke="none" transform="rotate(15 24 28)"/>'),
"참기름": S('<rect x="25" y="5" width="14" height="9" rx="2" fill="#d63b2f"/><path d="M24 14h16l5 10v28c0 4-3 7-7 7H26c-4 0-7-3-7-7V24z" fill="#c8791c"/><rect x="21" y="31" width="22" height="15" rx="2" fill="#fff3d3"/><circle cx="28" cy="38" r="2" fill="#b9801e" stroke="none"/><circle cx="35" cy="40" r="2" fill="#b9801e" stroke="none"/>'),
"건빵": S('<rect x="9" y="15" width="46" height="34" rx="6" fill="#e8bb74"/><g fill="#b07a34" stroke="none"><circle cx="22" cy="26" r="2.5"/><circle cx="32" cy="26" r="2.5"/><circle cx="42" cy="26" r="2.5"/><circle cx="22" cy="38" r="2.5"/><circle cx="32" cy="38" r="2.5"/><circle cx="42" cy="38" r="2.5"/></g>'),
"매운 고추": S('<path d="M18 22C32 14 52 24 56 48c-16 4-36-4-38-26Z" fill="#e0301f"/><path d="M24 26c10-4 20 0 27 10" fill="none" stroke="#ff9c8e" stroke-width="3"/><path d="M18 22c-3-6-1-12 6-14" fill="none" stroke="#3c9a3f" stroke-width="6"/>'),
"마늘": S('<path d="M32 5c3 9 3 9 6 11 10 5 17 14 15 26-2 10-10 15-21 15S13 52 11 42c-2-12 5-21 15-26 3-2 3-2 6-11Z" fill="#fbf5e6"/><path d="M32 16c-8 10-9 26-4 40M32 16c8 10 10 25 5 40" fill="none" stroke="#d6c9a6" stroke-width="2"/>'),
"치즈": S('<path d="M6 42 50 14c4-2 8 0 8 4v22c0 3-2 6-6 6H10c-4 0-6-4-4-6Z" fill="#ffc82e"/><g fill="#eaa514" stroke="none"><circle cx="30" cy="36" r="4"/><circle cx="46" cy="30" r="3.5"/><circle cx="20" cy="44" r="3"/></g>'),
"대파": S('<g fill="none"><path d="M10 54 28 24" stroke="#3b2418" stroke-width="13"/><path d="M10 54 28 24" stroke="#f5f8e8" stroke-width="9"/><path d="M28 24 50 8" stroke="#3b2418" stroke-width="13"/><path d="M28 24 50 8" stroke="#3fa34d" stroke-width="9"/><path d="M26 58 44 30" stroke="#3b2418" stroke-width="13"/><path d="M26 58 44 30" stroke="#f5f8e8" stroke-width="9"/><path d="M44 30 58 20" stroke="#3b2418" stroke-width="13"/><path d="M44 30 58 20" stroke="#4db85a" stroke-width="9"/></g>'),
"고추장": S('<path d="M9 24v22c0 5 10 9 23 9s23-4 23-9V24z" fill="#e8582c"/><ellipse cx="32" cy="24" rx="23" ry="9" fill="#a91d12"/><path d="M20 24c6 3 18 3 24 0" fill="none" stroke="#e5604a" stroke-width="3"/>'),
"마요네즈": S('<rect x="26" y="4" width="12" height="8" rx="2" fill="#ffd23a"/><path d="M24 12h16l3 8 5 6v26c0 3-2 6-6 6H22c-4 0-6-3-6-6V26l5-6z" fill="#fffbea"/><rect x="16" y="32" width="32" height="14" fill="#e53935"/><circle cx="32" cy="39" r="4" fill="#ffd23a" stroke="none"/>'),
"해병 전우애": S('<path d="M32 56C8 40 6 20 20 15c7-2 11 2 12 6 1-4 5-8 12-6 14 5 12 25-12 41Z" fill="#d62839"/><path d="M32 22l3.5 7.5 8 1-6 5.5 1.7 8L32 40l-7.2 4 1.7-8-6-5.5 8-1z" fill="#ffd23a"/>'),
};
const picked = new Set();
const $ = id => document.getElementById(id);

function render(){
  $("items").innerHTML = [...picked].map((i, n) => {
    const ing = INGREDIENTS[i];
    const art = ing.img ? `<img src="${ing.img}" alt="" class="${ing.plain ? "plain" : ""}">` : ICONS[ing.name];
    const a = n * 2.4, r = 0.22 * Math.sqrt(n + 0.6);
    const x = 50 + Math.cos(a) * r * 34, y = 50 + Math.sin(a) * r * 30;
    return `<i style="left:${x}%;top:${y}%;--r:${(n * 53 % 50) - 25}deg">${art}</i>`;
  }).join("");
}
INGREDIENTS.forEach((ing, i) => {
  const b = document.createElement("button");
  b.className = "pick"; b.type = "button";
  b.textContent = ing.name; b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => {
    picked.has(i) ? picked.delete(i) : picked.add(i);
    b.setAttribute("aria-pressed", picked.has(i));
    render();
  });
  $("panel").appendChild(b);
});

function judge(cook){
  const sel = [...picked].map(i => INGREDIENTS[i]), marine = sel.filter(x => x.marine).length, other = sel.length - marine, win = isWin(cook);
  $("rTitle").textContent = win ? "진엔딩" : "배드엔딩";
  $("rMsg").textContent = win ? "하하하! 역시 기합찬 해병만두군! 민수 해병님도 만족하시겠어" : "콜록콜록... 다시 한번 기회를 주겠다 아쎄이";
  $("rScene").classList.toggle("cough", !win);
  phase("done");
}

// ===== 빚기 / 조리 / 시식 연출 =====
const wait = ms => new Promise(r => setTimeout(r, ms));
const STATES = ["intro","soaking","shaping","wrapping","cooking","firing","eating","done"];
function phase(c){ const g = $("game"); g.classList.remove(...STATES); if(c) g.classList.add(c); }
function isWin(cook){
  const sel = [...picked].map(i => INGREDIENTS[i]), m = sel.filter(x => x.marine).length;
  const ok = (want, v) => want === null || v === want;
  return m === MARINE_TOTAL && sel.length === m && ok(CORRECT_SOAK, soak) && ok(CORRECT_SHAPE, shape) && ok(CORRECT_COOK, cook);
}
const SKIN = {"주스":"#ffc27a","와인":"#d9a3c6","물":"#fff7e0"};
const SHAPES = ["반달","복주머니","삼각"];
let soak = "물", shape = "반달";
function shapeSVG(sh, fill, cook){
  let body, pl = "", hi;
  if(sh === "복주머니"){
    body = "M75 190C58 132 130 112 180 116L192 96L200 108L208 96L220 116C270 112 342 132 325 190Z";
    [[128,160],[165,170],[200,174],[235,170],[272,160]].forEach(([x, y]) => pl += `M200 112L${x} ${y}`);
    hi = "M100 160C108 138 135 126 165 124";
  } else if(sh === "삼각"){
    body = "M68 190L200 96L332 190Z";
    for(let k = 1; k <= 4; k++){ const t = k / 5; pl += `M${200 - 132 * t} ${96 + 94 * t}l12 17M${200 + 132 * t} ${96 + 94 * t}l-12 17`; }
    hi = "M120 170L188 120";
  } else {
    body = "M70 190C70 100 330 100 330 190Z";
    for(let k = 0; k <= 9; k++){ const a = Math.PI * (1 + k / 9), c = Math.cos(a), n = Math.sin(a); pl += `M${(200+c*130).toFixed(0)} ${(190+n*68).toFixed(0)}L${(200+c*112).toFixed(0)} ${(190+n*54).toFixed(0)}`; }
    hi = "M112 152C140 124 180 118 215 120";
  }
  const brown = cook === "굽기" ? `<path d="${body}" fill="#b8641a" opacity=".45"/>` : "";
  return `<path d="${body}" fill="${fill}" stroke="#3b2418" stroke-width="5" stroke-linejoin="round"/>${brown}<path d="${pl}" stroke="#3b2418" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/><path d="${hi}" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".75"/>`;
}
const dumpling = cook => shapeSVG(shape, SKIN[soak], cook);
function buildShapes(){
  $("shapes").innerHTML = SHAPES.map(sh => `<button class="cookbtn" data-shape="${sh}" type="button"><span><svg viewBox="60 88 280 110">${shapeSVG(sh, SKIN[soak])}</svg></span>${sh}</button>`).join("");
  $("shapes").querySelectorAll("button").forEach(b => b.addEventListener("click", () => { shape = b.dataset.shape; startWrap(); }));
}
const FILL_COL = {"돼지고기":"#e4605f","두부":"#f3ecd2","양파":"#d9a0c8","양배추":"#8fd24a","계란":"#ffd36b","참기름":"#c8791c","건빵":"#e8bb74","매운 고추":"#e0301f","마늘":"#efe7cc","치즈":"#ffc82e","대파":"#4db85a","고추장":"#c93a1c","마요네즈":"#fffbea","해병짜장":"#4a2a17","해병 전우애":"#d62839","한재민 해병님":"#c98f6a","해병 밀크쉐이크":"#f6f1ea","해병 수육":"#d9625f","해병 햄버거":"#c98a3a","해병 통조림":"#b3301f"};
function fillSVG(){
  const sel = [...picked]; if(!sel.length) return "";
  let seed = 7; const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const col = i => FILL_COL[INGREDIENTS[i].name] || "#c9a86a";
  const rgb = sel.map(i => col(i).slice(1).match(/../g).map(h => parseInt(h, 16)));
  const avg = "#" + [0, 1, 2].map(c => Math.round(rgb.reduce((a, v) => a + v[c], 0) / rgb.length).toString(16).padStart(2, "0")).join("");
  let o = `<ellipse class="fd" cx="200" cy="186" rx="90" ry="40" fill="rgba(0,0,0,.2)"/><ellipse class="fd" cx="200" cy="172" rx="86" ry="47" fill="${avg}" stroke="#3b2418" stroke-width="3"/>`;
  sel.forEach(i => { for(let k = 0; k < 14; k++){
    const a = rnd() * 6.283, d = Math.sqrt(rnd()), r = 3 + rnd() * 5;
    o += `<circle class="fd" cx="${(200 + Math.cos(a) * d * 78).toFixed(0)}" cy="${(172 + Math.sin(a) * d * 39).toFixed(0)}" r="${r.toFixed(1)}" fill="${col(i)}" stroke="#3b2418" stroke-opacity=".5" stroke-width="1" style="animation-delay:${(rnd() * .3).toFixed(2)}s"/>`;
  }});
  let defs = "";
  sel.slice(0, 5).forEach((i, k) => {
    const [x, y] = [[177,134],[134,160],[220,160],[156,186],[200,186]][k], ing = INGREDIENTS[i];
    if(ing.img && ing.plain){
      o += `<image class="fd" href="${ing.img}" x="${x - 4}" y="${y - 4}" width="54" height="54" preserveAspectRatio="xMidYMid meet" style="animation-delay:.25s"/>`;
    } else if(ing.img){
      defs += `<clipPath id="cp${k}"><circle cx="${x + 23}" cy="${y + 23}" r="23"/></clipPath>`;
      o += `<image class="fd" href="${ing.img}" x="${x}" y="${y}" width="46" height="46" preserveAspectRatio="xMidYMin slice" clip-path="url(#cp${k})" style="animation-delay:.25s"/><circle class="fd" cx="${x + 23}" cy="${y + 23}" r="23" fill="none" stroke="#3b2418" stroke-width="2.5" style="animation-delay:.25s"/>`;
    } else o += ICONS[ing.name].replace("<svg ", `<svg class="fd" x="${x}" y="${y}" width="46" height="46" style="animation-delay:.25s" `);
  });
  return `<defs>${defs}</defs>${o}<ellipse class="fd" cx="166" cy="146" rx="32" ry="8" fill="#fff" opacity=".22"/>`;
}
function wrapSVG(){
  return `<button class="wrapbtn" id="wrapbtn" type="button" aria-label="만두피를 눌러 빚기"><svg viewBox="0 0 400 300"><ellipse cx="200" cy="262" rx="150" ry="14" fill="rgba(0,0,0,.2)"/><g id="wsk" class="wsk"><ellipse cx="200" cy="180" rx="125" ry="70" fill="${SKIN[soak]}" stroke="#3b2418" stroke-width="5"/>${fillSVG()}</g><g id="whf" class="half" style="display:none">${dumpling()}</g></svg></button>`;
}
const puffs = (xs, y, r, fill = "#fff") => xs.map((x, k) => `<circle class="puff" cx="${x}" cy="${y}" r="${r}" fill="${fill}" style="animation-delay:${k * .35}s"/>`).join("");
const flame = x => `<g transform="translate(${x} 0)"><path class="fl" d="M0 252C-20 226 6 214 0 184C26 202 32 230 0 252Z" fill="#ff7a1a"/><path class="fl" d="M0 252C-9 238 4 232 0 216C13 226 14 240 0 252Z" fill="#ffd23a"/></g>`;
const FIRE = {
  "찌기": `<ellipse cx="200" cy="274" rx="140" ry="12" fill="rgba(0,0,0,.2)"/><path d="M60 160h280v80c0 20-30 30-140 30S60 260 60 240z" fill="#9aa5b5" stroke="#3b2418" stroke-width="5"/><rect x="80" y="112" width="240" height="64" rx="8" fill="#d9a35c" stroke="#3b2418" stroke-width="5"/><path d="M125 114v60M170 114v60M215 114v60M260 114v60M300 114v60" stroke="#a8742f" stroke-width="4"/><g transform="translate(110 25) scale(.45)">${dumpling("찌기")}</g>${puffs([140,200,260],100,16)}`,
  "굽기": `${flame(110)}${flame(190)}${flame(270)}<ellipse cx="190" cy="140" rx="150" ry="52" fill="#2b2b2b" stroke="#111" stroke-width="5"/><ellipse cx="190" cy="138" rx="128" ry="40" fill="#454545"/><rect x="322" y="130" width="70" height="16" rx="8" fill="#6b4a2a" stroke="#111" stroke-width="4"/><g transform="translate(90 40) scale(.5)">${dumpling()}<g class="gold">${dumpling("굽기")}</g></g>${puffs([140,190,240],110,5)}`,
  "삶기": `<ellipse cx="200" cy="278" rx="150" ry="12" fill="rgba(0,0,0,.2)"/><path d="M50 120h300v110c0 25-40 38-150 38S50 255 50 230z" fill="#9aa5b5" stroke="#3b2418" stroke-width="5"/><ellipse cx="200" cy="120" rx="150" ry="30" fill="#4aa8e8" stroke="#3b2418" stroke-width="5"/><g transform="translate(120 49) scale(.4)"><g class="bob">${dumpling("삶기")}</g></g>${puffs([120,160,240,280],125,7)}${puffs([150,250],90,12)}`
};
function eatHTML(cook){
  return `<div class="eat" id="eat"><img src="chef.png" alt="시식하는 해병 주방장"><svg viewBox="0 0 400 260" aria-hidden="true"><ellipse cx="200" cy="215" rx="150" ry="30" fill="#fff" stroke="#3b2418" stroke-width="5"/><ellipse cx="200" cy="212" rx="115" ry="20" fill="#e6edf8"/><g class="bite"><g transform="translate(80 98) scale(.6)">${dumpling(cook)}</g></g></svg></div>`;
}
function movie(title, html, hint){ $("mTitle").textContent = title; $("mstage").innerHTML = html; $("mHint").textContent = hint; }
async function startWrap(){
  const N = 6; let n = 0;
  phase("wrapping"); movie("만두 빚기!", wrapSVG(), `만두피를 콕콕 눌러서 빚어라! (0/${N})`);
  await new Promise(done => $("wrapbtn").addEventListener("click", () => {
    if(n >= N) return;
    n++;
    $("wsk").style.transform = `scaleY(${1 - n * .07})`;
    const a = Math.PI * (1 + (n - .5) / N), c = Math.cos(a), t = Math.sin(a);
    $("wsk").insertAdjacentHTML("beforeend", `<path d="M${200 + c * 125} ${180 + t * 70}L${200 + c * 100} ${180 + t * 52}" stroke="#3b2418" stroke-width="4" stroke-linecap="round"/>`);
    if(n < N){ $("mHint").textContent = `꾹꾹! 더 눌러라! (${n}/${N})`; return; }
    $("wsk").style.display = "none"; $("whf").style.display = "";
    $("mHint").textContent = "아쎼이! 만두가 빚어졌다!";
    setTimeout(done, 1000);
  }));
  phase("cooking");
}
async function startFire(cook){
  const win = isWin(cook);
  phase("firing"); movie(cook + " 중!", `<svg viewBox="0 0 400 300">${FIRE[cook]}</svg>`, {"찌기":"푹푹 쪄지는 중…","굽기":"지글지글 구워지는 중…","삶기":"보글보글 삶는 중…"}[cook]);
  await wait(3200);
  phase("eating"); movie("시식 시간!", eatHTML(cook), "황근출 해병님이 시식을 시작한다…");
  await wait(1000); $("mHint").textContent = "냠냠…";
  await wait(2100); $("eat").classList.add(win ? "happy" : "cough");
  $("mHint").textContent = win ? "따흐흑...따흐흐흑 ㅠㅠ" : "새애끼...기열!";
  await wait(1400); judge(cook);
}
$("start").addEventListener("click", () => $("game").classList.remove("intro"));
$("go").addEventListener("click", () => phase("soaking"));
document.querySelectorAll("[data-soak]").forEach(b => b.addEventListener("click", () => { soak = b.dataset.soak; buildShapes(); phase("shaping"); }));
document.querySelectorAll("#cookscreen .cookbtn").forEach(b => b.addEventListener("click", () => startFire(b.dataset.cook)));
$("again").addEventListener("click", () => {
  picked.clear(); render();
  document.querySelectorAll(".pick").forEach(b => b.setAttribute("aria-pressed", "false"));
  $("game").classList.remove("done");
});
