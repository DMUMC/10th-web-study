import { useCallback, useEffect, useState } from "react";

export default function useSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    //==open 함수를 재렌더링마다 새로 만들지 말고 같은 함수를 재사용하라
    //useCallback을 사용하여서 함수를 고정하는 것
    const open = useCallback(() => {
        setIsOpen(true);
        //여기서 []는 의존성 배열(이 값들이 안바뀌면 함수를 다시 만들지 마라)
        //만약 [isOpen]이 있다면
        //isOpen이 바뀔 때마다 open함수가 새로 만들어지게 된다. 
    }, []);
    //useCallback이 없다면
    //     const open = () => {
    //   setIsOpen(true);
    // };  컴포넌트가 렌더링 될 때마다 새로운 함수 객체가 생성되어 open !== open 상태가 계속 발생하게 된다.
    const close = useCallback(() => {
        setIsOpen(false);
    }, [])
    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [])

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

