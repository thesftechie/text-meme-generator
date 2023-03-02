<template>
  <data-processor :options="processorOptions">
    <template #content>
      <div class="row g-2">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <h2 class="col">iPhone</h2>
                <div class="col d-flex">
                  <button
                    class="btn btn-secondary ms-auto"
                    @click="displayPreview('imessage-example')"
                  >
                    Get Image
                  </button>
                </div>
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="secureSwitch"
                  :value="isSecureIMessage"
                  @click="setSecureIMessage()"
                />
                <label class="form-check-label" for="secureSwitch"
                  >Insecure Messages</label
                >
              </div>
            </div>
            <div class="card-body">
              <iMessage
                :secure="isSecureIMessage"
                id="imessage-example"
              ></iMessage>
            </div>
            <!-- todo push when phone selector pushed -->
            <!-- <div class="card-footer">
              <p>
                Examples are responsive and not set to a device width. To set a
                width, try
                <RouterLink class="nav-link active" to="/">
                  creating your own
                </RouterLink>
                by selecting the phone you wish to create which will set a width
                for the image to download.
              </p>
            </div> -->
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <h2 class="col">Android</h2>
                <div class="col d-flex">
                  <button
                    class="btn btn-secondary ms-auto"
                    @click="displayPreview('android-example')"
                  >
                    Get Image
                  </button>
                </div>
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="avatarSwitch"
                  :value="showAvatar"
                  @click="setShowAvatar()"
                />
                <label class="form-check-label" for="avatarSwitch"
                  >Hide Contact Image</label
                >
              </div>
            </div>
            <div class="card-body">
              <android :show-avator="showAvatar" id="android-example"></android>
            </div>
            <!-- <div class="card-footer">
              <p>
                Examples are responsive and not set to a device width. To set a
                width, try
                <RouterLink class="nav-link" to="/"
                  >creating your own</RouterLink
                >
                by selecting the phone you wish to create which will set a width
                for the image to download.
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </template>
  </data-processor>
</template>
<script>
import iMessage from "./iMessageExample.vue";
import android from "./androidExample.vue";
import dataProcessor from "./DataProcessor.vue";
import * as htmlToImage from "html-to-image";
export default {
  components: { iMessage, android, dataProcessor },
  methods: {
    setSecureIMessage() {
      this.isSecureIMessage = !this.isSecureIMessage;
    },
    setShowAvatar() {
      this.showAvatar = !this.showAvatar;
    },
    displayPreview(id) {
      var self = this;
      self.processorOptions.processing = true;
      var el = document.getElementById(id);
      htmlToImage
        .toPng(el)
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${id}.png`;
          link.click();
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
  },
  data() {
    return {
      isSecureIMessage: true,
      showAvatar: true,
      processorOptions: { processing: false, toast: { show: false } },
    };
  },
};
</script>
<style scoped>
.card,
.list-group-item,
.list-group {
  background: var(--color-background);
}
.nav-link {
  display: inline;
  text-decoration: underline;
}
</style>
