const h1 = document.querySelector('h1');
const type = document.querySelector('h1 + p');
const ul = document.querySelector('ul');

function displayNetworkInformation(data) {
    console.log(data);
    const details = [];

    if (data.type) {
        h1.textContent = `"${data.type}"`;
        type.textContent = 'connection type';

        details.push(['Effective Type', `"${data.effectiveType}"`]);
        details.push(['Downlink', data.downlink.toFixed(2) + ' Mbps']);
        if (Number.isFinite(data.downlinkMax)) {
            details.push(['Downlink Max', data.downlinkMax.toFixed(2) + ' Mbps']);
        }
        details.push(['Roundtrip Time (rtt)', data.rtt.toFixed(2) + ' ms']);
    } else if (data.effectiveType) {
        h1.textContent = `"${data.effectiveType}"`;
        type.textContent = 'effective type';

        details.push(['Downlink', data.downlink.toFixed(2) + ' Mbps']);
        if (Number.isFinite(data.downlinkMax)) {
            details.push(['Downlink Max', data.downlinkMax.toFixed(2) + ' Mbps']);
        }
    }

    ul.innerHTML = '';
    details.forEach(detail => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const span = document.createElement('span');

        p.textContent = detail[0];
        span.textContent = detail[1];

        p.appendChild(span);
        li.appendChild(p);
        ul.appendChild(li);
    });
}

if (navigator.connection) {
    displayNetworkInformation(navigator.connection);
    navigator.connection.onchange = (e) => displayNetworkInformation(navigator.connection);
} else {
    type.remove();
    ul.remove();

    document.body.classList.add('not-supported');
    h1.classList.add('not-supported');
    h1.textContent = 'Network Information API is not supported.';
}

