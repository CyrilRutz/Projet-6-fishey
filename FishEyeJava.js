// lister tous les usages de données :
// - liste des photographes, DONE
// - liste des photographes par tag,
// - liste des medias par photographe DONE
// - total de like pour un photographe
// - liste de tous les tags
//
class ServiceData {
    static async getJsonData() {
        const dataFetch = await fetch("/FishEyeData.json");
        return await dataFetch.json();
    }
    static async loadPhotographers() {
        const data = await ServiceData.getJsonData();
        const photographers = data.photographers;
        return photographers;
    }

    static async loadPhotographersByCity(city) {
        const data = await ServiceData.getJsonData();
        const photographers = data.photographers;
        return photographers.filter((photographer) => photographer.city === city);
    }

    static async loadMediaByPhotographerId(id) {
        const data = await ServiceData.getJsonData();
        const media = data.media;
        return media.filter((media) => media.photographerId === id);
    }
    static async loadPhotographersByTags(tags) {
        const data = await ServiceData.getJsonData();
        const photographers = data.photographers;
        return photographers.filter((photographer) => photographer.tags === tags);
    }
    static async loadTags() {
        const data = await ServiceData.getJsonData();
        const photographers = data.photographers;
        const tags = new Set();
       for(const photographer of photographers) {
            for (const tag of photographer.tags) {
                tags.add(tag);
            }
        }
        return tags;
    }
    static async loadMediasByLikes(){
            const data = await ServiceData.getJsonData();
            const media = data.media;
            return media;
    }
}

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
        document.querySelector(['header .tags']).appendChild(headerTags)
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
 const addCard = (photographer)=> {
    const element= document.createElement("section")
    const card =
        `<a href="#"><img src="FishEye_Photos/Sample_Photos/Photographers_ID_photos/${photographer.portrait}" alt="${photographer.name}" class ="cardimg">
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
