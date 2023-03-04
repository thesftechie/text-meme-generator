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
          class="navbar-light navbar-toggler wtf-toggler-light"
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
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">About</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="pt-5" style="height: 90vh">
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
.wtf-toggler-light {
  border-color:rgba(255, 255, 255, 0.55)
}
.wtf-toggler-light > span {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
@media (min-width: 1024px) {
}
</style>
