const setup = document.getElementById('setup');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');

const quizTitleInput = document.getElementById('quizTitle');
const addSampleBtn = document.getElementById('addSample');
const titleEl = document.getElementById('title');
const progressEl = document.getElementById('progress');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

let questions = [];
let current = 0;
let score = 0;
let selected = null;

addSampleBtn.addEventListener('click', () => {
  questions = [
    { q: 'What does HTML stand for?', o: ['Hyper Text Markup Language', 'HighText Machine Language', 'Hyperlinks and Text Mark Language', 'Home Tool Markup Language'], a: 0 },
    { q: 'Which one is a JavaScript framework?', o: ['Django', 'React', 'Laravel', 'Flask'], a: 1 },
    { q: 'What does CSS do?', o: ['Styles web pages', 'Stores database', 'Runs backend jobs', 'Manages DNS'], a: 0 }
  ];

  startQuiz(quizTitleInput.value.trim() || 'Sample Quiz');
});

function startQuiz(title) {
  current = 0;
  score = 0;
  titleEl.textContent = title;
  setup.classList.add('hidden');
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  selected = null;
  nextBtn.classList.add('hidden');
  optionsEl.innerHTML = '';

  const item = questions[current];
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = item.q;

  item.o.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = text;
    btn.onclick = () => selectOption(idx, btn);
    optionsEl.appendChild(btn);
  });
}

function selectOption(index, btn) {
  if (selected !== null) return;
  selected = index;

  const item = questions[current];
  [...optionsEl.children].forEach((b, i) => {
    if (i === item.a) b.classList.add('correct');
    if (i === index && i !== item.a) b.classList.add('wrong');
    b.disabled = true;
  });

  if (index === item.a) score++;
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) renderQuestion();
  else showResult();
});

function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  scoreEl.textContent = `You scored ${score} / ${questions.length}`;
}

restartBtn.addEventListener('click', () => {
  setup.classList.remove('hidden');
  resultSection.classList.add('hidden');
});