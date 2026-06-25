const Navbar = () => {
  return (
    <nav className="w-full border-b border-zinc-850 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        {/* Only Logo / Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]" />

          <span className="text-md font-bold tracking-wider uppercase text-zinc-100 font-mono">
            Todo<span className="text-indigo-500">_Ledger</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
