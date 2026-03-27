import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

// export enum THEME {
//     LIGHT = 'LIGHT',
//     DARK = 'DARK',
// }

type TTheme = 'LIGHT' | 'DARK';

interface IThemeContext {
    //이 상태들이 value가 될 거임
    theme: TTheme;
    toggleTheme: () => void;
    //이렇게 하나로 만들어도 됨 (편한대로하기)
}

// type TThemeContextAction = {
//     toggleTheme: () => void;
// }

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>('LIGHT');

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === 'LIGHT' ? 'DARK' : 'LIGHT'
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};