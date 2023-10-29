import { Metadata } from 'next'
import OrdersHistory from './components/OrdersHistory'
import UserSignOut from './components/UserSignOut'

export const metadata: Metadata = {
  title: 'user | UrbanAvenue®',
  description: 'Contact Page',
}

export default function User() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-[76.875rem] mx-auto xs:px-6 px-8 h-1/2 w-full space-y-6">
        <UserSignOut />
        <OrdersHistory />
      </div>
    </div>
  )
}
