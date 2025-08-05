import { name, age, gen, btn, cards } from "./html-elements.js";

const data = [];
let edit = null;

function getChar(txt) {
  return txt.charAt(0).toUpperCase();
}

function addUpd() {
  const valName = name.value.trim();
  const valAge = age.value.trim();
  const valGen = gen.value;

  if (!valName || !valAge) {
    return;
  }

  if (edit) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === edit) {
        data[i].name = valName;
        data[i].age = valAge;
        data[i].gen = valGen;
        break;
      }
    }
    edit = null;
    btn.textContent = "Qo‘shish";
  } else {
    const user = {
      id: Date.now(),
      name: valName,
      age: valAge,
      gen: valGen,
    };
    data.push(user);
  }

  showList();
  clearInp();
}

function showList() {
  cards.textContent = "";

  if (data.length === 0) {
    const noTxt = document.createElement("p");
    noTxt.style.textAlign = "center";
    noTxt.style.color = "rgba(255, 255, 255, 0.7)";
    noTxt.textContent = "Foydalanuvchi yo‘q.";
    cards.appendChild(noTxt);
    return;
  }

  for (const user of data) {
    const card = document.createElement("div");
    card.className = "card";

    const ava = document.createElement("div");
    ava.className = "ava";
    ava.textContent = getChar(user.name);

    const info = document.createElement("div");
    info.className = "data";

    const strongName = document.createElement("strong");
    strongName.textContent = user.name;
    info.appendChild(strongName);

    const ageTxt = document.createElement("span");
    ageTxt.textContent = "Yosh: " + user.age;
    info.appendChild(ageTxt);
    info.appendChild(document.createElement("br"));

    const genTxt = document.createElement("span");
    genTxt.textContent = "Jinsi: " + user.gen;
    info.appendChild(genTxt);

    const acts = document.createElement("div");
    acts.className = "acts";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Tahrir";
    editBtn.onclick = () => editUser(user.id);
    acts.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "O‘chir";
    delBtn.onclick = () => delUser(user.id);
    acts.appendChild(delBtn);

    card.appendChild(ava);
    card.appendChild(info);
    card.appendChild(acts);

    cards.appendChild(card);
  }
}

function delUser(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data.splice(i, 1);
      break;
    }
  }
  showList();
  if (edit === id) {
    edit = null;
    btn.textContent = "Qo‘shish";
    clearInp();
  }
}

function editUser(id) {
  for (const user of data) {
    if (user.id === id) {
      name.value = user.name;
      age.value = user.age;
      gen.value = user.gen;
      edit = id;
      btn.textContent = "Saqlash";
      break;
    }
  }
}

function clearInp() {
  name.value = "";
  age.value = "";
  gen.value = "Erkak";
}

btn.addEventListener("click", addUpd);

document.addEventListener("DOMContentLoaded", showList);
