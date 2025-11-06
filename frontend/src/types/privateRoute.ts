import type { ReactNode } from "react";

export interface PrivateRouteProps {
    children: ReactNode;
    roles?: string[]; 

}