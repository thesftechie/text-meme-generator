<template>
  <template v-if="show">
    <div
      id="toastContainer"
      class="toast-container position-fixed p-3 top-0 start-50 translate-middle-x"
    >
      <div
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div>
          <div :class="statusClass">
            <strong>{{ title }}</strong>
            <button
              type="button"
              class="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              @click="expire()"
            ></button>
          </div>
          <div class="toast-body">
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["toastExpiry"],
  props: {
    options: Object,
  },
  data() {
    return {};
  },
  computed: {
    statusClass() {
      var toastColor = "toast-header ";
      switch (this.status) {
        case "success":
          toastColor += "bg-success text-white";
          break;
        case "error":
          toastColor += "bg-danger text-white";
          break;
        case "warning":
          toastColor += "bg-warning";
          break;
        case "info":
        default:
          toastColor += "bg-info text-white";
          break;
      }
      return toastColor;
    },
    show() {
      return this.options.show;
    },
    status() {
      return this.options.status;
    },
    title() {
      return this.options.title;
    },
    message() {
      return this.options.message;
    },
    duration() {
      return this.options.duration;
    },
  },
  watch: {
    show(n, o) {
      var self = this;
      if (n) {
        if (self.duration && self.duration > 0 && self.show) {
          window.setTimeout(function () {
            self.expire();
          }, self.duration);
        }
      }
    },
  },
  methods: {
    expire() {
      this.$emit("toastExpiry");
      this.options.show = false;
    },
  },
});
</script>
<style scoped>
.toast-container {
  z-index: 9999;
}
.toast {
  background-color: var(--white);
}
.toast-header {
  line-height: normal;
  font-family: var(--default-font);
}
</style>
