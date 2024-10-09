
// works the same. 
//let consumables = [
  // {
  //   name: "Joker",
  //   text: [
  //     "{C:mult}+4{} Mult"
  //   ],
  //   image_url: "img/j_joker.png",
  //   rarity: "Tarot"
  // },
  // {
  //   name: "Joker",
  //   text: [
  //     "{C:mult}+4{} Mult"
  //   ],
  //   image_url: "img/j_joker.png",
  //   rarity: "Planet"
  // },
  // {
  //   name: "Joker",
  //   text: [
  //     "{C:mult}+4{} Mult"
  //   ],
  //   image_url: "img/j_joker.png",
  //   rarity: "Spectral"
  // },
//]


let decks = [
  // {
  //   name: "Joker",
  //   text: [
  //     "{C:mult}+4{} Mult"
  //   ],
  //   image_url: "img/j_joker.png",
  //   rarity: "Deck"
  // },
]


let cols = {
  
  MULT: "#FE5F55",
  CHIPS: "#009dff",
  MONEY: "#f3b958",
  XMULT: "#FE5F55",
  FILTER: "#ff9a00",
  ATTENTION: "#ff9a00",
  BLUE: "#009dff",
  RED: "#FE5F55",
  GREEN: "#4BC292",
  PALE_GREEN: "#56a887",
  ORANGE: "#fda200",
  IMPORTANT: "#ff9a00",
  GOLD: "#eac058",
  YELLOW: "#ffff00",
  CLEAR: "#00000000", 
  WHITE: "#ffffff",
  PURPLE: "#8867a5",
  BLACK: "#374244",
  L_BLACK: "#4f6367",
  GREY: "#5f7377",
  CHANCE: "#4BC292",
  JOKER_GREY: "#bfc7d5",
  VOUCHER: "#cb724c",
  BOOSTER: "#646eb7",
  EDITION: "#ffffff",
  DARK_EDITION: "#5d5dff",
  ETERNAL: "#c75985",
  INACTIVE: "#ffffff99",
  HEARTS: "#f03464",
  DIAMONDS: "#f06b3f",
  SPADES: "#403995",
  CLUBS: "#235955",
  ENHANCED: "#8389DD",
  JOKER: "#708b91",
  TAROT: "#a782d1",
  PLANET: "#13afce",
  SPECTRAL: "#4584fa",
  VOUCHER: "#fd682b",
  EDITION: "#4ca893",
}

let rarities = {
  "Common": "#009dff", 
  "Uncommon": "#4BC292",
  "Rare": "#fe5f55",
  "Legendary": "#b26cbb",
  "Joker": "#708b91",
  "Tarot": "#a782d1",
  "Planet": "#13afce",
  "Spectral": "#4584fa",
  "Voucher": "#fd682b",
  "Pack": "#9bb6bd",
  "Enhancement": "#8389DD",
  "Edition": "#4ca893",
  "Seal": "#4584fa",
  "Deck": "#9bb6bd",
  "Sticker": "#5d5dff",
  "Boss Blind": "#5d5dff",
  "Showdown": "#4584fa",
  "Junk": "#bfc7d5",
  "The Seven Sins": "#7c0000",
  "Twitch Series": "#9164ff",
  "Icon Series": "#00FF99",
  "Gaming Legends Series": "#7F00FF",
  "Ritualistic": "#374244",
  "Transcendent": "#ff9a00",
  "Hypertranscendent": "#ffffff",
  "O M E G A T R A N S C E N D E N T": "#374244",
  "Epic": "#571d91",
  "Evolved": "#eac058",
  "Fusion": "#F7D762",
  "Exotic": "#708b91",
  "Fallen": "#8867a5",
  "Divine": "#000000",
}


regex = /{([^}]+)}/g;

let process_description = (description) => {
  if (description == undefined) {
    return ""
  }
  let desc_html = `<div class="text">`;
  for (let i = 0; i < description.length; i++) {
    if (i > 0) desc_html += "<br>"
    for (let i2 = 0; i2 < description[i].length; i2++){
      if (description[i][i2].text){
        if (description[i][i2].background_colour){
          desc_html += `<span style="background-color: ${description[i][i2].background_colour}; border-radius: 5px; padding: 0px 5px; color: ${description[i][i2].colour};">${description[i][i2].text}</span>`
        }
        else if (description[i][i2].colour == "#4f6367") {
          desc_html += description[i][i2].text
        }
        else {
          desc_html += `<span style="color: ${description[i][i2].colour};">${description[i][i2].text}</span>`
        }
      }
      else{
        desc_html += `<span >${description[i][i2]}</span>`
      }
    }
  }

  return desc_html += "</div>";
}

function CheckForOverride(url)
{
    var override_imagepng = url.replace(".png", "_override.png");
    var override_imagegif = url.replace(".png", "_override.gif");
    var http = new XMLHttpRequest();
    http.open('HEAD', override_imagegif, false);
    http.send();
    if (http.status!=404){
      return override_imagegif;
    }
    var http = new XMLHttpRequest();
    http.open('HEAD', override_imagepng, false);
    http.send();
    if (http.status!=404){
      return override_imagepng;
    }
    return url;
}

function CheckForRarity(card){
  if (card.rarity){
    return `<h4 class="rarity" style="background-color: ${rarities[card.rarity]}">${card.rarity}</h4>`;
  }
  return "";
}

let add_cards_to_div = (jokers, jokers_div) => {
  Object.keys(jokers).sort().forEach(function(key,index) {
    let joker = jokers[key]
    //console.log("adding joker", joker.name);
  
    let joker_div = document.createElement("div");
    joker_div.classList.add("joker");
    
    if (joker.rarity === "Sticker" || joker.rarity == "Seal") {
      joker_div.innerHTML = `
        <h3>${joker.name}</h3>
        <img src="${joker.image_url}" alt="${joker.name}" class="hasback" />
        ${CheckForRarity(joker)}
        ${process_description(joker.description)}
      `;
    } else {
      joker_div.innerHTML = `
        <h3>${joker.name}</h3>
        <img src="${joker.image_url}" alt="${joker.name}" />
        ${CheckForRarity(joker)}
        ${process_description(joker.description)}
      `;
    }
    if (joker.mod){
      joker_div.innerHTML += `
      <h4 class="rarity" style="background-color: ${cards.Mods[joker.mod].badge_colour}">${cards.Mods[joker.mod].name}</h4>
      `;
    }
    jokers_div.appendChild(joker_div);
  
});
}

let jokers_div = document.querySelector(".jokers");
add_cards_to_div(cards.Joker, jokers_div);

let consumables_div = document.querySelector(".consumables");
Object.keys(cards.Consumables).sort().forEach(function(key,index) {
  console.log(key)
  consumables_div.innerHTML += `
    <h2>${key}</h2>
    <br>
    <div class="${key} cards">
    </div>
    <br>
    `
  let consumables_set_div = document.querySelector(`.${key}`);
  add_cards_to_div(cards.Consumables[key], consumables_set_div);
});

let decks_div = document.querySelector(".decks");
add_cards_to_div(cards.Back, decks_div);

let seals_div = document.querySelector(".seals");
add_cards_to_div(cards.Seal, seals_div);

let vouchers_div = document.querySelector(".vouchers");
add_cards_to_div(cards.Voucher, vouchers_div);

let stakes_div = document.querySelector(".stakes");
add_cards_to_div(cards.Stake, stakes_div);

let sleeves_div = document.querySelector(".sleeves");
add_cards_to_div(cards.Sleeve, sleeves_div);

let skills_div = document.querySelector(".skills");
add_cards_to_div(cards.Skill, skills_div);

let tags_div = document.querySelector(".tags");
add_cards_to_div(cards.Tag, tags_div);

let editions_div = document.querySelector(".editions");
add_cards_to_div(cards.Edition, editions_div);

let enhancements_div = document.querySelector(".enhancements");
add_cards_to_div(cards.Enhanced, enhancements_div);

let boosters_div = document.querySelector(".boosters");
add_cards_to_div(cards.Booster, boosters_div);

let curses_div = document.querySelector(".curses");
add_cards_to_div(cards.Curse, curses_div);

let contracts_div = document.querySelector(".contracts");
add_cards_to_div(cards.Contract, contracts_div);

let blinds_div = document.querySelector(".blinds");
add_cards_to_div(cards.Blind, blinds_div);

let d6sides_div = document.querySelector(".d6sides");
add_cards_to_div(cards["D6 Side"], d6sides_div);

let suits_div = document.querySelector(".suits");
add_cards_to_div(cards.Suit, suits_div);









filterSelection("jokersfull")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  //if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  console.log(name);
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var filterButtons = document.getElementById("filterButtons");
var btns = filterButtons.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}