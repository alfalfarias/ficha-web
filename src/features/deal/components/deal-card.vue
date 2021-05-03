<template>
  <v-card class="mx-auto">
    <v-card-title>
      <v-icon class="ma-1" aria-hidden="false">
        mdi-label
      </v-icon>
      Nº-{{id}}
      <v-row justify="end">
        <span class="subtitle-1 grey--text ma-4">{{ createdAt | humantime }}</span>
      </v-row>
    </v-card-title>

    <v-card-text class="ma-1">
      <v-row align="center" class="mx-0">
        <div class="overline black--text">
          {{fullname}}
        </div>
      </v-row>

      <div class="my-4">
        <div>
          RUT • {{dni}}
        </div>
        <div>
          <template v-if="amount">
            Monto • ${{amount}}
          </template>
          <template v-else>
            Monto • <strong>SIN MONTO</strong>
          </template>
        </div>
        <div>
          Estado • {{status}}
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-title>
      <v-icon class="ma-1" aria-hidden="false">
        mdi-email
      </v-icon>
      Correos • {{emails.length}}
      <v-row justify="end">
        <v-btn class=" ma-4" icon color="primary" :disabled="!(emailShow < emails.length)" @click="showMoreEmails(emails.length)">
          <v-icon>mdi-table-eye</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>

    <v-card-text>
      <template v-for="(item, index) in emails">
        <v-chip v-if="index < emailShow" class="ma-1" color="primary" :key="item.email">
          {{item.email}}
        </v-chip>
      </template>

      <v-badge v-if="emailShow < emails.length" overlap color="red" :content="emails.length - emailShow">
        <v-btn rounded color="grey" @click="showMoreEmails(3)">
        <v-icon>
              mdi-plus
          </v-icon>
        </v-btn>
      </v-badge>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-title>
      <v-icon class="ma-1" aria-hidden="false">
        mdi-phone
      </v-icon>
      Teléfonos • {{phones.length}}
      <v-row justify="end">
        <v-btn class=" ma-4" icon color="primary" :disabled="!(phoneShow < phones.length)" @click="showMorePhones(phones.length)">
          <v-icon>mdi-table-eye</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <template v-for="(item, index) in phones">
        <v-chip v-if="index < phoneShow" class="ma-1" color="green" dark :key="item.phone">
          {{item.area}}-{{item.phone}}
        </v-chip>
      </template>

      <v-badge v-if="phoneShow < phones.length" overlap color="red" :content="phones.length - phoneShow">
        <v-btn rounded color="grey" @click="showMorePhones(3)">
        <v-icon>
              mdi-plus
          </v-icon>
        </v-btn>
      </v-badge>
    </v-card-text>
  </v-card>
</template>

<script>

  import currency from '@/filters/currency';
  import { humantime } from '@/filters/datetime';
  import { DealCardDto } from '../dto/deal-card.dto';

  export default {
    name: 'DealCard',
    props: {
      id: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: false,
      },
      createdAt: {
        type: [String, Date],
        required: false,
        default: 'jeje',
      },
      fullname: {
        type: String,
        required: true,
      },
      dni: {
        type: String,
        required: true,
      },
      emails: {
        type: Array,
        required: true,
      },
      phones: {
        type: Array,
        required: true,
      },
      isLoading: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        emailShow: 3,
        phoneShow: 3,
      };
    },
    filters: {
      currency,
      humantime,
    },
    methods: {
      showMoreEmails(quantity) {
        const totalShow = this.emailShow + quantity;
        const length = this.emails.length;

        this.emailShow = totalShow <= length ? totalShow : length;
      },
      showMorePhones(quantity) {
        const totalShow = this.phoneShow + quantity;
        const length = this.phones.length;

        this.phoneShow = totalShow <= length ? totalShow : length;
      },
    },
  };
</script>

<style scoped>
</style>