<template>
  <div class="android">
    <div class="from-them-wrapper d-flex align-items-center">
      <div v-if="isShowingAvatar" class="me-2">
        <!--border border-3 border-info rounded-circle ^-->
        <img
          src="../../src/assets/example-avatar.png"
          :alt="`Example Avatar`"
          class="rounded-circle"
          style="height: auto; width: 2.5rem"
        />
      </div>
      <p class="from-them">
        It was loud. We just laid there and said &ldquo;is this an earthquake? I
        think this is an earthquake.&rdquo;
      </p>
    </div>
    <p class="from-me">Like is this an earthquake just go back to sleep</p>

    <div class="from-them-wrapper d-flex align-items-center">
      <div v-if="isShowingAvatar" class="me-2">
        <!--border border-3 border-info rounded-circle ^-->
        <img
          src="../../src/assets/example-avatar.png"
          :alt="`Example Avatar`"
          class="rounded-circle"
          style="height: auto; width: 2.5rem"
        />
      </div>
      <p class="from-them margin-b_one">
        It&rsquo;s more like &ldquo;this is an earthquake. Check the Internet.
        Yup. Earthquake. This is the size. This is the epicenter. Check social
        media. Make sure the East Coast knows I&rsquo;m alive. Okay, try and go
        back to sleep.&rdquo;
      </p>
    </div>
    <p class="from-me no-tail emoji">&#128077;</p>
    <p class="from-me">Glad you&rsquo;re safe</p>
  </div>
</template>
<script>
export default {
  props: {
    showAvator: Boolean,
  },
  computed: {
    isShowingAvatar() {
      return this.showAvator;
    },
  },
  beforeMount() {},
  data() {
    return { secureClass: this.secure ? "from-me secure" : "from-me" };
  },
  methods: {
    getImageUrl(name) {
      if (!name) return "";
      name = name.replace(/^\/|\/$/g, "");
      var i = import.meta;
      var j = import.meta.url;
      return new URL(`../../${name}`, j).href;
    },
  },
};
</script>
<style scoped></style>
