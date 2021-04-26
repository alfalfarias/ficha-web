<template>
  <div class="scraper">
    <h1 class="v-heading text-h3 text-sm-h3 mb-4">
      <a
        href="#data-iterators"
        class="text-decoration-none text-right text-md-left"
      >
        #
      </a>
      Data de Ruts
    </h1>

    <p>
      La siguiente tabla corresponde al conjunto de ruts a ser monitorizados por
      el sistema de scraping. Este abarca a las plataformas:
      <strong>SII</strong>, <strong>Wom</strong> y <strong>Sinacofi</strong>.
    </p>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn
          class="mr-2"
          depressed
          color="success"
          :disabled="isLoading.createRequest"
          @click="openCreate"
        >
          <v-icon light>mdi-plus</v-icon>
          Nuevo
        </v-btn>

        <v-btn
          depressed
          color="primary"
          :disabled="isLoading.fetchAllRequest"
          @click="fetchAll"
        >
          <v-icon light>mdi-refresh</v-icon>
          Refrescar
        </v-btn>
      </v-card-title>
      <v-data-table
        :loading="isLoading.fetchAllRequest"
        loading-text="Cargado... Por favor espere"
        :footer-props="{
          'items-per-page-text': 'Filas por página',
        }"
        :headers="headers"
        :sort-by="['id']"
        :sort-desc="[true]"
        :items="items"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <v-alert prominent type="error">
            <v-row align="center">
              <v-col class="grow">
                Aún no hay ruts registrados en la plataforma. ¿Desea agregar el
                primero?
              </v-col>
              <v-col class="shrink">
                <v-btn depressed color="" @click="openCreate">
                  <v-icon light>mdi-plus</v-icon>
                  Nuevo
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </template>

        <template v-slot:item.aecoCode="{ item }">
          <template v-if="item.aecoCode !== null">
            {{ item.aecoCode }}
          </template>
          <v-chip v-else color="purple" text-color="white">
            Procesando SII
          </v-chip>
        </template>

        <template v-slot:item.womDebt="{ item }">
          <template v-if="item.womDebt !== null">
            {{ item.womDebt | currency }}
          </template>
          <v-chip v-else color="purple" text-color="white">
            Procesando WOM
          </v-chip>
        </template>

        <template v-slot:item.sinacofiDebt="{ item }">
          <template v-if="item.sinacofiDebt !== null">
            {{ item.sinacofiDebt | currency }}
          </template>
          <v-chip v-else color="purple" text-color="white">
            Procesando Sinacofi
          </v-chip>
        </template>

        <template v-slot:item.updatedAt="{ item }">
          {{ item.updatedAt | parse("LLL") }}
        </template>

        <template v-slot:item.botStatus="{ item }">
          <v-chip
            v-if="item.botStatus == 'ENABLED'"
            :disabled="item.isUpdating"
            @click="changeMonitoring(item)"
            color="primary"
            dark
          >
            <v-btn icon :loading="item.isUpdating">
              <v-icon>mdi-alarm-check</v-icon>
            </v-btn>
            Activado
          </v-chip>
          <v-chip
            v-else-if="item.botStatus == 'DISABLED'"
            :disabled="item.isUpdating"
            @click="changeMonitoring(item)"
            color="default"
            dark
          >
            <v-btn icon :loading="item.isUpdating">
              <v-icon>mdi-alarm-check</v-icon>
            </v-btn>
            Desactivado
          </v-chip>
          <v-chip v-else color="error"> ERROR </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                @click="refresh(item)"
                v-bind="attrs"
                v-on="on"
                :loading="item.isRefreshing"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </template>
            <span v-if="!item.isRefreshing">Actualizar</span>
            <span v-else>Actualizando</span>
          </v-tooltip>

          <!-- <v-icon small class="mr-2" @click="edit(item)"> mdi-pencil </v-icon> -->
          <v-btn
            icon
            color="error"
            @click="openRemove(item)"
            :disabled="item.isRemoving"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>

          <v-dialog v-model="item.showRemove" width="550" persistent>
            <Remove
              :loading="item.isRemoving"
              :item="item"
              @close="closeRemove"
              @confirm="confirmRemove"
            />
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-if="dialog.create"
      v-model="dialog.create"
      :loading="isLoading.createRequest"
      width="500"
      persistent
    >
      <Create
        :loading="isLoading.createRequest"
        item.botStatusitem.botStatus
        :dni-loading="isLoading.existsRutRequest"
        :dni-rules="[
          (v) => !items.find((i) => i.dni === v) || 'El RUT ya existe',
        ]"
        @close="closeCreate"
        @confirm="confirmCreate"
      />
    </v-dialog>
    <!-- {{ items[0].dni.replaceAll(",", "").replaceAll("-", "") }} -->
  </div>
</template>

<script>
import currency from "@/filters/currency";
import { parse } from "@/filters/datetime";
import Create from "../components/Create";
import RemoveConfirm from "../components/RemoveConfirm";
import { ItemRutDto } from "../dto/item-rut.dto";
import CreateRutDto from "../dto/create-rut.dto";
import UpdateRutDto from "../dto/update-rut.dto";
import rutService from "../services/rut.service";
import scraperService from "../services/scraper.service";

export default {
  name: "MainList",
  components: {
    Create,
    Remove: RemoveConfirm,
  },
  data() {
    return {
      rutService: rutService,
      CreateRutDto: CreateRutDto,
      UpdateRutDto: UpdateRutDto,
      ItemRutDto: ItemRutDto,

      scraperService: scraperService,

      isLoading: {
        fetchAllRequest: false,
        createRequest: false,
        existsRutRequest: false,
      },
      dialog: {
        create: false,
      },
      search: "",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Rut",
          align: "start",
          sortable: true,
          value: "dni",
        },
        { text: "Código AECO", value: "aecoCode" },
        { text: "Wom Deuda", value: "womDebt" },
        { text: "Sinacofi Deuda", value: "sinacofiDebt" },
        { text: "Última actualización", value: "updatedAt" },
        { text: "Monitoreo", align: "start", value: "botStatus" },
        { text: "Aciones", align: "end", sortable: false, value: "actions" },
      ],
      items: [],
    };
  },
  filters: {
    currency,
    parse,
  },
  methods: {
    async fetchAll() {
      try {
        this.isLoading.fetchAllRequest = true;
        const items = await this.rutService.fetchAll();
        this.items.splice(0, this.items.length);
        items.forEach((item) => {
          let itemDto = ItemRutDto(item);
          this.items.push(itemDto);
        });
        this.isLoading.fetchAllRequest = false;
      } catch (error) {
        this.isLoading.fetchAllRequest = false;
        throw error;
      }
    },
    async refresh(item) {
      console.log("refresh");
      item.isRefreshing = true;
      try {
        const data = await this.scraperService.refreshOne({ id: item.id });
        Object.assign(item, data);
        item.isRefreshing = false;
      } catch (error) {
        item.isRefreshing = false;
        throw error;
      }
    },
    openCreate() {
      this.dialog.create = true;
      console.log("openCreate");
    },
    closeCreate() {
      this.dialog.create = false;
      console.log("closeCreate");
    },
    async confirmCreate(data) {
      const createDto = this.CreateRutDto({
        dni: data.dni,
        botStatus: data.botStatus,
      });

      try {
        this.isLoading.createRequest = true;
        const item = await this.rutService.create({
          data: createDto,
        });
        this.dialog.create = false;
        this.isLoading.createRequest = false;
        this.items.unshift(item);
      } catch (error) {
        this.dialog.create = false;
        this.isLoading.createRequest = false;
        throw error;
      }
    },
    openRemove(item) {
      item.showRemove = true;
      console.log("openRemove");
    },
    closeRemove(item) {
      item.showRemove = false;
      console.log("closeRemove");
    },
    async confirmRemove(item) {
      try {
        item.isRemoving = true;
        const remove = await this.rutService.remove({ id: item.id });
        item.showRemove = false;
        item.isRemoving = false;
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {
        item.showRemove = false;
        item.isRemoving = false;
        throw error;
      }
      console.log("confirmRemove", item);
    },
    async changeMonitoring(item) {
      let newStatus = "ENABLED";
      if (item.botStatus == "ENABLED") {
        newStatus = "DISABLED";
      }
      const updateDto = this.UpdateRutDto({
        botStatus: newStatus,
      });

      item.isUpdating = true;
      try {
        const data = await this.rutService.update({
          id: item.id,
          data: updateDto,
        });
        Object.assign(item, data);
        item.isUpdating = false;
      } catch (error) {
        item.isUpdating = false;
        throw error;
      }
    },
    edit(item) {
      console.log("edit");
    },
  },
  async created() {
    await this.fetchAll();

    const interval = setInterval(async () => {
      await this.fetchAll();
      console.log("actualizando");
    }, 15000);
  },
};
</script>