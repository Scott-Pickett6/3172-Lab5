const recommendations = document.getElementById("recommendations");
async function getRecommendations(){
    const artist = document.getElementById("artist").value;
    const response = await fetch(`/api/recommendations?artist=${artist}`);
    const data = await response.json();
    console.log(data.toptracks);

}

