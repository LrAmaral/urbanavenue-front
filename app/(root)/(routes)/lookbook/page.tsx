import { Metadata } from 'next'
import Gallery from './components/Gallery'

export const metadata: Metadata = {
  title: 'takeatrip | UrbanAvenue®',
  description: 'Lookbook Page',
}

const Lookbook = () => {
  return (
    <div className="w-full flex-col items-center flex justify-center">
      <div className="max-w-[76.875rem] xs:px-6 px-8 mx-auto">
        <div className="flex flex-col justify-center items-center py-32">
          <div className="w-full text-center space-y-4">
            <p className="text-2xl font-semibold">Inspire Your Look</p>
            <br />
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lookbook
