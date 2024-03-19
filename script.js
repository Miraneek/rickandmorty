async function getData(apiLink) {
    const api = apiLink;
    const response = await fetch(api);
    if (response.ok) {
        return await response.json();
    }
    return null;
}


let currentLink = "https://rickandmortyapi.com/api/character";
let selection = "All"
document.querySelector("#select").addEventListener("change", () => {
    selection = document.querySelector("#select").value
    loadData()
})

async function loadData() {
    document.querySelector("#result").innerHTML = ""
    document.querySelector("#buttons").innerHTML = ""
    
    
    let data = await getData(currentLink);
    for (let item of data.results){
        const card = document.createElement("div")
        const img = document.createElement("img")
        img.src = item.image
        card.appendChild(img)

        const name = document.createElement("h2")
        name.textContent = item.name + " " + item.species
        const middle = document.createElement("p")
        middle.appendChild(name)
        card.appendChild(middle)

        const status = document.createElement("p")
        status.textContent = "Status: " + item.status
        card.appendChild(status)
        
        if (selection === "Alive"){
            if (item.status === "Alive"){
                document.querySelector("#result").appendChild(card)
            }
        } else if (selection === "Dead"){
            if (item.status === "Dead"){
                document.querySelector("#result").appendChild(card)
            }
        } else if (selection === "Unknown"){
            if (item.status === "Unknown"){
                document.querySelector("#result").appendChild(card)
            }
        } else if(selection === "All"){
            document.querySelector("#result").appendChild(card)
        }
    }
    
    let prev = document.createElement("button")
    prev.addEventListener("click", () => {
        currentLink = data.info.prev
        loadData()
    })
    prev.textContent = "Previous"

    let next = document.createElement("button")
    next.addEventListener("click", () => {
        currentLink = data.info.next
        loadData()
    })
    next.textContent = "Next"

    document.querySelector("#buttons").appendChild(prev)
    document.querySelector("#buttons").appendChild(next)
}

loadData()