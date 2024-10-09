initializeForm();

function initializeForm()
{
	const plyForm = document.querySelector('#playerForm');
	if (!plyForm)
		return;
	let path = window.location.hash || '#';
	const questionMarkIndex = path.indexOf('?');
	let formField = 0;
	if (questionMarkIndex !== -1)
	path = path.slice(0, questionMarkIndex);

	switch (path)
	{
	case '#form2':
		formField = 2;
		break;
	case '#form':
		formField = 1;
		break;
	case '#form3':
		formField = 3;
		break;
	case '#form4':
		formField = 4;
		break;
	case '#form8':
		formField = 8;
		break;
	default:
		formField = 0;
		break;
	}

	for (let index = 1; index <= formField; index++)
	{
		const div = document.createElement('div');
		div.className = 'form-group';
		const label = document.createElement('label');
		label.htmlFor = 'player' + index;
		label.textContent = 'Player ' + index + ':';
		const input = document.createElement('input');
		input.setAttribute('required', '');
		input.maxLength = 10;
		input.placeholder = 'Enter player ' + index + ' name';
		input.type = 'text';
		input.className = 'form-control';
		input.id = 'player' + index;
		input.name = 'player' + index;
		div.appendChild(label);
		div.appendChild(input);

		plyForm.appendChild(div);
	}
	const btn = document.createElement('button');
	btn.type = 'submit';
	btn.className = 'btn btn-primary';
	btn.textContent = 'Submit';
	plyForm.appendChild(btn);
}

