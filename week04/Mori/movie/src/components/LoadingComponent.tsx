import React from 'react'
import Spinner from './Spinner';

interface LoadingComponentProps {
  isPending: boolean;
  children: React.ReactNode;
}

export const LoadingComponent = ({ isPending, children }: LoadingComponentProps) => {
  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <Spinner />
        </div>
      )}
      {!isPending && (
        <>
          {children}
        </>
      )}
    </>
  )
}