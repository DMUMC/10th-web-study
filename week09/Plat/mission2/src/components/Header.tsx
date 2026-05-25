type HeaderProps = {
  amount: number;
};

const Header = ({ amount }: HeaderProps) => (
  <header className="bg-slate-800 text-white shadow-sm">
    <div className="mx-auto flex h-24 w-full items-center justify-between px-6 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-normal sm:text-5xl">Ohtani Ahn</h1>
      <div className="flex items-center gap-3">
        <svg
          aria-hidden="true"
          className="h-9 w-9"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2ZM7.17 14.75c-.75 0-1.41-.41-1.75-1.03L1.82 7.2A1 1 0 0 1 2.7 5.72h14.74c.75 0 1.23.8.87 1.46l-2.7 4.9a3 3 0 0 1-2.63 1.56H8.3l-1.1 2h11.3a1 1 0 1 1 0 2H7.2a2 2 0 0 1-1.75-2.97l1.72-3.12ZM4.42 7.72l2.76 5.02h5.8a1 1 0 0 0 .88-.52l2.48-4.5H4.42Z" />
        </svg>
        <span className="text-3xl font-extrabold">{amount}</span>
      </div>
    </div>
  </header>
);

export default Header;
