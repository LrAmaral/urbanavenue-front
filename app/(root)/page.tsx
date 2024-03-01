import Product from '@/components/Product'

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-[76.875rem] mx-auto xs:px-6 px-8">
        <Product />
      </div>
    </div>
  )
}
