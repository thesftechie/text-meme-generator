<template>
  <!-- todo add when phone selector is complete -->
  <!-- <PhoneSelector
    v-if="!showBuilder"
    @phone-selected="onPhoneSelected"
  ></PhoneSelector> -->
  <MessageBuilder v-if="showBuilder" :phone="phone"></MessageBuilder>
</template>
<script>
// import PhoneSelector from "./PhoneSelector.vue";
import MessageBuilder from "./MessageBuilder.vue";
export default {
  data() {
    return {
      showBuilder: true,
      phone: {},
    };
  },
  // components: { PhoneSelector, MessageBuilder },
  components: { MessageBuilder },
  methods: {
    onPhoneSelected(data) {
      var self = this;
      if (data.brand) self.showBuilder = true;
      else self.showBuilder = false;
      self.phone = data;
    },
  },
};
</script>
