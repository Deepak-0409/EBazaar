const SizesList = ({list,deleteSize}) =>{
    return list.length >0 && <>
    <h1 className="capitalize  mt-3 text-gray-400 text-base">Sizes List</h1>
    <div className="flex flex-wrap mt-1 -mx-2">
        {list.map(size => (
            <div key={size.name} className="size" onClick={() => deleteSize(size.name)}>{size.name}</div>
        ))}
    </div></>
}

export default SizesList;