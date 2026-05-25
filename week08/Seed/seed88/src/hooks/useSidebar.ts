import { useCallback, useEffect, useState } from "react";

export default function useSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}