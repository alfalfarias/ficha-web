<template>
  <v-card class="MainList">
    <v-card-title>
      <a href="#" class="text-decoration-none text-right text-md-left">
        #
      </a>
      Lista de contratos
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-title>
              <a href="#" class="text-decoration-none text-right text-md-left" >
                #
              </a>
              Búsqueda
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  v-model="search.rut"
                  label="Registro Único Tributario (RUT)"
                  prepend-inner-icon="mdi-email"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="search.email"
                  label="Correo electrónico"
                  prepend-inner-icon="mdi-email"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="search.phone"
                  label="Número telefónico"
                  prepend-inner-icon="mdi-phone"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-row v-if="isLoading.fetchPaginateRequest" justify="center">
            <v-progress-circular
            :size="60"
            :width="5"
            color="purple"
            indeterminate
            />
          </v-row>

          <v-alert 
          prominent 
          type="error"
          v-if="!isLoading.fetchPaginateRequest && pagination.data.length === 0"
          >
            <v-row align="center">
              <v-col class="grow" align="center">
                No existen contratos registrados en la plataforma.
              </v-col>
            </v-row>
          </v-alert>

          <v-row v-if="!isLoading.fetchPaginateRequest">
            <v-col
            v-for="item in pagination.data"
            :key="item.id"
            cols="12"
            >
              <DealCard
              :id="item.id"
              :status="item.status"
              :amount="item.amount"
              :date="item.date"
              :fullname="item.person.fullname"
              :dni="item.person.dni"
              :emails="item.emails"
              :phones="item.phones"
              />
            </v-col>
          </v-row>

          <br/>

          <v-pagination
          color="primary"
          v-model="pagination.page"
          :length="pagination.total"
          :total-visible="pagination.perPage"
          @input="changePage"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import DealCard from '../components/deal-card';
  import dump from '../dump';
  import { paginateResponse } from '../dump/fetch-paginate.dump';
  import { fromModel } from '../dto/deal-card.dto';
  import dealService from '../services/deal.service';

  export default {
    name: 'MainList',
    components: { 
      DealCard,
    },
    data() {
      return {
        dealService: dump,
        isLoading: {
          fetchPaginateRequest: false,
        },
        search: {
          rut: null,
          email: null,
          phone: null,
        },
        pagination: {
          page: 1,
          total: 0,
          perPage: 12,
          data: []
        },
      };
    },
    filters: { },
    methods: { 
      clearInput(input) {
        input = '';
      },
      changePage(page) {
        this.fetchPaginate({page: page});
      },
      async fetchPaginate({page = 1, perPage = 12} = {}) {
        const search = this.search;
        const queryParams = {}; 
        for (const key in search) {
          const value = search[key];
          if (value) {
            queryParams[key] = `${value}%`;
          }
        }

        try {
          this.isLoading.fetchPaginateRequest = true;

          const response = paginateResponse;
          // const response = await dump.fetchPaginate({timeout: 1000});
          this.pagination.data = [...response.data.map(item => fromModel(item))];
          this.pagination.perPage = response.perPage;
          this.pagination.total = response.total;
          // this.pagination.data = response.data;

          this.isLoading.fetchPaginateRequest = false;
        } catch (error) {
          this.isLoading.fetchPaginateRequest = false;
          throw error;
        }

        


        // const pagination = await this.dealService.fetchPaginate({
        //   page: page, 
        //   perPage: perPage, 
        //   sort: '-id', 
        //   queryParams: queryParams,
        // });
        // console.log('pagination', pagination);
      },
      async refresh() {
        this.fetchPaginate();
      },
    },
    async created() { 
      this.refresh();
    },
  };
</script>