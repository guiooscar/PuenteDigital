-- 1. USUARIOS (6 usuarios: 2 por nivel)
INSERT INTO puente_digital.users (name_user, email_user, password_user, level_user)
VALUES
  ('María López', 'maria.lopez@example.com', 'hashed123', 'basico'),
  ('Jorge Díaz', 'jorge.diaz@example.com', 'hashed456', 'basico'),
  ('Carlos Gómez', 'carlos.gomez@example.com', 'hashed789', 'intermedio'),
  ('Lucía Méndez', 'lucia.mendez@example.com', 'hashedabc', 'intermedio'),
  ('Ana Ramírez', 'ana.ramirez@example.com', 'hasheddef', 'funcional'),
  ('Roberto Sánchez', 'roberto.sanchez@example.com', 'hashedghi', 'funcional');

-- 2. MÓDULOS (2 por nivel → 6 módulos totales)
INSERT INTO puente_digital.modules (title_module, description_module, level_module, order_module)
VALUES
  -- Nivel Básico
  ('Introducción al Computador', 'Aprende las partes básicas de una computadora y cómo encenderla.', 'basico', 1),
  ('Navegación Web Básica', 'Cómo usar un navegador, abrir pestañas y buscar información.', 'basico', 2),
  
  -- Nivel Intermedio
  ('Correo Electrónico', 'Crear una cuenta de correo, enviar y recibir mensajes.', 'intermedio', 1),
  ('Formularios Gubernamentales', 'Usar páginas como la Registraduría o SENA.', 'intermedio', 2),
  
  -- Nivel Funcional
  ('Compras Seguras en Línea', 'Identificar sitios seguros y evitar fraudes al comprar.', 'funcional', 1),
  ('Herramientas de Productividad', 'Uso básico de Google Docs, Sheets y Drive.', 'funcional', 2);

-- 3. ACTIVIDADES (3 por módulo → 18 actividades totales)
-- Módulo 1: Introducción al Computador (id_module = 1)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (1, 'Partes del computador', 'video', 'URL_VIDEO_PARTES', 1),
  (1, 'Encender y apagar correctamente', 'exercise', 'Guía paso a paso con imágenes', 2),
  (1, 'Test: ¿Qué aprendiste?', 'quiz', '5 preguntas de opción múltiple', 3);

-- Módulo 2: Navegación Web Básica (id_module = 2)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (2, 'Cómo abrir Chrome', 'video', 'URL_VIDEO_CHROME', 1),
  (2, 'Buscar "clima en Chía"', 'exercise', 'Tarea guiada: escribe en Google y toma captura', 2),
  (2, '¿Qué es una URL?', 'quiz', 'Evaluación final del módulo', 3);

-- Módulo 3: Correo Electrónico (id_module = 3)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (3, 'Crear cuenta en Gmail', 'video', 'URL_VIDEO_GMAIL', 1),
  (3, 'Enviar correo a tu tutor', 'exercise', 'Instrucciones con pantallazos', 2),
  (3, 'Test de conocimientos', 'quiz', '¿Para qué sirve el asunto?', 3);

-- Módulo 4: Formularios Gubernamentales (id_module = 4)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (4, 'Acceder a la Registraduría', 'video', 'URL_VIDEO_REGISTRADURIA', 1),
  (4, 'Solicitar certificado de votación', 'exercise', 'Simulador interactivo', 2),
  (4, 'Evaluación final', 'quiz', 'Preguntas sobre trámites', 3);

-- Módulo 5: Compras Seguras (id_module = 5)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (5, 'Identificar sitios seguros (HTTPS)', 'video', 'URL_VIDEO_HTTPS', 1),
  (5, 'Simulación: comprar en Linio', 'exercise', 'Entorno seguro de prueba', 2),
  (5, '¿Es una estafa?', 'quiz', 'Análisis de correos sospechosos', 3);

-- Módulo 6: Herramientas de Productividad (id_module = 6)
INSERT INTO puente_digital.activities (id_module, title_activity, type_activity, content_activity, order_activity)
VALUES
  (6, 'Crear documento en Google Docs', 'video', 'URL_VIDEO_DOCS', 1),
  (6, 'Compartir y colaborar', 'exercise', 'Trabajo en grupo simulado', 2),
  (6, 'Evaluación final', 'quiz', 'Preguntas sobre Drive y permisos', 3);

-- 4. PROGRESO (simulación realista de avance)
--Usuarios de nivel básico (María y Jorge) → solo acceden a módulos 1 y 2
INSERT INTO puente_digital.progress (id_user, id_activity, completed, score, attempts, last_attempt_date)
VALUES
  -- María (id_user=1)
  (1, 1, true, 100.00, 1, NOW()),
  (1, 2, true, 90.00, 1, NOW()),
  (1, 3, true, 85.00, 1, NOW()), -- ¡Aprobado! → podría recibir certificado de módulo 1
  (1, 4, true, 100.00, 1, NOW()),
  (1, 5, true, 75.00, 1, NOW()),
  (1, 6, false, 60.00, 2, NOW()), -- No aprobado (requiere 70%)

  -- Jorge (id_user=2)
  (2, 1, true, 100.00, 1, NOW()),
  (2, 2, false, 50.00, 3, NOW()), -- Ha intentado 3 veces, no aprobado

  -- Usuarios de nivel intermedio
  -- Carlos (id_user=3) → completó módulo 3
  (3, 7, true, 100.00, 1, NOW()),
  (3, 8, true, 100.00, 1, NOW()),
  (3, 9, true, 95.00, 1, NOW()),

  -- Lucía (id_user=4) → en progreso en módulo 4
  (4, 10, true, 100.00, 1, NOW()),
  (4, 11, true, 80.00, 1, NOW()),
  (4, 12, false, 65.00, 1, NOW()),

  -- Usuarios de nivel funcional
  -- Ana (id_user=5) → completó módulo 5 y 6
  (5, 13, true, 100.00, 1, NOW()),
  (5, 14, true, 95.00, 1, NOW()),
  (5, 15, true, 90.00, 1, NOW()),
  (5, 16, true, 100.00, 1, NOW()),
  (5, 17, true, 100.00, 1, NOW()),
  (5, 18, true, 85.00, 1, NOW());

-- 5. CERTIFICADOS (solo si completó todas las actividades de un módulo)
INSERT INTO puente_digital.certificates (id_user, id_module)
VALUES
  (1, 1),  -- María: certificado de "Introducción al Computador"
  (3, 3),  -- Carlos: certificado de "Correo Electrónico"
  (5, 5),  -- Ana: certificado de "Compras Seguras"
  (5, 6);  -- Ana: certificado de "Herramientas de Productividad"