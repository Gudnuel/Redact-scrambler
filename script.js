const wordSearch = document.getElementById("wordSearch");
const button = document.getElementById("button");
let scrabber = document.getElementById("scrambleField");
const copy = document.getElementById("copy");
const firstDiv = document.querySelector(".first-container");
const secondDiv = document.querySelector(".second-container");
const buttonSwitch = document.getElementById("switch");
const changeWord = document.getElementById("wordReplace");
let statement = document.getElementById("statementField");
const preview = document.querySelector(".preview");
const message = document.querySelector(".message");
const statList = document.querySelector(".stats-index");
const bannerAlert = document.querySelector(".greenBanner");
const totalCharacter = document.querySelector(".listerOne");
const totalMatch = document.querySelector(".listerTwo");
const totalTime = document.querySelector(".listerThree");
const totalScanWords = document.querySelector(".listerFour");
const totalReplaced = document.querySelector(".listerFive");
let sentence;

wordSearch.addEventListener("input", function (e) {
  const word = wordSearch.value;
  sentence = statement.value;
  const pattern = new RegExp(`${word}`, "gi");
  e.preventDefault();
  if (word === "") {
    message.textContent = "";
  } else if (word.length > 0) {
    let preHTML;
    const isMatch = sentence.match(pattern);
    if (!isMatch) {
      preHTML = `<p>${word} is not in the sentence</p>`;
      preview.innerHTML = preHTML;
    } else {
      preHTML = sentence.replace(
        pattern,
        `<span style="color:red;">${word}</span>`
      );
      preview.innerHTML = preHTML;
    }
  }
});

// switching between first and second div
buttonSwitch.addEventListener("click", function (e) {
  e.preventDefault();
  firstDiv.style.display = "block";
  secondDiv.style.display = "none";
  statList.style.display = "none";
});

// Redact Function
button.addEventListener("click", function (e) {
  let startTime = performance.now();
  e.preventDefault();
  const word = wordSearch.value;
  sentence = statement.value;
  const subWord = changeWord.value;
  const pattern = new RegExp(`${word}`, "gi");
  if (word.length < 0 && sentence.length < 0 && subWord.length < 0) {
    button.disabled = true;
  } else if (word.length > 0 && sentence.length > 0 && subWord.length > 0) {
    button.disabled = false;
    const isMatch = sentence.match(pattern);
    if (isMatch) {
      let rewrite = sentence.replace(pattern, `${subWord}`);
      scrabber.value = rewrite;
      firstDiv.style.display = "none";
      secondDiv.style.display = "flex";
      bannerAlert.textContent = "Successful Scramble❕❕";
      bannerAlert.style.display = "flex";
      setTimeout(function () {
        bannerAlert.style.display = "none";
      }, 1500);
    }
    statList.style.display = "flex";
    let totalCharacters = sentence.length;
    let totalMatched = isMatch?.length;
    lister("Total Characters", totalCharacters, totalCharacter);
    lister("Total word Matched", totalMatched, totalMatch);
    lister("Total word Replace", totalMatched, totalReplaced);
  }
  const wordScanned = sentence.trim().split(/\s+/).length;
  lister("Total word Scanned", wordScanned, totalScanWords);

  let endTime = performance.now();
  let duration = endTime - startTime;
  let time = `${duration.toFixed(2)}ms`;
  lister("Total Time of Excution", time, totalTime);
  // sentence = " ";
});

//copy function
copy.addEventListener("click", function (e) {
  e.preventDefault();
  const copied = scrabber.value;
  navigator.clipboard.writeText(copied);
  bannerAlert.textContent = "Copied to clipboard ❕";
  bannerAlert.style.display = "flex";
  setTimeout(function () {
    bannerAlert.style.display = "none";
  }, 3000);
});

// Stat Listing function
function lister(title, value, childName) {
  childName.textContent = `${title}:${value}`;
}
