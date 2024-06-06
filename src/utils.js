export function isValid(value) {
	return value.length >= 15;
}

export function showModal(title, content) {
	// initialize modal element
	const modalEl = document.createElement('div');
	const html = `
		<h1>${title}</h1>
		<p class='modal-content'>${content}</p>
	`;

	modalEl.classList.add('modal');

	modalEl.innerHTML = html;

	// show modal
	mui.overlay('on', modalEl);
}
