import React from 'react';
import { useAuth } from 'src/features/auth';
import { ProfileFormPanel } from 'src/features/forms/ProfileForm';
import './profile-page.css';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <ProfileFormPanel initialValues={user.profile} onSubmitSuccess={updateProfile} />
    </div>
  );
}
