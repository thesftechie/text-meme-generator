<template>
  <div class="row gap-3 justify-content-center">
    <div v-for="thank in toThank" class="col col-sm-12 col-md-4 col-lg-3">
      <div class="card">
        <div class="card-header">
          <h2>{{ thank.title }}</h2>
        </div>
        <div class="card-body">
          <p>
            {{ thank.use }}
          </p>
          <ul class="list-group">
            <li v-for="link in thank.links" class="list-group-item">
              <a :href="link" rel="nofollow">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
        <div
          class="card-footer"
          v-if="thank.buymeacoffee && thank.buymeacoffee.name"
        >
          <h3>Donate Direct</h3>
          <div class="my-2">
            <a
              :href="`https://www.buymeacoffee.com/${thank.buymeacoffee.name}`"
              rel="nofollow"
              target="_blank"
              ><img
                src="https://camo.githubusercontent.com/c3f856bacd5b09669157ed4774f80fb9d8622dd45ce8fdf2990d3552db99bd27/68747470733a2f2f7777772e6275796d6561636f666665652e636f6d2f6173736574732f696d672f637573746f6d5f696d616765732f6f72616e67655f696d672e706e67"
                :alt="`Buy ${thank.buymeacoffee.name} A Coffee`"
                data-canonical-src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                style="max-width: 100%"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { entities } from "./thank";
export default {
  data() {
    return {
      toThank: [],
    };
  },
  beforeMount() {
    this.toThank = entities.get();
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
