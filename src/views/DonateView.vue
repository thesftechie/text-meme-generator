<template>
  <div class="donate pt-3">
    <Donate></Donate>
  </div>
</template>
<script>
import Donate from "../components/Donate.vue";
export default {
  components: { Donate },
};
</script>
<style>
@media (min-width: 1024px) {
  .donate {
    display: flex;
  }
}
</style>
