import { useState } from "react";

function useCustomFetch(initialValue = false) {
    const [state, setState] = useState(initialValue);
    const toggle = () => setState((prev) => !prev);

    return [state, toggle] as const;
}

export default useCustomFetch;