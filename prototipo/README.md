# SGD-LEGAL Unicórdoba — Prototipo navegable

Prototipo visual del Sistema de Gestión Documental Legal y Consolidación Normativa, basado en el documento *Análisis y especificación de requisitos v3.0*. Usa datos ficticios.

**Cómo abrirlo:** abra `index.html` en el navegador (no hace falta servidor ni instalar nada).

## Portal público (sin autenticación)
- **Inicio**: buscador, normas troncales, publicaciones recientes y catálogo de estados de vigencia.
- **Buscar** (RF-21): texto completo con facetas (tipo, órgano, tema, año, estado).
- **Ficha de norma** (RF-22, RI-01): estado de vigencia, leyenda informativa siempre visible (RB-01), texto vigente con notas de vigencia (RF-15), consulta a una fecha y por cohorte (RF-23/24), historial, comparador de versiones (RF-25), relaciones en ambos sentidos (RF-16), descargas HTML/JSON/Akoma Ntoso (RF-26, RNF-09), constancia de consulta (RF-27), plantilla de concordancia (RF-29) y alertas (RF-31).
- **Compilaciones temáticas** (RF-30), **Glosario** (RF-28) y **API** (RF-35).

## Consola de gestión (SSO simulado, «Ingreso funcionarios»)
- Bandeja por estado y responsable, con alertas de plazo (RF-17, RI-02).
- Reserva y anulación de números (RF-01, RB-03).
- Asistente de registro: validación de coherencia (RF-05), documentos y cotejo (RF-04), estructura del texto (RF-07), afectaciones sugeridas con confirmación humana (RF-11, RB-12, RB-05) y soporte formal para las no expresas (RF-10).
- Validación en dos niveles con comparador: aprobar, escalar a Jurídica o devolver (RF-18, RF-19, RB-09).
- Pista de auditoría encadenada (RF-33) y administración de usuarios, roles y catálogos (RF-32, RF-34).

Desde la barra lateral se puede cambiar de rol para recorrer cada perfil.
