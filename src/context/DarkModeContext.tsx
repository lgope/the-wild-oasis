import { ReactNode, createContext, useEffect } from "react";
import { useLocalStorageState } from "@/hooks";

type DarkModeCtxType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeCtxType>({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

type DarkModeProviderProps = {
    children: ReactNode;
};
function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: light)").matches,
        "isDarkMode"
    );

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }
        },
        [isDarkMode]
    );

    function toggleDarkMode() {
        setIsDarkMode((isDark: boolean) => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}
export default DarkModeProvider;
