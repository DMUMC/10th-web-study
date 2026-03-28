import { useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent() {
    const { theme } = useTheme();
    const isLightMode = theme === 'LIGHT';
    return (
        <div className={clsx(
            'p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <h1 className={clsx(
                'text-wxl font-bold',
                isLightMode ? 'text-black' : 'text-white'
            )}>Theme Content</h1>
            <p className={clsx(
                'mt-2', isLightMode ? 'text-black' : 'text-white'
            )}>
                Lorem ipsum dolor sit amet consectetur adipisicing lit. Maiores placeat
                dolorum magnam magni facere vel sequi itaque obcaecati, at, minus
                perspiciatis error sint iste quas laboriosam recusandae esse
                provident.
            </p>
        </div>
    );
}
//p-4 => padding 4
//w-full => with full