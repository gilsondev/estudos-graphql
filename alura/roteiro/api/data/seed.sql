CREATE TABLE turmas(
   id INTEGER PRIMARY KEY,
   description TEXT NOT NULL,
   hour TEXT NOT NULL,
   vacancy INTEGER,
   started_at TEXT,
   teacher_id INTEGER NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matriculas(
	id INTEGER PRIMARY KEY,
	student_id INTEGER NOT NULL,
	turma_id INTEGER NOT NULL,
	status TEXT NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO turmas (description, hour, vacancy, started_at, teacher_id)
VALUES 
   ("básico", "manhã", 10, "2020-08-01", 4),
   ("intermediário", "manhã", 5, "2020-08-01", 4),
   ("conversação", "noite", 10, "2020-08-01", 5);

INSERT INTO matriculas (student_id, turma_id, status)
VALUES 
   (1, 1, "confirmado"),
   (2, 2, "confirmado"),
   (3, 3, "cancelado");
