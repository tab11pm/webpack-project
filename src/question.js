//! use class for don't (запутатся)

export class Question {
	static create(question) {
		return fetch(
			'https://podcast-question-e9495-default-rtdb.firebaseio.com/question.json', //? firebase database link
			{
				method: 'POST',
				body: JSON.stringify(question), //? if we sent this to server
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json()) //? get res
			.then((res) => {
				question.id = res.name;
				return question;
			})
			.then(addToLoacalStorage)
			.then(Question.renderList);
	}

	static fetch(token) {
		if (!token) {
			return Promise.resolve('<p class="error">У вас нет токена</p>');
		}
		return fetch(
			`https://podcast-question-e9495-default-rtdb.firebaseio.com/question.json?auth=${token}`
		)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res && res.error) {
					return `<p class="error">${res.error}</p>`;
				}

				return res
					? Object.keys(res).map((key) => ({
							...res[key],
							id: key,
					  }))
					: [];
			});
	}

	static renderList() {
		const question = getQuesFromLC();

		const html = question.length
			? question.map(toCard).join('')
			: `<div class="mui--text-headline">Вы пока нечего не спрашивали</div>`;

		const list = document.getElementById('list');
		list.innerHTML = html;
	}

	static listHTML(ques) {
		return ques.length
			? `<ol>${ques.map((q) => `<li>${q.text}</li>`).join('')}</ol>`
			: 'Вопросов пока нет';
	}
}

function addToLoacalStorage(ques) {
	const all = getQuesFromLC();
	//! if it's array we pushing another ques
	all.push(ques);
	localStorage.setItem('question', JSON.stringify(all)); //? use json because lS work only this type
}

//! func get localS item
function getQuesFromLC() {
	return JSON.parse(localStorage.getItem('question') || '[]');
}

function toCard(ques) {
	return `
      <div class="mui--text-black-54">
			<b>
         	${new Date(ques.date).toLocaleDateString()}
         	${new Date(ques.date).toLocaleTimeString()}
			</b>

		</div>
      <div>
         <i>${ques.text}</i>
      </div>
      <br />
   `;
}
