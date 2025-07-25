<template>
    <h1>{{ title }}</h1>
    <button type="button" class="btn btn-outline-primary" @click="abrirModalParaCrear()">Nuevo</button>
    <br><br>

    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Buscar por nombre</span>
            <input type="search" v-model="textoAbuscar" class="form-control" @change="obtenerLista()">
        </div>
    </div>

    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text" id="basic-addon3">Filtrar por curso</span>
            <select v-model="filtroCurso" id="color" class="form-select" @change="obtenerLista()">
                <option disabled value="">-- Selecciona --</option>
                <option value="">Todos</option>
                <option v-for="(value, index) in cursosList" :key="index" :value="value.id">{{ value.nombre }}
                    </option>
            </select>
        </div>
    </div>



    <div class="table-responsive">
        <table class="table table-bordered border-secondary">
            <thead class="table-dark">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">nombre</th>
                    <th scope="col">email</th>
                    <th scope="col">curso</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.curso.nombre }}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" @click="abrirModalParaEditar(item)">
                            <i class="bi bi-pen-fill"></i>
                        </button>
                        &nbsp;
                        <button type="button" class="btn btn-outline-danger" @click="eliminar(item)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal Bootstrap -->
    <div class="modal fade" id="modalAutoEditar" tabindex="-1" aria-labelledby="modalAutoEditarLabel" aria-hidden="true"
        ref="modalRef">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <estudiantes-crear v-if="modalMode === 'crear'" @created="nuevo($event)"></estudiantes-crear>
                    <estudiantes-editar v-if="modalMode === 'editar'" :item="itemSeleccionado"
                        @updated="modificar($event)"></estudiantes-editar>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import EstudiantesCrear from './EstudiantesCrear.vue';
import EstudiantesEditar from './EstudiantesEditar.vue';

export default {
    name: 'EstudiantesList',
    data() {
        return {
            title: 'Estudiantes',
            items: [],
            modalBootstrapInstance: null,
            modalMode: "crear",
            itemSeleccionado: null,
            textoAbuscar:'',
            cursos: [],
            filtroCurso:'',
            itemLocal: { ...this.item },
            cursosList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        EstudiantesCrear,
        EstudiantesEditar
    },
    created() {
        // Componente creado
    },
    mounted() {
        // Componente montado
        this.$nextTick(() => {
            if (this.$refs.modalRef) {
                this.modalBootstrapInstance = new bootstrap.Modal(this.$refs.modalRef);
            } else {
                console.error('No se encontró el ref modalRef');
            }
        });
        this.obtenerLista();
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

        obtenerCursos() {
            this.axios.get(process.env.VUE_APP_API_URL + '/cursos')
                .then((response) => {
                    this.cursosList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },


        obtenerLista() {
            let filtro = "";
            if (this.filtroCurso !== "") {
                filtro = "&cursoId=" + this.filtroCurso;
                //filtro = "&cursoId=1" ;
                console.log('dfsds');
            }


            this.axios.get(process.env.VUE_APP_API_URL + '/estudiantes?_expand=curso'+ filtro +'&q=' + this.textoAbuscar)
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaCrear() {
            this.modalMode = "crear";
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.show();

            } else {
                console.error('modalBootstrapInstance no está inicializado');
            }
        },
        cerrarModal() {
            if (this.modalBootstrapInstance) {
                this.modalBootstrapInstance.hide();
            }
        },
        nuevo(value) {
            this.axios.post(process.env.VUE_APP_API_URL + '/estudiantes', value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        abrirModalParaEditar(item) {
            this.itemSeleccionado = { ...item };
            this.modalMode = "none";
            setTimeout(() => {
                if (this.modalBootstrapInstance) {
                    this.modalBootstrapInstance.show();
                    this.modalMode = "editar";
                } else {
                    console.error('modalBootstrapInstance no está inicializado');
                }
            })
        },
        modificar(value) {
            this.axios.patch(process.env.VUE_APP_API_URL + '/estudiantes/' + value.id, value)
                .then((response) => {
                    this.cerrarModal();
                    this.obtenerLista();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        eliminar(value) {
            if (confirm("¿Está seguro de eliminar este ítem?")) {
                this.axios.delete(process.env.VUE_APP_API_URL + '/estudiantes/' + value.id, value)
                    .then((response) => {
                        this.obtenerLista();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
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