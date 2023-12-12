import React from 'react'
import { SignIn } from "@clerk/nextjs"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'OUTBREAK | SIGN-IN',
  }

export default function page()  {
    return <SignIn />
}
