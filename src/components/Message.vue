<template>
  <div
    v-if="messageSet && addedImage"
    :class="`d-flex align-items-center ${display ? '' : 'd-none'}`"
  >
    <div :class="`contact-img me-2 ${from === 'me' ? 'd-none' : ''}`">
      <div class="rounded-circle" style="height: 2.5rem; width: 2.5rem"></div>
    </div>
    <p
      :class="`${
        from === 'me' ? 'from-me ms-auto pe-0' : 'from-them ps-0'
      } no-tail no-bubble`"
    >
      <img :src="imgAdded" alt="uploaded img" class="w-100" />
    </p>
  </div>
  <div
    v-if="messageSet && messageText && messageText.length > 0"
    :class="`d-flex align-items-center ${display ? '' : 'd-none'}`"
  >
    <div :class="`contact-img me-2 ${from === 'me' ? 'd-none' : ''}`">
      <div class="rounded-circle" style="height: 2.5rem; width: 2.5rem"></div>
    </div>
    <p
      :class="`${from === 'me' ? 'from-me ms-auto' : 'from-them'} ${
        onlyEmoji ? 'no-tail emoji' : ''
      }`"
    >
      {{ messageText }}
    </p>
  </div>
  <div
    v-if="!messageSet"
    :class="`d-flex ${display ? '' : 'd-none'} align-items-center`"
  >
    <div class="text-dark w-100 p-2">
      <div v-if="!showInput" class="d-flex">
        <div class="me-auto d-none d-md-block">
          <button
            class="btn btn-success rounded-circle shadow"
            @click="addMessage('them')"
          >
            <img
              src="../../src/assets/plus.svg"
              alt="Add Message"
              style="width: 1rem"
            />
          </button>
          <span class="ms-2 fs-sm-6">From Them</span>
        </div>
        <div class="me-auto d-xs-block d-md-none">
          <button class="btn btn-success shadow" @click="addMessage('them')">
            &lt; From Them
          </button>
        </div>
        <div class="ms-auto d-none d-md-block">
          <span class="me-2 fs-sm-6">From Me</span>
          <button
            class="btn btn-success rounded-circle shadow"
            @click="addMessage('me')"
          >
            <img
              src="../../src/assets/plus.svg"
              alt="Add Message"
              style="width: 1rem"
            />
          </button>
        </div>
        <div class="ms-auto d-xs-block d-md-none">
          <button class="btn btn-success shadow" @click="addMessage('me')">
            From Me &gt;
          </button>
        </div>
      </div>
      <div class="input-group message-input" v-if="showInput && !messageSet">
        <input
          class="form-control"
          type="image"
          src=""
          @error="changeInputToText($event)"
          v-model="messageText"
          :placeholder="`from ${from}`"
          id="message-text"
        />
        <div>
          <button
            class="btn btn-outline-secondary d-none d-md-inline border-0 border-top border-bottom rounded-0"
            @click="showEmojiPicker()"
          >
            <img
              src="../../src/assets/smile.svg"
              alt="Add Emoji"
              style="width: 1rem"
            />
          </button>
          <button
            class="btn btn-outline-secondary border-0 border-top border-bottom rounded-0"
            @click="uploadFile()"
          >
            <img
              src="../../src/assets/image.svg"
              alt="Add Image"
              style="width: 1rem"
            />
          </button>

          <button
            class="btn btn-success rounded-0 rounded-right"
            @click="setMessage()"
          >
            <img
              src="../../src/assets/plus.svg"
              alt="Add Message"
              style="width: 1rem"
            />
          </button>
        </div>
      </div>
      <EmojiPicker
        v-if="showEmojiSelector"
        @emoji-selected="emojiSelected"
      ></EmojiPicker>
    </div>
    <div v-if="!messageSet">
      <button class="btn btn-danger rounded-circle" @click="removeMessage()">
        <img
          src="../../src/assets/trash.svg"
          alt="Delete Message"
          style="width: 1rem"
        />
      </button>
    </div>
  </div>
</template>
<script>
import EmojiPicker from "./EmojiPicker.vue";
export default {
  components: { EmojiPicker },
  props: {
    onSet: Function,
    onAdd: Function,
    onRemove: Function,
    showAvatar: Boolean,
  },
  data() {
    return {
      showInput: false,
      from: "",
      display: true,
      messageText: "",
      messageSet: false,
      showEmojiSelector: false,
      onlyEmoji: false,
    };
  },
  computed: {
    isShowingAvatar() {
      return this.showAvatar;
    },
  },
  beforeMount() {
    this.onAdd();
  },
  methods: {
    showEmojiPicker() {
      var self = this;
      self.showEmojiSelector = !self.showEmojiSelector;
    },
    emojiSelected(data) {
      this.messageText += data;
    },
    changeInputToText(ev) {
      ev.target.type = "text";
      ev.target.removeAttribute("src");
      ev.target.focus();
    },
    addMessage(from) {
      var self = this;
      self.from = from;
      self.showInput = true;
      document.getElementById("message-text").focus();
    },
    setMessage() {
      var self = this;
      self.messageSet = true;

      var regexpEmojiPresentation = /^\p{Emoji_Presentation}$/gu;
      self.onlyEmoji = self.messageText.match(regexpEmojiPresentation);
      setTimeout(function () {
        self.onSet();
      }, 300);
    },
    removeMessage() {
      var self = this;
      self.display = false;
      self.onRemove();
    },
    uploadFile() {
      var self = this;

      var el = document.createElement("input");
      el.type = "file";
      el.accept = "image/*";

      el.addEventListener("change", function (ev2) {
        if (el.files.length) {
          self.imgAdded = URL.createObjectURL(el.files[0]);
          self.addedImage = true;
          self.setMessage();
        }
      });

      el.click();
    },
  },
};
</script>
<style>
@media (max-width: 850px) {
  .fs-sm-6 {
    font-size: 1rem;
  }
}
@media (max-width: 576px) {
  .message-input {
    display: block;
  }
  .message-input > input {
    width: 100% !important;
    border-radius: 0.5rem !important;
  }
  .message-input div {
    width: 100% !important;
    margin: 0 !important;
    display: flex;
    justify-content: center;
  }
  .message-input div button:nth-of-type(2),
  .message-input div button:nth-of-type(1) {
    border-left-style: solid !important;
    border-left-width: 1px !important;
    border-left-color: var(--bs-border-color) !important;
  }
}
</style>
