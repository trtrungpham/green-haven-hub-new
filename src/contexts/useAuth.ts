import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  name: string;
}

let cachedUser: User | null = null;

export const getCurrentUser = () => cachedUser;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(cachedUser);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          cachedUser = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Admin",
          };
          setUser(cachedUser);
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        cachedUser = {
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Admin",
        };
        setUser(cachedUser);
      } else {
        cachedUser = null;
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return user;
};

export const useLogout = () => {
  const logout = async () => {
    await supabase.auth.signOut();
    cachedUser = null;
  };
  return logout;
};
