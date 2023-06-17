const Colors = ({colors,deleteColor}) => {

    return(
        <div>
          {colors.length > 0 && <h1 className="capitalize mb-2 text-gray-400 text-base">Colors List</h1>}  
          {colors.length > 0 && <div className="flex flex-wrap -mx-1">
            {colors.map (color => (
                <div key = {color.id} className="w-8 h-8 rounded-full m-1 cursor-pointer hover:scale-110 transition-all" style={{background:color.color}} onClick={() => deleteColor(color)}></div>
            ))}
          </div>}
          
        </div>
    )
}

export default Colors;