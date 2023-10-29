import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const UserSignOut = () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  return (
    <div className="w-full border h-16 rounded-xl flex p-4 gap-4 items-center justify-between">
      <p className="">Your Info</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default UserSignOut
