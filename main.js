const questions = [
	{
		question: "Яка функція використовується для виведення тексту на екран у JavaScript?",
		answers: ["console.log()", "print()", "alert()", "display()"],
		correct: 3,
	},
	{
		question: "Як перевірити, чи є змінна x рівною нулю або пустою строкою в JavaScript?",
		answers: [
			`x == 0 || x == ""`,
			`x === 0 || x === ""`,
			`x.equals(0) || x.equals("")`,
			`x.isNull(0) || x.isNull("")`,
		],
		correct: 2,
	},
	{
		question: "Як вибрати всі елементи з класом example у JavaScript",
		answers: [
			`document.getElements(".example")`,
			`document.getElementsByClassName("example")`,
			`document.select(".example")`,
			`document.selectElements(".example")`,
		],
		correct: 2,
	},
	{
		question: "Яка функція використовується для отримання довжини рядка в JavaScript?",
		answers: ["lengthOf()", "string.length()", "length()", "string.length"],
		correct: 4,
	},
];

//знаходження елементів
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

//змінні гри
let score = 0;
let questionIndex = 0;

//очистка html розмітки
clearPage(); 
showQuestion();
submitButton.onclick = chekAnswer;
 
function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}



function showQuestion(){

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	//Варіанти відповіді
	let answerNumber = 1;
	for(item of questions[questionIndex]['answers']){

		const questionTemplate = 
		`<li>
			<label>
			<input value = "%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
			</label>
		</li>`

		let answerHTML = questionTemplate.replace('%answer%', item);
		answerHTML =  answerHTML.replace('%number%', answerNumber);
		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}

}

function chekAnswer(){

	//Знаходимо вибрану кнопку
	const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	// якщо відповідь не вибрана просто виходим з функції
	if(!checkRadio){
		submitButton.blur();
		return;
	}

	//Дізнаємся номер відповіді користувача
	const userAnswer = parseInt(checkRadio.value);

	//Якшо відповідь правильна збільшуєм рахунок
	questions[questionIndex]['correct'];

	if(userAnswer === questions[questionIndex]['correct']){
		score++;
	}

	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	}else{
		clearPage();
		showResults();
	}

}

function showResults(){
	const resultsTemplate = 
	`<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`

	let title, message;

	if (score === questions.length){
		title = 'Вітаю';
		message = 'Ви відповіли на всі питання правильно';
	} else if ((score * 100)/questions.length >= 50){
		title = 'Непогано';
		message = 'У вас більше 50% правильних відповідей';
	} else{
		title = 'Не дуже добре';
		message = 'Меньше половини правильних відповідей';
	}

	let result = `${score} from ${questions.length}`;

	const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	submitButton.blur();
	submitButton.innerText = 'Почати знов';
	submitButton.onclick = ()=>{history.go()};
}