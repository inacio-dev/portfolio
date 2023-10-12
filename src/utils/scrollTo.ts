export default function scrollTo(id: string) {
  const element = document.getElementById(id)

  window.scrollTo({
    top: element ? element.offsetTop : 0,
    behavior: 'smooth',
  })
}
