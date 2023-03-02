<template>
  <div id="emoji-picker"></div>
</template>
<script>
import * as emoji from "emoji-mart";
export default {
  emits: ["emojiSelected"],
  data() {
    return {
      picker: null,
      data: null,
    };
  },
  mounted() {
    var self = this;

    var mountEl = document.getElementById("emoji-picker");
    mountEl.innerHTML = "";

    this.picker = new emoji.Picker({
      data: async () => {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
        );

        return response.json();
      },
      onEmojiSelect: function (ev) {
        self.$emit("emojiSelected", ev.native);
      },
    });

    mountEl.appendChild(this.picker);
  },
};
</script>
