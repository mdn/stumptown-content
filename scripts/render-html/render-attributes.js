
function renderAttribute(attribute) {
    let rendered = '<dt>';

    rendered += `<code>${attribute.name}</code>`
    rendered += '</dt>';

    rendered += '<dd>';
    rendered += `<strong>${attribute.type}</strong>`;
    rendered += attribute.description;
    rendered += '</dd>';

    return rendered;
}

function renderAttributes(attributes) {
    let rendered = '<h2>Attributes</h2>';

    rendered += '<dl>';
    for (let attribute of attributes) {
        rendered += renderAttribute(attribute);
    }
    rendered += '</dl>';

    return rendered;
}

module.exports = {
    renderAttributes
}
