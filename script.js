const sendChatBtn = document.querySelector(".chat-input span");
const chatInput= document.querySelector(".chat-input textarea");
const chatbox= document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const API_KEY = "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";
let userMessage;
const createChatLi=(message, className)=>{
    //create a chat <l> element with apssed message and className

    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing"?`<p></p>`:`<span class="material-symbols-outlined">
    sentiment_satisfied</span> <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;

}
const generateResponse=(incomingChatLi)=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement  = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content: userMessage},
            { role: "system", content: "A mental health bot that deals with those that experienced trauma. Be that missing friend, but talk efficently." }

        ]
        })
    }
    fetch( API_URL, requestOptions).then(res=> res.json()).then ( data => {
messageElement.textContent =   data.choices[0].message.content;
   }).catch((error)=>{
    messageElement.textContent =  "Something went wrong.";
}).finally(()=>chatbox.scrollTo(0, chatbox.scrollHeight));

}
const handleChat = ()=>{
        userMessage = chatInput.value.trim();
        console.log(userMessage);
        if(!userMessage)return;
        chatInput.value = "";
        chatbox.scrollTo(0, chatbox.scrollHeight);
    
        chatbox.appendChild(createChatLi(userMessage,"outgoing"));
        setTimeout(()=>{
            const incomingChatLi = createChatLi("Thinking...","incoming")
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);

                generateResponse(incomingChatLi);
        },600)
        
}
chatToggler.addEventListener("click",()=> document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click",handleChat);


document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.querySelector('.image-header');
    const images = [
        'mental.jpg',
        ,'quotes.jpg',
        'friendlyrobot.png',
        'quotes2.jpg',
        'winter.jpg',
        'mountains.jpg',
        'sea.jpg',
        'thraphy.jpg',
        'gym.jpg',
        'sky.jpg'
        // Add more image URLs as needed
    ];
    let currentIndex = 0;

    function changeImage() {
        if (currentIndex === images.length) {
            currentIndex = 0; // Reset to the first image
        }

        const imageUrl = images[currentIndex];
        console.log('Changing image to:', imageUrl);

        imageContainer.style.backgroundImage = `url(${imageUrl})`;

        currentIndex++;
    }

    // Change image every 3 seconds (adjust the interval as needed)
    setInterval(changeImage, 3000);

    // Preload images for better performance
    images.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const music = ['An American Elegy.mp3', 'A Mother Of A Revolution Omar Thomas  Symphonic Winds  Capital U Conservatory of Music.mp3'];
    const audioPlayer = document.getElementById('audioPlayer');
    const switchButton = document.getElementById('switchButton');
    let cur = 0;
  
    // Check if there's a saved progress in local storage
    const savedProgress = localStorage.getItem('audioProgress');
    if (savedProgress) {
      audioPlayer.currentTime = parseFloat(savedProgress);
    }
  
    document.getElementById('playButton').addEventListener('click', function () {
      if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('playButton').textContent = 'Pause Audio';
      } else {
        audioPlayer.pause();
        document.getElementById('playButton').textContent = 'Play Audio';
      }
    });
  
    switchButton.addEventListener('click', function () {
      cur = (cur ==0) ? 1 : 0;
      switchSong();
    });
  
    function switchSong() {

        localStorage.removeItem('audioProgress');
      audioPlayer.src = music[cur];
      audioPlayer.load();
      audioPlayer.play();
      switchButton.textContent = `Switch to Song ${cur + 1}`;
    }
  
    // Listen for the pause event
    audioPlayer.addEventListener('pause', function () {
      // Save the current playback time in local storage
      console.log(audioPlayer.currentTime);
      localStorage.setItem('audioProgress', audioPlayer.currentTime.toString());
    });
  
    // You can also add more functionality for play, stop, etc.
    // For example, to clear the saved progress when the audio is stopped:
    audioPlayer.addEventListener('ended', function () {
      localStorage.removeItem('audioProgress');
    });
  });
  
