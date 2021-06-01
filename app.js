async function readDefaultData() {
  return fetch('/default.json')
    .then((response) => response.json())
    .then((data) => data);
}

function createLinkButtonElements(links, id) {
  const section = document.querySelector(`#${id}`);
  links.forEach((link) => {
    const button = document.createElement('a');
    button.setAttribute('class', 'button');
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', link.title);
    button.setAttribute('href', link.url);
    button.setAttribute('target', '_blank');
    const icon = document.createElement('i');
    icon.setAttribute('class', link.icon);
    const text = document.createTextNode(link.title);
    button.appendChild(icon);
    button.appendChild(text);
    section.appendChild(button);
  });
}

(async function() {
  const defaultData = await readDefaultData();
  createLinkButtonElements(defaultData, 'social');
})();
