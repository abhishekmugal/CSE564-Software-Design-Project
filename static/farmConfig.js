function init() {
    $.get("/getFarmConfiguration", function (data, status) {
        console.log(data)
        const cropType = data.configuration.map(e => e[2]);
        const soilType = data.configuration.map(e => e[3]);
        const soilThreshold = data.configuration.map(e => e[4]);
        document.getElementById('farmLocation').value = data.farmLocation
        
        Array.from(document.getElementsByClassName('cropType')).map((e, i) => e.value = cropType[i])
        Array.from(document.getElementsByClassName('soilType')).map((e, i) => e.value = soilType[i])
        Array.from(document.getElementsByClassName('threshold')).map((e, i) => e.value = soilThreshold[i])

    });
}

function submitBtn() {
    const objToPost = {
        farmLocation: document.getElementById('farmLocation').value,
        configuration: []
    }
    Array.from(document.getElementsByClassName('cropType')).forEach((e, i) => {
        objToPost.configuration.push([
            i,
            i,
            e.value
        ])
    })
    Array.from(document.getElementsByClassName('soilType')).forEach((e, i) => {
        objToPost.configuration[i].push(e.value)
    })
    Array.from(document.getElementsByClassName('threshold')).forEach((e, i) => {
        objToPost.configuration[i].push(e.value)
    })
    console.log(objToPost)
}


init();