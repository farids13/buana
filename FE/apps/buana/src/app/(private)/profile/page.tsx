import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import type { ReactElement } from 'react'

export default function Profile():ReactElement {
  return (
    <div className="card bg-purple-50 tw-space-y-3 tw-min-h-[calc(100vh-4rem)]">
    <h2>Profile</h2>
    <div className="tw-border-b-2 tw-border-dark-purple mb-10" />
    <ProfileForm/>
  </div>
  )
}

