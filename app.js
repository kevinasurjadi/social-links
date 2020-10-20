async function readDefaultData() {
  return fetch('/default.json')
    .then((response) => response.json())
    .then((data) => data)
}

function createLinkButtonElements(links, id) {
  const section = document.getElementById(id)
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

function fetchWithTimeout(url, options = {}, time = 3000) {
  const controller = new AbortController()
  const config = { ...options, signal: controller.signal }

  setTimeout(() => {
    controller.abort()
  }, time)

  return fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return response
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Response timed out')
      }
      throw new Error(error.message)
    })
}

(function() {
  fetchWithTimeout('https://strapi.kevinasurjadi.com/social-links?type=social&_sort=priority:ASC')
    .then((response) => response.json())
    .then((links) => {
      createLinkButtonElements(links, 'social')
    })
    .catch(async () => {
      const defaultData = await readDefaultData()
      createLinkButtonElements(defaultData)
    })
  fetchWithTimeout('https://strapi.kevinasurjadi.com/social-links?type=workaround&_sort=priority:ASC')
    .then((response) => response.json())
    .then((links) => {
      const social = document.getElementById('social')
      const section = document.createElement('section')
      section.setAttribute('id', 'workaround')
      const title = document.createElement('p')
      title.setAttribute('class', 'caption')
      title.innerHTML = 'My workaround'
      section.appendChild(title)
      social.parentNode.insertBefore(section, social.nextSibling)
      createLinkButtonElements(links, 'workaround')
    })
})()
