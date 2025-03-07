const recommendations = document.getElementById("recommendations");
async function getRecommendations(){
    recommendations.innerHTML = "";
    const artist = document.getElementById("artist").value;
    const response = await fetch(`/api/recommendations?artist=${artist}`);
    const data = await response.json();
    console.log(data);
    if(data.error){
        const errorMessage = document.createElement("p");
        errorMessage.textContent = data.message;
        recommendations.appendChild(errorMessage);
    }
    else{
        const message = document.createElement("p");
        message.textContent = `Here some songs we recommend from ${data.toptracks["@attr"].artist}`;
        recommendations.appendChild(message);
        const unorderedList = document.createElement("ul");
        for(let i = 0; i < 5; i++){
            const trackName = data.toptracks.track[i].name;
            const listItem = document.createElement("li");
            listItem.textContent = trackName;
            unorderedList.appendChild(listItem);
        }
        recommendations.appendChild(unorderedList);
    }
}

