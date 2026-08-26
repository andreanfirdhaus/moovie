import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';

export interface UserProfile {
    id: string;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
}

interface AuthContextValue {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signInWithGoogle: () => Promise<{ error: Error | null }>;
    signUp: (
        email: string,
        password: string,
        username: string
    ) => Promise<{ error: Error | null; needsConfirmation: boolean }>;
    resetPassword: (email: string) => Promise<{ error: Error | null }>;
    updatePassword: (password: string) => Promise<{ error: Error | null }>;
    updateEmail: (email: string) => Promise<{ error: Error | null }>;
    updateProfile: (data: {
        username?: string;
        full_name?: string;
        avatar_url?: string;
    }) => Promise<{ error: Error | null }>;
    uploadAvatar: (file: File) => Promise<{ error: Error | null }>;
    deleteAccount: () => Promise<{ error: Error | null }>;
    signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadProfile = async (userId: string) => {
        const { data } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url')
            .eq('id', userId)
            .maybeSingle();
        setProfile(data as UserProfile | null);
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            if (data.session?.user) void loadProfile(data.session.user.id);
            setIsLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            if (nextSession?.user) void loadProfile(nextSession.user.id);
            else setProfile(null);
            setIsLoading(false);
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const value: AuthContextValue = {
        user: session?.user ?? null,
        profile,
        session,
        isLoading,
        signIn: async (email, password) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error };
        },
        signInWithGoogle: async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/profile` },
            });
            return { error };
        },
        signUp: async (email, password, username) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } },
            });
            return { error, needsConfirmation: Boolean(data.user && !data.session) };
        },
        resetPassword: async (email) => {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            return { error };
        },
        updatePassword: async (password) => {
            const { error } = await supabase.auth.updateUser({ password });
            return { error };
        },
        updateEmail: async (email) => {
            const { error } = await supabase.auth.updateUser({ email });
            return { error };
        },
        updateProfile: async (data) => {
            if (!session?.user) return { error: new Error('You must be signed in.') };
            const { error } = await supabase.from('profiles').update(data).eq('id', session.user.id);
            if (!error) {
                setProfile((current) => (current ? { ...current, ...data } : current));
                await supabase.auth.updateUser({ data });
            }
            return { error };
        },
        uploadAvatar: async (file) => {
            const extension = file.name.split('.').pop() || 'jpg';
            const path = `${session?.user.id}/avatar.${extension}`;
            const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
                upsert: true,
                contentType: file.type,
            });
            if (uploadError) return { error: uploadError };
            const { data } = supabase.storage.from('avatars').getPublicUrl(path);
            return value.updateProfile({ avatar_url: `${data.publicUrl}?t=${Date.now()}` });
        },
        deleteAccount: async () => {
            const { error } = await supabase.rpc('delete_user');
            if (!error) setSession(null);
            return { error };
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            return { error };
        },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
}
