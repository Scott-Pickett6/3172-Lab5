const recommendations = document.getElementById("recommendations");
async function getRecommendations(){
    const artist = document.getElementById("artist").value;
    const response = await fetch(`/api/recommendations?artist=${artist}`);
    const data = await response.json();
    console.log(data.toptracks.track);

    const unorderedList = document.createElement("ul");

    for(let i = 0; i < 5; i++){
        const trackName = data.toptracks.track[i].name;
        const listItem = document.createElement("li");
        listItem.textContent = trackName;
        unorderedList.appendChild(listItem);
    }
    recommendations.appendChild(unorderedList);
}

