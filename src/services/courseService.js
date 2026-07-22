import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const mapCourses = (data) =>
  data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.body,
    teacherId: item.userId,
  }));

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);

    return mapCourses(response.data);
  } catch (error) {
    console.error("Error al obtener los cursos:", error);

    throw new Error("No fue posible cargar los cursos.", {
      cause: error,
    });
  }
};

export const getCoursesWithFetch = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al consumir la API.");
    }

    const data = await response.json();

    return mapCourses(data);
  } catch (error) {
    console.error("Error al obtener los cursos con fetch:", error);

    throw new Error("No fue posible cargar los cursos con fetch.", {
      cause: error,
    });
  }
};