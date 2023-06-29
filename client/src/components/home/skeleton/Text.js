import Animate from "../Animate"

const Text = ({mt}) => {
  return (
    <div className={`w-full h-4 rounded-md bg-indigo-50 overflow-hidden relative mt-${mt}`}>
        <Animate/>
    </div>
  )
}

export default Text