let baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name == "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = document.querySelectorAll(".img");
  if (element.name === "from") {
    img[0].setAttribute("src", newSrc);
  } else {
    img[1].setAttribute("src", newSrc);
  }
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".Amount Input");
  let amtvl = amount.value;

  if (amtvl == "" || amtvl < 0) {
    amount.value = 1;
    amtvl = 1;
  }
  //console.log(amtvl);
  //const url=
  //console.log(fromCurr.value);
  const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  // console.log(URL);
  let response = await fetch(URL);
  let data = await response.json();
  let excRate = data[toCurr.value.toLowerCase()];
  //console.log(excRate);
  let finalamt = amtvl * excRate;
  //console.log(finalamt);
  msg.innerText = `${amtvl} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
});
