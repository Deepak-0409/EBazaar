import Animate from "../Animate"

const Thumbnail = ({height}) => {
  return (
    <div className={`w-full h-[${height}] relative rounded-md bg-indigo-50 overflow-hidden`}>
        <Animate/>
    </div>
  )
}

export default Thumbnail