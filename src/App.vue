<script setup>
import favicon from "./assets/favicon.svg";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="../">
          <img
            :src="favicon"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          Text Memer
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/examples">Examples</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/donate">Donate</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/shoutout">Shoutout</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>

<style scoped>
nav,
.navbar-brand,
.nav-link {
  color: var(--color-text) !important;
}

.navbar-brand:hover {
  background-color: inherit;
}
@media (min-width: 1024px) {
}
</style>
