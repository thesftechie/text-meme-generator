<template>
  <data-processor :options="processorOptions">
    <template #content>
      <div class="row g-2">
        <div id="builder" :class="`col-md-6`">
          <div class="card">
            <div class="card-header">
              <h2>Builder</h2>
              <div class="align-items-center">
                <div class="d-flex mb-1">
                  <div class="btn-group w-100" role="group">
                    <button
                      type="button"
                      @click="setDefaultBrand('apple')"
                      :class="`btn btn${
                        isApple ? '' : '-outline'
                      }-secondary w-50`"
                    >
                      iPhone
                    </button>
                    <button
                      type="button"
                      @click="setDefaultBrand('android')"
                      :class="`btn btn${
                        isApple ? '-outline' : ''
                      }-secondary w-50`"
                    >
                      Android
                    </button>
                  </div>
                </div>
                <div v-if="!isApple" class="d-flex mb-1">
                  <div class="btn-group w-100" role="group">
                    <button
                      type="button"
                      @click="setShowContact(true)"
                      :class="`btn btn${
                        showContact ? '' : '-outline'
                      }-secondary w-50`"
                    >
                      Show Contact Image
                    </button>
                    <button
                      type="button"
                      @click="setShowContact(false)"
                      :class="`btn btn${
                        showContact ? '-outline' : ''
                      }-secondary w-50`"
                    >
                      Hide Contact Image
                    </button>
                  </div>
                  <button class="btn btn-outline-info" @click="setContactImg()">
                    <img
                      src="../../src/assets/person.svg"
                      alt="Add Message"
                      style="width: 2rem"
                    />
                  </button>
                </div>
                <div v-if="isApple" class="d-flex mb-1">
                  <div class="btn-group w-100" role="group">
                    <button
                      type="button"
                      @click="setIMessage(true)"
                      :class="`btn btn${
                        isIMessage ? '' : '-outline'
                      }-secondary w-50`"
                      :style="`${
                        isIMessage
                          ? 'background-color: #00d348; border-color: #00d348; color:white'
                          : 'border-color: #00d348; color:#00d348'
                      }`"
                    >
                      Green Bubble (secure)
                    </button>
                    <button
                      type="button"
                      @click="setIMessage(false)"
                      :class="`btn btn${
                        isIMessage ? '-outline' : ''
                      }-secondary w-50`"
                      :style="`${
                        !isIMessage
                          ? 'background-color: #248bf5; border-color: #248bf5; color:white'
                          : 'border-color: #248bf5; color:#248bf5'
                      }`"
                    >
                      Blue Bubble (insecure)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div :class="`${builderClass}`">
                <div id="messages" class="row">
                  <p>Click the green + button to add messages</p>
                  <div
                    id="message-box"
                    :class="`${
                      brand === 'apple'
                        ? `imessage ${isIMessage ? 'secure' : ''}`
                        : 'android'
                    } ${messageCount === 0 ? 'd-none' : ''}`"
                  ></div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row justify-content-center">
                <div class="col d-flex justify-content-center">
                  <button
                    class="btn btn-success rounded-circle shadow m-1"
                    @click="addMessage()"
                  >
                    <img
                      src="../../src/assets/plus.svg"
                      alt="Add Message"
                      style="width: 1rem"
                    />
                  </button>
                  <button
                    class="btn btn-danger rounded-circle shadow m-1"
                    @click="removeAll()"
                  >
                    <img
                      src="../../src/assets/trash.svg"
                      alt="Remove All Messages"
                      style="width: 1rem"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="preview" class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h2>Preview</h2>
              <aside class="ms-auto">Auto generates as you build</aside>
            </div>
            <div class="card-body">
              <div id="preview-img" class="p-1"></div>
            </div>
            <div class="card-footer d-flex">
              <button
                :disabled="messageCount === 0"
                class="btn btn-secondary ms-auto"
                @click="downloadImg()"
              >
                Get Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </data-processor>
</template>
<script>
import { createApp } from "vue";
import message from "./Message.vue";
import dataProcessor from "./DataProcessor.vue";
import * as htmlToImage from "html-to-image";

export default {
  props: { isSelected: Boolean, phone: Object },
  components: { dataProcessor },
  data() {
    return {
      // resolution: { width: 0, height: 0 },
      builderClass: "builder",
      hasImage: false,
      useDefaults: false,
      isApple: true,
      isIMessage: true,
      showContact: true,
      processorOptions: { processing: false, toast: { show: false } },
      contactImg: null,
      messageCount: 0,
    };
  },

  computed: {
    selected() {
      return this.isSelected;
    },

    brand() {
      return this.phone?.brand ?? this.isApple ? "apple" : "android";
    },
  },
  mounted() {
    if (!this.phone) this.useDefaults = true;
    this.hideContactCss();
  },
  methods: {
    setContactImg() {
      var self = this;

      var el = document.createElement("input");
      el.type = "file";
      el.accept = "image/*";

      el.addEventListener("change", function (ev2) {
        if (el.files.length) {
          self.processorOptions.processing = true;
          self.contactImg = URL.createObjectURL(el.files[0]);
          self.showContactCss();
          self.generatePreview("message-box", "preview-img");
          self.processorOptions.processing = false;
          self.showContact = true;
        }
      });

      el.click();
    },
    setShowContact(val) {
      var self = this;
      self.showContact = val;
      if (!self.showContact) {
        self.hideContactCss();
      } else {
        self.showContactCss();
      }

      if (self.hasImage && self.messageCount > 0) {
        self.processorOptions.processing = true;
        self.generatePreview("message-box", "preview-img");
        self.processorOptions.processing = false;
      }
    },
    setIMessage(val) {
      var self = this;
      self.isIMessage = val;
      if (self.hasImage && self.messageCount > 0) {
        self.processorOptions.processing = true;
        self.generatePreview("message-box", "preview-img");
        self.processorOptions.processing = false;
      }
    },
    setDefaultBrand(brand) {
      var self = this;
      self.isApple = brand === "apple";
      self.showContact = self.isApple ? true : self.showContact;

      if (self.showContact && !self.isApple && self.contactImg) {
        self.showContactCss();
      } else {
        self.hideContactCss();
      }

      self.isIMessage = self.isApple ? self.isIMessage : true;
      if (self.hasImage && self.messageCount > 0) {
        self.processorOptions.processing = true;
        self.generatePreview("message-box", "preview-img");
        self.processorOptions.processing = false;
      }
    },
    downloadImg() {
      var self = this;
      self.processorOptions.processing = true;
      var link = document.createElement("a");
      link.href = document.getElementById("generated-img").src;
      link.download = "text-memer.png";
      self.processorOptions.processing = false;
      link.click();
    },
    generatePreview(idToGenerate, idToDisplay) {
      var self = this;
      self.processorOptions.processing = true;
      var el = document.getElementById(idToGenerate);
      htmlToImage
        .toPng(el)
        .then(function (dataUrl) {
          //// toCanvas
          // var displayEl = document.getElementById(idToDisplay);
          // displayEl.innerHTML = "";
          // displayEl.appendChild(canvas);
          // self.hasImage = true;

          //// toPng
          var img = document.createElement("img");
          img.src = dataUrl;
          img.id = "generated-img";
          img.alt = "text-memer generated image";
          img.className = "w-100";
          var displayEl = document.getElementById(idToDisplay);
          displayEl.innerHTML = "";
          displayEl.appendChild(img);
          self.hasImage = true;
        })
        .catch((err) => {
          htmlToImage
            .toSvg(el)
            .then(function (dataUrl) {
              alert(
                "Image is too large or some other issue is occurring with the data url."
              );
            })
            .catch((err) => {
              alert("Unknown error generating image from html.");
            });
        })
        .finally(() => {
          self.processorOptions.processing = false;
        });
    },
    addMessage() {
      var self = this;
      let parent = document.getElementById("message-box");
      let mountEl = document.createElement("div");
      parent.appendChild(mountEl);
      createApp(
        { extends: message },
        {
          showAvatar: self.contactImg && self.showContact && !self.isApple,
          onSet() {
            self.generatePreview("message-box", "preview-img");
          },
          onAdd() {
            self.messageCount++;
          },
          onRemove() {
            self.messageCount--;
          },
        }
      ).mount(mountEl);
    },
    removeAll() {
      let parent = document.getElementById("message-box");
      parent.innerHTML = "";
      let preview = document.getElementById("preview-img");
      preview.innerHTML = "";
      this.hasImage = false;
      this.messageCount = 0;
    },
    hideContactCss() {
      var exists = document.querySelector("#messages > style");
      var styleEl = exists;
      if (!exists) {
        styleEl = document.createElement("style");
      }
      styleEl.innerHTML = `.contact-img { display:none; }`;
      if (!exists) document.getElementById("messages").appendChild(styleEl);
    },
    showContactCss() {
      var self = this;
      var exists = document.querySelector("#messages > style");
      var styleEl = exists;
      if (!exists) {
        styleEl = document.createElement("style");
      }
      styleEl.innerHTML = `.contact-img > div { background-image:url('${self.contactImg}'); background-size:contain; }`;
      if (!exists) document.getElementById("messages").appendChild(styleEl);
    },
  },
};
/*
DPR: 3
Width: 1170/3 = 390, Height: 2532/3 = 844
Therefore, resolution in CSS pixels: 390 x 844
 */
</script>
<style scoped>
.card,
.list-group-item,
.list-group {
  background: var(--color-background);
}

#preview .card .card-body {
  padding: 0;
  margin: auto;
}
</style>
