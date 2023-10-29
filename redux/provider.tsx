/// <reference types="redux-persist/types" />

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

type ProviderProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <Provider store={}>
      <PersistGate loading={null} persistor={}>
        {children}
      </PersistGate>
    </Provider>
  )
}
