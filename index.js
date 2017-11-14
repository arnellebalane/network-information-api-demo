if (!navigator.connection) {
    throw new Error('Network Information API is not supported.');
}

const unsupported = document.querySelector('.unsupported');
unsupported.remove();

const type = document.querySelector('h1');

type.textContent = navigator.connection.type || navigator.connection.effectiveType;
navigator.connection.onchange = e => {
    type.textContent = e.target.type || e.target.effectiveType;
};
