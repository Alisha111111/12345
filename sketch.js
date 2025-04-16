let input;
let button;
let resultP;
let question;
let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為"#e3d5ca"
  background("#e3d5ca");

  // 顯示第一題
  showQuestion(currentQuestionIndex);
}

function draw() {
  background("#e3d5ca");
  // 設定填充顏色為"#c9ada7"
  fill("#c9ada7");
  // 在視窗中間繪製一個矩形，寬為全視窗寬的1/2，高為視窗高的1/2
  rect(windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2);
}

function windowResized() {
  // 當視窗大小改變時，重新設定畫布大小
  resizeCanvas(windowWidth, windowHeight);
  // 重新設定元素位置
  if (question) question.position(windowWidth / 2 - 100, windowHeight / 2 - 50);
  if (input) input.position(windowWidth / 2 - 100, windowHeight * 3 / 4 - 100);
  if (button) button.position(windowWidth / 2 - 50, windowHeight * 3 / 4 - 50);
  if (resultP) resultP.position(windowWidth / 2 - 100, windowHeight * 3 / 4);
}

function showQuestion(index) {
  // 清除之前的元素
  if (question) question.remove();
  if (input) input.remove();
  if (button) button.remove();
  if (resultP) resultP.remove();

  // 讀取題目和選項
  let q = questions.getRow(index);
  let qText = q.getString('question');
  let correctAnswer = q.getString('answer');

  // 題目文字
  question = createP(qText);
  question.style('font-size', '35px');
  question.style('color', '#000000');
  question.position(windowWidth / 2 - 100, windowHeight / 2 - 50);

  // 填空題輸入框
  input = createInput();
  input.style('width', '200px');
  input.style('font-size', '35px');
  input.position(windowWidth / 2 - 100, windowHeight * 3 / 4 - 100);

  // 送出按鈕
  button = createButton('下一題');
  button.position(windowWidth / 2 - 50, windowHeight * 3 / 4 - 50);
  button.mousePressed(() => checkAnswer(correctAnswer));
}

function checkAnswer(correctAnswer) {
  let answer = input.value();
  if (answer === correctAnswer) {
    correctCount++;
    resultP = createP('答對了！');
    resultP.style('color', 'green');
  } else {
    incorrectCount++;
    resultP = createP('答錯了！');
    resultP.style('color', 'red');
  }
  resultP.style('font-size', '35px');
  resultP.position(windowWidth / 2 - 100, windowHeight * 3 / 4);

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.getRowCount()) {
    setTimeout(() => showQuestion(currentQuestionIndex), 2000);
  } else {
    setTimeout(showResults, 2000);
  }
}

function showResults() {
  // 清除之前的元素
  if (question) question.remove();
  if (input) input.remove();
  if (button) button.remove();
  if (resultP) resultP.remove();

  // 顯示結果
  let resultText = `測驗結束！答對了 ${correctCount} 題，答錯了 ${incorrectCount} 題。`;
  let result = createP(resultText);
  result.style('font-size', '35px');
  result.style('color', '#000000');
  result.position(windowWidth / 2 - 200, windowHeight / 2 - 50);

  // 再試一次按鈕
  button = createButton('再試一次');
  button.position(windowWidth / 2 - 50, windowHeight * 3 / 4 - 50);
  button.mousePressed(() => {
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    showQuestion(currentQuestionIndex);
  });
}
