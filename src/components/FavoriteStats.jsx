const FavoriteStats = ({ favorites, teachers }) => {
  const teachersWithFavorites = teachers
    .map((teacherId) => ({
      teacherId,
      total: favorites.filter(
        (favorite) => favorite.teacherId === teacherId
      ).length,
    }))
    .filter((teacher) => teacher.total > 0);

  return (
    <section className="favorite-stats">
      <h2>Favoritos por docente</h2>

      {teachersWithFavorites.length === 0 ? (
        <p>No existen cursos favoritos.</p>
      ) : (
        <ul>
          {teachersWithFavorites.map((teacher) => (
            <li key={teacher.teacherId}>
              Docente {teacher.teacherId}: {teacher.total} curso
              {teacher.total !== 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoriteStats;