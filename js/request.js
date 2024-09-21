const predictionEndpoint = 'https://polygraphaimodel-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ce06add1-915d-4544-bf9e-b53dbb56c815/classify/iterations/Iteration2/image';
const predictionKey = 'ed1441ab92bb4acbbeda400bd86fdeda';

const checkImageRealism = async (image) => {
    // Send the image to the Custom Vision Prediction API
    return fetch(predictionEndpoint, {
        method: 'POST',
        headers: {
            'Prediction-Key': predictionKey,
            'Content-Type': 'application/octet-stream' // Custom Vision API accepts image files
        },
        body: image
    })
    .then(response => response.json())
    .then(data => {
        // Display the response from Custom Vision
        const probPrcnt = data["predictions"][0]["probability"]
        const probabilityType = data["predictions"][0]["tagName"]
        return {
            probability: probPrcnt,
            type: probabilityType,
            success: true
        }
    })
    .catch(error => {
        console.log(error)
        return {success: false}
    });
};


const updatePercentageMain = (probability) => {
    const decimalValue = probability
    const finalPercentage = Math.trunc(decimalValue * 10000) / 100; 
    let currentPercentage = 0;
    document.getElementById("resultPrcnt").classList.remove("hidden")

    function updatePercentage() {
        if (currentPercentage < finalPercentage) {
            const difference = finalPercentage - currentPercentage;
            const increment = Math.max(difference * 0.1, 0.01); // Adjust speed dynamically

            currentPercentage += increment;
            currentPercentage = Math.min(currentPercentage, finalPercentage); 
            document.getElementById("resultPrcnt").innerText = `${currentPercentage.toFixed(2)}%`;

            requestAnimationFrame(updatePercentage);
        }
    }
    updatePercentage();
}

const updateResultText = (result) => {
    const tag = document.getElementById("result")
    tag.className = ''
    tag.classList.add("result-text")
    tag.classList.add("hidden")
    tag.innerText = result + ".";
    if(result === "Real"){
        tag.classList.add("result-real")
    }
    tag.classList.add("result-fake")
    tag.classList.remove("hidden")
}

document.getElementById("analyzeBtn").onclick = async () => {
    const input = document.getElementById('imageInput');
    if (input.files.length === 0) {
        alert("Please select an image");
        return;
    }

    const file = input.files[0];
    const response = await checkImageRealism(file);
    console.log(response)
    if (!response.success){
        alert("Something went wrong :(")
        return
    }

    document.getElementById("staticResult").innerText = "This image is,"
    document.getElementById("staticResult").classList.remove("hidden")
    updatePercentageMain(response.probability)
    updateResultText(response.type)
    return
}