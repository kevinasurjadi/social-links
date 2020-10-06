async function readDefaultData() {
  return fetch('/default.json')
    .then((response) => response.json())
    .then((data) => data)
}

function createLinkButtonElements(links) {
  const section = document.getElementsByTagName('section')[0]
  links.forEach((link) => {
    const button = document.createElement('a')
    button.setAttribute('class', 'button')
    button.setAttribute('role', 'button')
    button.setAttribute('aria-label', link.title)
    button.setAttribute('href', link.url)
    button.setAttribute('target', '_blank')
    const icon = document.createElement('i')
    icon.setAttribute('class', link.icon)
    const text = document.createTextNode(link.title)
    button.appendChild(icon)
    button.appendChild(text)
    section.appendChild(button)
  })
}

(function() {
  fetch('https://strapi.kevinasurjadi.com/social-links')
    .then((response) => response.json())
    .then((links) => {
      createLinkButtonElements(links)
    })
    .catch(async () => {
      const defaultData = await readDefaultData()
      createLinkButtonElements(defaultData)
    })
})()
