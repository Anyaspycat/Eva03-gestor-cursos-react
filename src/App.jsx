import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import TeacherFilter from "./components/TeacherFilter";
import FavoriteStats from "./components/FavoriteStats";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const [favorites, setFavorites] = useLocalStorage(
    "favoriteCourses",
    []
  );

  const [darkMode, setDarkMode] = useLocalStorage(
    "darkMode",
    false
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const initializeCourses = async () => {
      try {
        const data = await getCourses();

        if (!isCancelled) {
          setCourses(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error.message || "Ocurrió un error inesperado.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    initializeCourses();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, [darkMode]);

  const teachers = useMemo(() => {
    const teacherIds = courses.map((course) => course.teacherId);

    return [...new Set(teacherIds)].sort((a, b) => a - b);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesTeacher =
        selectedTeacher === "" ||
        course.teacherId === Number(selectedTeacher);

      return matchesSearch && matchesTeacher;
    });
  }, [courses, searchTerm, selectedTeacher]);

  const handleToggleFavorite = (course) => {
    const exists = favorites.some(
      (favorite) => favorite.id === course.id
    );

    if (exists) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== course.id
      );

      setFavorites(updatedFavorites);
      return;
    }

    setFavorites([...favorites, course]);
  };

  const handleToggleTheme = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  return (
    <main className="app">
      <Header />

      <ThemeToggle
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
      />

      <section className="summary">
        <p>Total de cursos: {courses.length}</p>
        <p>Favoritos: {favorites.length}</p>
      </section>

      <FavoriteStats
        favorites={favorites}
        teachers={teachers}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TeacherFilter
        selectedTeacher={selectedTeacher}
        onTeacherChange={setSelectedTeacher}
        teachers={teachers}
      />

      {loading && <p className="message">Cargando cursos...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>

          <button type="button" onClick={loadCourses}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <CourseList
          courses={filteredCourses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}

export default App;