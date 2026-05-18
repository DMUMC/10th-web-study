import { useState } from "react";

export const useSidebar = () => {

  const [isOpened, setIsOpened] = useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);
  const toggle = () => setIsOpened((prev) => !prev);

  return { isOpened, open, close, toggle };
};