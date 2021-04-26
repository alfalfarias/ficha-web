<template>
  <div class="MainList">
    <h2 class="v-heading">
      <a
        href="#data-iterators"
        class="text-decoration-none text-right text-md-left"
      >
        #
      </a>
      Data de Ruts
    </h2>

    <p>
      Lista de personas registradas en el sistema.
    </p>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search.rut"
          append-icon="mdi-magnify"
          label="Búsqueda por rut"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-container class="grey lighten-5">
          <v-row>
            <v-col
            v-for="item in pagination.data"
            :key="item.id"
            cols="4"
            >
              <PersonCard 
              :dni="item.dni" 
              :fullname="item.fullname" 
              :isLoading="item.isLoading" 
              @iconBtn="personShow(item)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="pagination.page"
          :length="pagination.length"
          :total-visible="pagination.totalVisible"
        ></v-pagination>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import currency from '@/filters/currency';
import { parse } from '@/filters/datetime';
import PersonCard from '../components/PersonCard';
import { PersonCardDto, fromModel } from '../dto';
import { personService } from '../services';
import { apiData } from '../dump';

export default {
  name: 'MainList',
  components: {
    PersonCard,
  },
  data() {
    return {
      service: {

      },
      pagination: {
        page: 1,
        length: 15,
        totalVisible: 7,
        data: []
      },
      isLoading: {
        fetchAllRequest: false,
        createRequest: false,
        existsRutRequest: false,
      },
      search: {
        rut: null
      },
    };
  },
  filters: {
    currency,
    parse,
  },
  methods: {
    async fetchAll() {
      // try {
      //   this.isLoading.fetchAllRequest = true;
      //   const items = await this.rutService.fetchAll();
      //   this.items.splice(0, this.items.length);
      //   items.forEach((item) => {
      //     let itemDto = ItemRutDto(item);
      //     this.items.push(itemDto);
      //   });
      //   this.isLoading.fetchAllRequest = false;
      // } catch (error) {
      //   this.isLoading.fetchAllRequest = false;
      //   throw error;
      // }
    },
    async personShow(item) {
      item.isLoading = !item.isLoading;
      console.log(item);
    },
  },
  async created() { 
    const persons = apiData.map(item => fromModel(item));
    this.pagination.data.push(...persons);
  },
};
</script>