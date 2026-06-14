let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;

const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不行:("
];

noButton.addEventListener("click", function () {
    clickCount++;
    let yesSize = 1 + (clickCount * 1.2);
    yesButton.style.transform = `scale(${yesSize})`;
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }
    if (clickCount === 1) mainImage.src = "./images/shocked.png";  
    if (clickCount === 2) mainImage.src = "./images/think.png";  
    if (clickCount === 3) mainImage.src = "./images/angry.png"; 
    if (clickCount === 4) mainImage.src = "./images/crying.png";   
    if (clickCount >= 5) mainImage.src = "./images/crying.png";
});

yesButton.addEventListener("click", function () {
    document.querySelector('.container').style.display = 'none';
    let yesDiv = document.createElement('div');
    yesDiv.className = 'yes-screen';
    yesDiv.innerHTML = `
        <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ<br>小欣宝宝suki!!</h1>
        <img src="./images/hug.png" alt="拥抱" class="yes-image">
    `;
    document.body.appendChild(yesDiv);
    document.body.style.overflow = "hidden";
});
