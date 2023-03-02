<template>
  <div :class="isSecure ? 'imessage secure' : 'imessage'">
    <p class="from-them">
      It was loud. We just laid there and said &ldquo;is this an earthquake? I
      think this is an earthquake.&rdquo;
    </p>
    <p :class="isSecure ? 'from-me secure' : 'from-me'">
      Like is this an earthquake just go back to sleep
    </p>
    <p class="from-them margin-b_one">
      It&rsquo;s more like &ldquo;this is an earthquake. Check the Internet.
      Yup. Earthquake. This is the size. This is the epicenter. Check social
      media. Make sure the East Coast knows I&rsquo;m alive. Okay, try and go
      back to sleep.&rdquo;
    </p>
    <p class="from-me no-tail emoji">&#128077;</p>

    <p class="from-me">Glad you&rsquo;re safe</p>
  </div>
</template>
<script>
export default {
  props: {
    secure: Boolean,
  },
  computed: {
    isSecure() {
      return this.secure;
    },
  },
  beforeMount() {},
  data() {
    return {};
  },
};
</script>
<style scoped></style>
