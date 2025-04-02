import { User } from "./user-interface";

export interface UserContextProps {
    users: User[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}