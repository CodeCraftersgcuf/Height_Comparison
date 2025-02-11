import ChildCalculator from './components/ChildCalculator'
import HeightConverter from './components/HeightConverter'

const page = () => {
  return (
    <div className="container mx-auto flex flex-col gap-12">
      <ChildCalculator/>
      <HeightConverter/>
    </div>
  )
}

export default page
