import { authWithEmailAndPassword, getAuthForm } from './auth'; //? form for auth
import { Question } from './question'; //? scripts for server
import './style.css'; //? import style
import { isValid, showModal } from './utils'; //? import func

const form = document.getElementById('form');
const input = form.querySelector('#input-question');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

//! for render list if have in localS ques get this and create for list
window.addEventListener('load', Question.renderList);

modalBtn.addEventListener('click', openModal); //

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (isValid(input.value)) {
		const question = {
			//? create object
			text: input.value.trim(), //? get value without space
			date: new Date().toJSON(), //? get date and parse to JSON
		};

		submitBtn.disabled = true;

		//! async request to serever to save question
		Question.create(question).then(() => {
			input.value = '';
			input.className = '';
			submitBtn.disabled = false;
		});
	}
});

input.addEventListener('input', (e) => {
	submitBtn.disabled = !isValid(input.value);
});

function openModal() {
	showModal('Авторизация', getAuthForm());
	const authForm = document.getElementById('auth-form');
	authForm.addEventListener(
		'submit',
		authFormHandler,
		//! because we listener once
		{ once: true }
	);
}

function authFormHandler(event) {
	event.preventDefault();

	const btn = event.target.querySelector('button');
	const email = event.target.querySelector('#email').value;
	const password = event.target.querySelector('#password').value;

	btn.disabled = true;
	authWithEmailAndPassword(email, password)
		.then(Question.fetch)
		.then(renderModalAfterAuth)
		.then((btn.disabled = false));
}

function renderModalAfterAuth(content) {
	if (typeof content === 'string') {
		showModal('Ошибка!', content);
		console.log(content);
	} else {
		showModal('Список вопросов', Question.listHTML(content));
		console.log(content);
	}
}
