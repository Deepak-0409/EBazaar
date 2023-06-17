const ImagesPreview = ({url,heading}) =>{
    return (
        <div>
            {url && <div>
                <h1 className="capitalize  mt-4f text-gray-400 text-base">{heading}</h1>
                <div className="preview-img">
                    <img src={url} alt={heading} className="w-full h-full object-cover"/>
                </div>
            </div>}
        </div>
    )
}

export default ImagesPreview