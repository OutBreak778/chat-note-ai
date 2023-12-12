import React from 'react'
import { SignUp } from "@clerk/nextjs"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'OUTBREAK | SIGN-UP',
  }

export default function page(){
  return (
    <div><SignUp /></div>
  )
}
