<template>
    <h4>{{ title }}</h4>
    <div class="container mt-4">

        <form v-if="cursosList.length > 0" @submit.prevent="emitir($event)" novalidate>

            <div class="mb-3">
                <label class="form-label">Curso *</label>
                <select v-model="item.cursoId" class="form-select" required>
                    <option value="">Seleccione</option>
                    <option v-for="(value, index) in cursosList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
                </select>
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input v-model="item.nombre" type="text" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">Correo *</label>
                <input v-model="item.email" type="email" class="form-control" required />
                <div class="invalid-feedback">El valor es requerido.</div>
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'EstudiantesCrear',
    data() {
        return {
            title: 'Agregar Estudiantes',
            item: {},
            cursosList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.obtenerCursos();
    },
    updated() {
        // Componente actualizado
    },
    destroyed() {
        // Componente destruido
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.

        emitir(event) {
            const form = event.target;

            // Si no es válido, muestra los errores con Bootstrap
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Si es válido, puedes enviar los datos
            this.$emit('created', this.item);
        },
        obtenerCursos() {
            this.axios.get(process.env.VUE_APP_API_URL + '/cursos')
                .then((response) => {
                    this.cursosList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>