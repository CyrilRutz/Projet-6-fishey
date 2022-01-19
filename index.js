import ServiceData from "./Data.js"
async function main(title) {
    const photographerList = await ServiceData.loadPhotographers();
    const headerTags = await ServiceData.loadTags();
    const photographersMedias = await ServiceData.loadMediaByPhotographerId();
    const photographersByTags = await ServiceData.loadPhotographersByTags();
    const mediaByLikes = await ServiceData.loadMediasByLikes();
    photographerList.forEach(photographer => addCard(photographer))
    headerTags.forEach(tag => {
        const headerTags = document.createElement('li')
        headerTags.innerHTML = `#${tag}`
        headerTags.classList.add('tag')
        document.querySelector('header .tags').appendChild(headerTags)
    });
    const links = document.querySelectorAll("section a")
    for (const link of links) {addEventListener('click', goToPhotographerPage)
    };

}
 function goToPhotographerPage(event) {
    const link = event.target
 }
const photographerTags = (tags) =>{
    const element = `<ul class = "tags photographertags">
    ${
        tags.map(tag => `<li class ='tag' > #${tag}</li>`)
            .join('')
    }
</ul>
    `
    return element
}
 const addCard = (photographer)=> {
    const element= document.createElement("section")
    const card =
        `<a href="photographer.html?id=${photographer.id}"><img src="FishEye_Photos/Sample_Photos/Photographers_ID_photos/${photographer.portrait}" alt="${photographer.name}" class ="cardimg">
        <h2>${photographer.name}</h2> </a>
        <p class ="tagline">${photographer.tagline}</p>
        <p class ="city">${photographer.city}, ${photographer.country}</p>
        <p class = "price">${photographer.price}€/jour</p> 
        ${photographerTags(photographer.tags)}
        `
        element.innerHTML = card
        document.querySelector('article').appendChild(element);
}

main();

