<template>
  <section class="hero">
    <h2>Estudiantes y Cursos</h2>
    <p>Curso al que se encuentran registrados los estudiantes</p>
  </section>

  <section id="servicios">
    <h3>Nuestros Servicios</h3>
    <div class="servicios">
      <div class="servicio">
        <h4>Consultas Generales</h4>
        <p>Consultas de los cursos y estudiantes</p>
      </div>
      <div class="servicio">
        <h4>Estudiantes</h4>
        <p>Inscribirse a un curso</p>
      </div>
      <div class="servicio">
        <h4>Cursos</h4>
        <p>Cursos abiertos</p>
      </div>
    </div>
  </section>

  <section id="nosotros">
    <h3>Sobre Nosotros</h3>
    <p style="max-width: 700px; margin: auto; text-align: center;">
      Gestionamos los datos y la informacion con integridad
    </p>
  </section>

</template>

<script>

</script>

<style>
.servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.servicio {
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.servicio h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.hero {
  background-image: url('https://images.unsplash.com/photo-1752061823107-11cac0764eab');
  background-size: cover;
  background-position: center;
  color: var(--white);
  padding: 6rem 2rem;
  text-align: center;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color:blue;
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: auto;
  color: white;
}

section {
  padding: 4rem 2rem;
  margin: auto;
}

section h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--secondary);
}

h1 a {
  text-decoration: none;
}
</style>