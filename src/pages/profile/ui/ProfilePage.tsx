import React, { useState } from 'react';
import { useAuth } from 'src/features/auth';
import { useAppDispatch } from 'src/app/store';
import { updateProfileThunk } from 'src/features/auth/model/authThunks';
import { ProfileFormPanel } from 'src/features/forms/ProfileForm';
import './profile-page.css';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return null;
  }

  const handleSubmitSuccess = async (values: typeof user.profile) => {
    setServerError(null);
    setIsSaving(true);

    try {
      await dispatch(updateProfileThunk(values)).unwrap();
    } catch (error) {
      setServerError(String(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <p className="profile-page__email">Email: {user.email}</p>
      {serverError && <p className="profile-page__error">{serverError}</p>}
      <ProfileFormPanel initialValues={user.profile} disabled={isSaving} onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
}
