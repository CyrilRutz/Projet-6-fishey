import ServiceData from "./Data.js"


const main = async () => {
    const url = new URL(document.location.href);
    const searchParams = new URLSearchParams(url.search);
    const photographerId = searchParams.get("id");
    const medias = await ServiceData.loadMediaByPhotographerId(Number(photographerId));
    const photographer = await ServiceData.loadPhotographerById(Number(photographerId));
    const photographerName = photographer.name;
    const photographerSplit = photographerName.split(' ');
    const totalLikes = medias.map(media => media.likes).reduce((likes,likesSum)=> likes + likesSum);
    const contactMe = document.querySelector('#contactBtn')
    const createMediaCard = (media) => {
        const card =
        ` 
        <figure>      
       <img src="FishEye_Photos/Sample_Photos/${photographerSplit[0]}/${media.image}" alt="${media.title}">
       <figcaption><span>${media.title}</span> <span>${media.likes}</span><i class="fa fa-heart"></i> </figcaption>
       </figure> 
       `
       return card;
    }


    const mediaView =  medias.map(media => createMediaCard(media)).join('');
    const photographerTags = (tags) => {
        const element = `<ul class = "tags photographertags">
    ${tags.map(tag => `<li class ='tag' > #${tag}</li>`)
                .join('')
        }
</ul>
    `
        return element
    };


    const header =
        `<a href="index.html"><img src="logo.png" alt="Fisheye Home page">`

    const hero =
        `<h1>${photographer.name}</h1> 
        <img src="FishEye_Photos/Sample_Photos/Photographers_ID_photos/${photographer.portrait}" alt="${photographer.name}" class ="photographerimg">
        <button id="contactBtn" class="Btn">Contactez-moi</button>
        <p class ="city">${photographer.city}, ${photographer.country}</p>
        <p class ="tagline">${photographer.tagline}</p>
        ${photographerTags(photographer.tags)}
        <p class = "price">${photographer.price}€/jour</p>
        `
    const form =
        `<form >
        <fieldset>
        <h1>Contactez moi <br> ${photographer.name}</h1>
        <button id="closeBtn"></button>
        <label>Prénom
               <input type="text" name="prénom">
        </label>
        <label>Nom
                <input type="text" name="nom">
        </label>
        <label>Email
        <input type="email" name="email">        
        </label>
        <label>Votre message
        <input type="text" name="message">
        </label>
        <input class="btn" type="submit" value="Envoyer">
               
        </fieldset>
        </form>
        `
    document.querySelector('.photographerSection').innerHTML = ` ${hero}  ${form}`;
    document.querySelector('.pictureSection').innerHTML = `${mediaView} <aside><span>${totalLikes}</span><i class="fa fa-heart"></i></aside>`
    document.querySelector('header').innerHTML=`${header}`
};
main();
