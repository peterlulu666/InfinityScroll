const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")
let ready = false
let imagesLoaded = 0
let totalImages = 0
const api = "ER38Fq_wtRY_6NyJo6lQoKql5puV6z3wX7aByvgEU5Y"
const count = 30
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${api}&count=${count}`
let photoArray = []
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
function displayPhoto() {
  imagesLoaded = 0
  totalImages = photoArray.length
  photoArray.forEach((photo) => {
    const item = document.createElement("a")
    item.setAttribute("href", photo.links.html)
    item.setAttribute("target", "_blank")
    const img = document.createElement("img")
    img.setAttribute("src", photo.urls.regular)
    img.setAttribute("alt", photo.alt_description)
    img.setAttribute("title", photo.alt_description)
    img.addEventListener('load', imageLoaded)
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photoArray = await response.json()
    console.log(photoArray)
    displayPhoto()
  } catch {
    // Catch Error Here
  }
}
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})
getPhotos()

