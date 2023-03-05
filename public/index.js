const socket = io.connect()

socket.on('messages', (data) => {
  renderChat(data)
})

function renderChat(data) {
  const html = data
    .map((elemento) => {
      return `<div> <strong style='color:blue'>${elemento.author.id}</strong>
      <em style='color:brown'>${elemento.date}</em>: 
              <em style='color:green; font-family: Italic'>${elemento.text}</em></div> `
    })
    .join(' ')
  document.getElementById('mensajes').innerHTML = html
}

function addMessage(e) {
  const mensaje = {
    author: {
      id: document.getElementById('id').value,
      nombre: document.getElementById('primernombre').value,
      apellido: document.getElementById('apellido').value,
      edad: document.getElementById('edad').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value,
    },
    text: document.getElementById('text').value,
  }
  socket.emit('new-message', mensaje)
  return false
}