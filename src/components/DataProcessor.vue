<template>
  <toast @toast-expiry="removeToast()" :options="toast" />
  <spinner :spin="processing">
    <template #content>
      <slot name="content"></slot>
    </template>
  </spinner>
</template>
<script>
import Spinner from "./Spinner.vue";
import Toast from "./Toast.vue";
export default {
  props: {
    options: Object,
  },
  data() {
    return {};
  },
  components: { Spinner, Toast },
  computed: {
    removeToast() {
      this.options.toast.show = false;
    },
    processing() {
      return this.options.processing;
    },
    toast() {
      return this.options.toast;
    },
  },
  methods: {},
};
</script>
