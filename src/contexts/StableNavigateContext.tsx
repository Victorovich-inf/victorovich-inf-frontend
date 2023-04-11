import { createContext, useContext, useRef, MutableRefObject, ReactNode } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom'

const StableNavigateContext =
  createContext<MutableRefObject<NavigateFunction> | null>(null)

const StableNavigateContextProvider = ({ children } :{children: ReactNode}) => {
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)

  return (
    <StableNavigateContext.Provider value={navigateRef}>
      {children}
    </StableNavigateContext.Provider>
  )
}

const useStableNavigate = (): NavigateFunction => {
  const navigateRef = useContext(StableNavigateContext) as any
  if (navigateRef.current === null)
    throw new Error('StableNavigate context is not initialized')

  return navigateRef.current
}

export {
  StableNavigateContext,
  StableNavigateContextProvider,
  useStableNavigate,
}
