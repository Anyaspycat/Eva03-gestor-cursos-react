const ThemeToggle = ({ darkMode, onToggleTheme }) => {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggleTheme}
      aria-pressed={darkMode}
    >
      {darkMode ? "Usar modo claro" : "Usar modo oscuro"}
    </button>
  );
};

export default ThemeToggle;