const promptInput =
document.getElementById("prompt")

const sendBtn =
document.getElementById("send-btn")

const chatArea =
document.getElementById("chat-area")

function addMessage(text, className){

    const div =
    document.createElement("div")

    div.classList.add(className)

    div.innerText = text

    chatArea.appendChild(div)

    chatArea.scrollTop =
    chatArea.scrollHeight
}

async function sendMessage(){

    const text =
    promptInput.value.trim()

    if(text === "") return

    addMessage(text, "user-message")

    promptInput.value = ""

    addMessage(
        "Thinking...",
        "jarvis-message"
    )

    const thinkingDiv =
    chatArea.lastChild

    try{

        const response =
        await fetch(
            "https://jarvis-backend-lohm.onrender.com/chat",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    message:text
                })
            }
        )

        const data =
        await response.json()

        thinkingDiv.innerText =
        data.reply

    }

    catch(error){

        thinkingDiv.innerText =
        "Backend connection failed."
    }
}

sendBtn.addEventListener(
    "click",
    sendMessage
)

promptInput.addEventListener(
    "keydown",
    (e)=>{

        if(e.key === "Enter"){
            sendMessage()
        }
    }
)


fetch("https://jarvis-backend-lohm.onrender.com/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: userInput
    })
})
.then(res => res.json())
.then(data => {
    console.log(data.reply);
});
