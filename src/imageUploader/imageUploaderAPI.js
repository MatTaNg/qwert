export const uploadImage = async (imageUrl, name) => {
    //Note local storage is only about 5MB total so images should not exeed that or it will throw an error.
    try {
        const allImages = await getImages();
        allImages.push({imageUrl: imageUrl.dataURL, name});
        localStorage.setItem('images', JSON.stringify(allImages));
        return Promise.resolve(allImages);
    } catch(e) {
        console.log('error', e);
        return Promise.reject(e);
    }
}
export const getImages = () => {
    try {
        const images = JSON.parse(localStorage.getItem('images') || '[]');
        return Promise.resolve(images);
    }
    catch(e) {
        console.log('error', e);
        return Promise.reject(e);
    }
}