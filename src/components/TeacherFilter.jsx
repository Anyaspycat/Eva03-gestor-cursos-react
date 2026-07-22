const TeacherFilter = ({
  selectedTeacher,
  onTeacherChange,
  teachers,
}) => {
  return (
    <div className="teacher-filter">
      <label htmlFor="teacher">Filtrar por docente:</label>

      <select
        id="teacher"
        value={selectedTeacher}
        onChange={(event) => onTeacherChange(event.target.value)}
      >
        <option value="">Todos los docentes</option>

        {teachers.map((teacherId) => (
          <option key={teacherId} value={teacherId}>
            Docente {teacherId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherFilter;