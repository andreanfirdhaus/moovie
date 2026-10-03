import { useState } from 'react';
import { useAuth, UserProfile } from '@/context/authContext';
import type { User } from '@supabase/supabase-js';

interface FormData {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export const useAccountSettings = (user: User | null, profile: UserProfile | null) => {
    const { updateProfile, uploadAvatar, updateEmail, updatePassword } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        fullName: profile?.full_name || user?.user_metadata?.full_name || '',
        username: profile?.username || user?.user_metadata?.username || '',
        email: user?.email || '',
        password: '',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');
    const [accountError, setAccountError] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const clearNotices = () => {
        setAccountMessage('');
        setAccountError('');
    };

    const handleFieldChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        clearNotices();
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setAccountError('Please choose an image file.');
            return;
        }

        setAvatarFile(file);
        clearNotices();
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        clearNotices();
        setIsSaving(true);

        try {
            if (avatarFile) {
                const { error: avatarError } = await uploadAvatar(avatarFile);
                if (avatarError) throw new Error(avatarError.message);
            }

            if (formData.username.trim() || formData.fullName.trim()) {
                const { error: profileError } = await updateProfile({
                    username: formData.username.trim(),
                    full_name: formData.fullName.trim(),
                });
                if (profileError) throw new Error(profileError.message);
            }

            if (formData.email && formData.email !== user?.email) {
                const { error: emailError } = await updateEmail(formData.email.trim());
                if (emailError) throw new Error(emailError.message);
            }

            if (formData.password) {
                const { error: passwordError } = await updatePassword(formData.password);
                if (passwordError) throw new Error(passwordError.message);
            }

            setAvatarFile(null);
            setFormData((prev) => ({ ...prev, password: '' }));

            setAccountMessage('All changes saved successfully!');
        } catch (error) {
            setAccountError(error instanceof Error ? error.message : 'An error occurred while saving changes');
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        handleFieldChange,
        handleAvatarChange,
        handleSaveChanges,
        isSaving,
        accountMessage,
        accountError,
        clearNotices,
        avatarFile,
        setAvatarFile,
    };
};
