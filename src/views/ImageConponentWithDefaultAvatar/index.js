


const ImageTagWithErrorImage = ({src, errorImage, alt, className = '', style }) => {

    return (
        <img
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = errorImage;
            }}
            src={src}
            alt={alt} 
            className={className}
            style={style}
        />
    )
}

export default ImageTagWithErrorImage;