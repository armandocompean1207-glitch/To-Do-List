const newTaskbtn = document.getElementById('new-task');

function createModal() {
	// overlay
	const overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.inset = '0';
	overlay.style.background = 'rgba(0,0,0,0.5)';
	overlay.style.display = 'flex';
	overlay.style.alignItems = 'center';
	overlay.style.justifyContent = 'center';
	overlay.style.zIndex = '1000';

	// modal container
	const modal = document.createElement('div');
	modal.style.background = '#fff';
	modal.style.padding = '20px';
	modal.style.borderRadius = '6px';
	modal.style.width = '320px';
	modal.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';

	const title = document.createElement('h3');
	title.textContent = 'Add New To‑Do';
	title.style.marginTop = '0';

	const form = document.createElement('form');
	form.style.display = 'flex';
	form.style.flexDirection = 'column';
	form.style.gap = '8px';

	const titleLabel = document.createElement('label');
	titleLabel.textContent = 'Title';
	const titleInput = document.createElement('input');
	titleInput.type = 'text';
	titleInput.required = true;

	const descLabel = document.createElement('label');
	descLabel.textContent = 'Description';
	const descInput = document.createElement('textarea');
	descInput.rows = 3;

	const dueLabel = document.createElement('label');
	dueLabel.textContent = 'Due date';
	const dueInput = document.createElement('input');
	dueInput.type = 'date';

	const prioLabel = document.createElement('label');
	prioLabel.textContent = 'Priority';
	const prioSelect = document.createElement('select');
	['Low','Medium','High'].forEach(p => {
		const o = document.createElement('option');
		o.value = p;
		o.textContent = p;
		prioSelect.appendChild(o);
	});

	const buttons = document.createElement('div');
	buttons.style.display = 'flex';
	buttons.style.justifyContent = 'flex-end';
	buttons.style.gap = '8px';

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.textContent = 'Cancel';

	const addBtn = document.createElement('button');
	addBtn.type = 'submit';
	addBtn.textContent = 'Add ToDo';

	buttons.appendChild(cancelBtn);
	buttons.appendChild(addBtn);

	form.appendChild(titleLabel);
	form.appendChild(titleInput);
	form.appendChild(descLabel);
	form.appendChild(descInput);
	form.appendChild(dueLabel);
	form.appendChild(dueInput);
	form.appendChild(prioLabel);
	form.appendChild(prioSelect);
	form.appendChild(buttons);

	modal.appendChild(title);
	modal.appendChild(form);
	overlay.appendChild(modal);

	// handlers
	function close() {
		document.body.removeChild(overlay);
		document.removeEventListener('keydown', onKey);
		newTaskbtn.focus();
	}

	function onKey(e) {
		if (e.key === 'Escape') close();
	}

	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) close();
	});

	cancelBtn.addEventListener('click', (e) => {
		e.preventDefault();
		close();
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const payload = {
			title: titleInput.value.trim(),
			description: descInput.value.trim(),
			dueDate: dueInput.value || null,
			priority: prioSelect.value,
			completed: false,
		};
		if (!payload.title) {
			titleInput.focus();
			return;
		}
		// dispatch a custom event so other modules can handle creation
		document.dispatchEvent(new CustomEvent('todo:add', { detail: payload }));
		close();
	});

	document.addEventListener('keydown', onKey);

	// focus first input after appended
	document.body.appendChild(overlay);
	titleInput.focus();

	return overlay;
}

newTaskbtn.addEventListener('click', (e) => {
	e.preventDefault();
	createModal();
});

// Example listener: other code can listen for 'todo:add'
// document.addEventListener('todo:add', (evt) => console.log('New todo', evt.detail));