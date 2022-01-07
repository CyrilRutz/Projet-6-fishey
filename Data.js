

 export default class ServiceData{
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
    static async loadPhotographerById(id) {
        const data = await ServiceData.getJsonData();
        const photographer = data.photographers;
        return photographer.filter((photographer) => photographer.id === id);
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

