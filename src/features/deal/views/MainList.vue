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
        <v-col cols="12" md="3">
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
                  v-model="fieldSearch.rut"
                  label="Registro Único Tributario (RUT)"
                  prepend-inner-icon="mdi-email"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  @keyup="search"
                  @click:clear="search"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="fieldSearch.email"
                  label="Correo electrónico"
                  prepend-inner-icon="mdi-email"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  @keyup="search"
                  @click:clear="search"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                  v-model="fieldSearch.phone"
                  label="Número telefónico"
                  prepend-inner-icon="mdi-phone"
                  outlined
                  filled
                  dense
                  clearable
                  hide-details
                  @keyup="search"
                  @click:clear="search"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card v-if="isLoading.fetchPaginateRequest" color="primary" dark height="100%" minHeight="200px">
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                    <v-progress-circular
                    :size="60"
                    :width="5"
                    indeterminate
                    />
              </v-row>
            </v-container>
          </v-card>

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
              :createdAt="item.createdAt"
              :fullname="item.person.fullname"
              :dni="item.person.dni"
              :emails="item.emails"
              :phones="item.phones"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <br/>

      <v-pagination
      v-if="!isLoading.fetchPaginateRequest"
      color="primary"
      v-model="pagination.page"
      :length="pagination.total"
      :total-visible="pagination.perPage"
      @input="changePage"
      />
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
        dealService: dealService,
        isLoading: {
          fetchPaginateRequest: false,
        },
        requestSearch: {
          timeout: 1000,
          callback: null,
        },
        fieldSearch: {
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
      search() {
        if (this.requestSearch.callback) {
          clearTimeout(this.requestSearch.callback);
          this.requestSearch.callback = null;
        }
        this.requestSearch.callback = setTimeout(() => {
          this.fetchPaginate();
        }, this.requestSearch.timeout);
      },
      async changePage(page) {
        this.page = page;
        await this.fetchPaginate();
      },
      async fetchPaginate() {
        const search = this.fieldSearch;

        const queryParams = { }; 
        for (const key in search) {
          const value = search[key];
          if (value) {
            queryParams[key] = `${value}%`;
          }
        }

        try {
          this.isLoading.fetchPaginateRequest = true;

          console.log('antes');
          const response = await this.dealService.fetchPaginate({
            page: this.pagination.page,
            perPage: this.pagination.perPage,
            sort: '-id_negocio',
            queryParams: queryParams,
          });
          console.log('despues');
          this.pagination.data = [...response.data.map(item => new fromModel(item))];
          this.pagination.perPage = response.perPage;
          this.pagination.total = response.total;
          // this.pagination.data = response.data;

          this.isLoading.fetchPaginateRequest = false;
        } catch (error) {
          console.log('error', error);
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