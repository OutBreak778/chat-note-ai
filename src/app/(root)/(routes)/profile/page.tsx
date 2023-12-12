"use client"

import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

const page = () => {

    const {theme} = useTheme()

  return (
    <div className="absolute mb-4 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[23%] text-center">
        <UserProfile
        appearance={{ 
          baseTheme: (theme === "dark" ? dark : undefined),
          variables: { colorPrimary: "white" },
        }}
      />
    </div>
  )
}

export default page