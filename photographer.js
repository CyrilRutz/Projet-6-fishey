import ServiceData from "./Data.js"

async function main(title) {

    const headerTags = await ServiceData.loadTags();
    const mediaByLikes = await ServiceData.loadMediasByLikes();
    document.querySelector('main').innerHTML= hero;
    headerTags.forEach(tag => {
        const headerTags = document.createElement('li')
        headerTags.innerHTML = `#${tag}`
        headerTags.classList.add('tag')
        document.querySelector('header').appendChild(headerTags)
    });

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
    const hero =
        `<img src="FishEye_Photos/Sample_Photos/Photographers_ID_photos/${photographer.portrait}" alt="${photographer.name}" class ="Heroimg">
        <h2>${photographer.name}</h2> 
        <p class ="tagline">${photographer.tagline}</p>
        <p class ="city">${photographer.city}, ${photographer.country}</p>
        <p class = "price">${photographer.price}€/jour</p> 
        ${photographerTags(photographer.tags)}
        `


const photographerLink = async () => {
    const url = new URL(document.location.href);
    const searchParams = new URLSearchParams(url.search);
    const photographerId = searchParams.get("id");
    const medias = await ServiceData.loadMediaByPhotographerId(Number(photographerId));
    const photographer = await ServiceData.loadPhotographerById(Number(photographerId));
    console.log(url);
    console.log(searchParams);
    console.log(medias);
    console.log(photographer);
};

photographerLink();
main();
