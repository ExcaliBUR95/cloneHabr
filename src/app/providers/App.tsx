import { Link } from "react-router-dom";
import "../styles/index.scss";
import { classNames } from "shared/lib/classnames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./router";
import { Navbar } from "widgets/Navbar";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

export default App;

// createContext, ? в тс, provider
