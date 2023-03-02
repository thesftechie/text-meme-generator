<template>
  <div class="shoutout pt-3">
    <Shoutouts></Shoutouts>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .shoutout {
    display: flex;
  }
}
</style>
<script>
import Shoutouts from "../components/Shoutouts.vue";

export default {
  components: { Shoutouts },
};
</script>
