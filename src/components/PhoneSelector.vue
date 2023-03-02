<template>
  <h2>Select your phone manufacturer/brand</h2>
  <data-processor :options="processorOptions">
    <template #content>
      <div class="input-group">
        <span class="input-group-text"
          ><img
            :src="getImageUrl('/src/assets/search.svg')"
            :alt="`Search Magnifying Glass`"
            style="width: 1.5rem"
            @click="brandSearch()"
        /></span>
        <input
          class="form-control"
          type="text"
          v-model="brandInput"
          :placeholder="`Brand of Phone${
            topBrands.length > 0 ? `: i.e. ${topBrands[cycledBrand]}` : ''
          }`"
          id="brand-search-input"
          @keyup="brandSearch()"
          @click="select('brand-search-input')"
        />
        <span class="input-group-text" @click="clearSearch()">X</span>
      </div>

      <div class="alert alert-info" role="alert" v-if="noBrands && !showMenu">
        No phone brands found matching that pattern
      </div>

      <ul
        class="dropdown-menu show w-100"
        style="max-height: 15rem; overflow: scroll"
        v-if="showMenu"
      >
        <li v-for="brand in brands" @click="brandSelected(brand)">
          <span
            class="dropdown-item"
            :data-tmg-phone-brand-slug="brand.brand_slug"
            >{{ brand.brand_name }}</span
          >
        </li>
      </ul>

      <ul
        class="list-group"
        style="max-height: 15rem; overflow: scroll"
        v-if="showPhones"
      >
        <li
          v-for="phone in phones"
          :class="
            selectedPhone?.phone_name == phone.phone_name
              ? 'list-group-item active'
              : 'list-group-item'
          "
          :aria-current="selectedPhone?.phone_name == phone.phone_name"
          @click="
            selectedPhone = phone;
            getPhoneDetails(selectedPhone);
          "
        >
          {{ phone.phone_name }}
        </li>
      </ul>

      <div
        class="alert alert-info d-flex"
        role="alert"
        v-if="selectedPhone && !showPhones"
      >
        <div>
          <div>
            Selected: {{ selectedPhone.brand }} {{ selectedPhone.phone_name }}
          </div>
          <div>
            Resolution:
            {{ selectedPhone.resolution }}
          </div>
        </div>
        <button class="btn btn-primary ms-auto" @click="useSelected()">
          Use this device
        </button>
      </div>
    </template>
  </data-processor>
</template>
<script>
import { phoneSpecApi } from "./phoneSpecsApi";
import dataProcessor from "./DataProcessor.vue";
export default {
  components: { dataProcessor },
  emits: ["phoneSelected"],
  inject: { axios: { from: "axios" } },
  data() {
    return {
      phoneSpecApi,
      brands: [],
      brandInput: "",
      timeout: 0,
      showMenu: false,
      showPhones: false,
      noBrands: false,
      selectedBrand: {},
      phoneSelectClass: "list-group-item",
      phones: [],
      selectedPhone: null,
      topBrands: [],
      gotTop: false,
      cycledBrand: 0,
      processorOptions: { processing: false, toast: { show: false } },
    };
  },
  beforeMount() {
    this.getTopByFans();
    this.cycleTopBrands();
  },
  methods: {
    select(id) {
      document.getElementById(id).select();
    },
    useSelected() {
      var self = this;
      var ppi = /[(~](\d+)\s[p][p][i]/.exec(self.selectedPhone.resolution)[1];
      self.$emit("phoneSelected", {
        ppi,
        brand: self.selectedPhone.brand.toLowerCase(),
      });
    },
    cycleTopBrands() {
      var self = this;
      setTimeout(function () {
        if (self.topBrands.length > 0) {
          self.cycledBrand++;
          if (self.cycledBrand >= self.topBrands.length) self.cycledBrand = 0;
          self.cycleTopBrands();
        }
      }, 3000);
    },
    getImageUrl(name) {
      if (!name) return "";
      name = name.replace(/^\/|\/$/g, "");
      var i = import.meta;
      var j = import.meta.url;
      return new URL(`../../${name}`, j).href;
    },
    brandSelected(e) {
      var self = this;
      self.showMenu = false;
      self.noBrands = false;

      self.selectedBrand = e;
      self.brandInput = e.brand_name;
      self.processorOptions.processing = true;
      phoneSpecApi
        .getBrandPhones(self.axios, self.selectedBrand.brand_slug)
        .then((response) => {
          self.phones = response.data.data.phones;
          self.showPhones = true;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          self.processorOptions.processing = false;
        });
    },
    clearSearch(e) {
      var self = this;
      self.brandInput = "";
      self.showMenu = false;
      self.noBrands = false;
      self.showPhones = false;
      self.selectedPhone = null;
      self.$emit("phoneSelected", {
        ppi: 0,
        brand: null,
      });
    },
    brandSearch() {
      var self = this;
      self.showMenu = false;
      self.noBrands = false;
      self.showPhones = false;
      self.selectedPhone = null;
      self.$emit("phoneSelected", {
        ppi: 0,
        brand: null,
      });

      if (self.brandInput && self.brandInput.length >= 2) {
        clearTimeout(self.timeout);
        self.timeout = setTimeout(function () {
          self.processorOptions.processing = true;
          phoneSpecApi
            .getBrands(self.axios)
            .then((response) => {
              self.brands = response.data.data.filter((brand) => {
                return brand.brand_name
                  .toLowerCase()
                  .includes(self.brandInput.toLowerCase());
              });
              var hasBrands = self.brands.length > 0;
              self.showMenu = hasBrands;
              self.noBrands = !hasBrands;
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              self.processorOptions.processing = false;
            });
        }, 300);
      }
    },
    getTopByFans() {
      var self = this;
      if (!self.gotTop) {
        self.gotTop = true;
        phoneSpecApi
          .getTopByFans(self.axios)
          .then((response) => {
            var top = response.data.data.phones;
            top.forEach((el) => {
              self.getTopPhoneDetails(el.slug);
            });
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            self.processorOptions.processing = false;
          });
      }
    },
    getTopPhoneDetails(phoneSlug) {
      var self = this;
      phoneSpecApi
        .getPhoneDetails(self.axios, phoneSlug)
        .then((response) => {
          self.topBrands.push(response.data.data.brand);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          self.processorOptions.processing = false;
        });
    },
    getPhoneDetails(phone) {
      var self = this;
      self.processorOptions.processing = true;
      phoneSpecApi
        .getPhoneDetails(self.axios, phone.slug)
        .then((response) => {
          self.showPhones = false;
          self.selectedPhone = response.data.data;
          self.selectedPhone.resolution = self.selectedPhone.specifications
            .filter((el) => el.title === "Display")[0]
            .specs.filter((el) => el.key === "Resolution")[0].val[0];
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          self.processorOptions.processing = false;
        });
    },
  },
};
</script>
<style>
.card,
.list-group-item,
.list-group {
  background: var(--color-background);
}
</style>
