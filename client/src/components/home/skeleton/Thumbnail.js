import Animate from "../Animate"

const Thumbnail = ({height}) => {
  return (
    <div className="w-full relative rounded-md bg-indigo-50 overflow-hidden" style={{height: height}}>
        <Animate/>
    </div>
  )
}

export default Thumbnail