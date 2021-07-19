import {React, useState, useEffect, useRef} from 'react';
import {getImages, uploadImage} from './imageUploaderAPI';
import './imageUploader.css';

const ImageUploader = () => {
    const [imageSearch, setImageSearch] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [images, setImages] = useState([])
    const fileUploadRef = useRef();

    useEffect(() => {
        getImages().then((images) => {
            setImages(images);
        }).catch(() => {setShowErrorModal(true)});
    }, [])

    const handleOnChange = (e) => {
        setImageSearch(e.target.value);
    }

    const handleFileUpload = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        const { name } = file;
           
           reader.onload = (() => {
               return (e) => {
                   file.dataURL = e.target.result;
                   uploadImage(file, name).then((response) => {setImages(response)}).catch(() => setShowErrorModal(true));
               };
           })(file);
           reader.readAsDataURL(file);
    }

    const filteredImages = images.filter((image) => {
        return image.name.includes(imageSearch);
    })
    const renderImages = () => {
        return (
            <div className={'imagesContainer'}>
                {filteredImages.length} images
                <ul className={'images'}>
                    {filteredImages.slice(0, 4).map((image) => {
                        return (
                            <li key={image}><img width={'250px'} height={'200px'} alt={image.name} src={image.imageUrl} /></li>                    
                        )
                    })}
                </ul>
            </div>
        )
    }
    if(showErrorModal)
        return alert('Something went wrong!');

    return (
        <div className={'imageUploader'}>
            <input className={'searchInput'} placeholder={'Search images...'} onChange={handleOnChange} value={imageSearch}/>
            <input type="file" ref={fileUploadRef} onChange={handleFileUpload} style={{display: "none"}} />
            <input type="button" value="Upload" className={'uploadFile'} onClick={() => fileUploadRef.current.click()} />
            {renderImages()}
        </div>
    )
}

export default ImageUploader