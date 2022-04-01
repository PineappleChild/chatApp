var userNameArr = ["duckbill", "platypus",
  "marmoset",
  "deer",
  "frog",
  "budgerigar",
  "hedgehog",
  "camel",
  "snake",
  "pronghorn",
  "gorilla",
  "guinea pig",
  "horse",
  "dung beetle",
  "hog",
  "chimpanzee",
  "opossum",
  "sloth",
  "hamster",
  "fish",
  "wolverine",
  "mongoose",
  "ferret",
  "crow",
  "chipmunk",
  "starfish",
  "fawn",
  "whale",
  "mink",
  "raccoon",
  "lamb",
  "bear",
  "mynah bird",
  "llama",
  "wolf",
  "dingo",
  "burro",
  "jackal",
  "ibex",
  "walrus",
  "octopus",
 "grizzly bear",
 " peccary",
 " seal",
 " panda",
 " pony",
 " gila monster",
  "stallion"];
const socket = io()
const messageContainer = document.getElementById('textAreaSection')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('inputStuff')
const messageInput = document.getElementById('message')

if (messageForm != null) {
  const name = prompt('What is your name?') || userNameArr[Math.floor(Math.random() * userNameArr.length)]
  appendMessage(name + ` has logged in`)
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`${name}: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
    messageContainer.scrollTop = messageContainer.scrollHeight;
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('a');
  roomElement.setAttribute("id", "roomElem");
  roomElement.innerText = "Join this room: " + room;
  roomElement.href = `/${room}`;
  roomContainer.append(roomElement);
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
  messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
  messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
  messageContainer.scrollTop = messageContainer.scrollHeight;
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}


