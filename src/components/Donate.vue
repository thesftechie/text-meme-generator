<template>
  <div style="max-width: 1068px" class="mx-auto">
    <h1>Donate to Help Support Overhead</h1>
    <p>
      If you likey, help keep the lights on if you can. If you can't, enjoy
      anyways.
    </p>
    <div class="row gap-2 justify-content-center">
      <div class="col col-md-4" v-for="paymentAccepted in paymentsAccepted">
        <div class="card">
          <div class="card-header d-flex align-items-center">
            <img
              src="/src/assets/bitcoin.svg"
              :alt="`${paymentAccepted.title} logo`"
              style="max-height: 2rem"
            />
            <h3 class="ps-3">{{ paymentAccepted.title }}</h3>
          </div>
          <div class="card-body d-flex justify-content-center">
            <p>{{ paymentAccepted.description }}</p>
            <img
              v-if="paymentAccepted.qrCode"
              :src="paymentAccepted.qrCode"
              alt="Bitcoin Qr Code Link to Wallet for Donation"
            />
          </div>
          <div class="card-footer text-center">
            <div v-if="paymentAccepted.type === 'crypto'">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  :value="walletAddress"
                  disabled="disabled"
                />
                <span
                  class="input-group-text"
                  @click="copyWalletAddress()"
                  style="background-color: #222"
                >
                  <span class="tooltiptext" v-if="showTip">{{
                    tooltipMessage
                  }}</span>
                  <img
                    :src="'/src/assets/clipboard.svg'"
                    style="width: 1.5rem"
                    alt="Copy to clipboard"
                    @mouseenter="showTooltip()"
                    @mouseleave="hideTooltip()"
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { payments } from "./payments";
export default {
  data() {
    return {
      paymentsAccepted: [],
      walletAddress: import.meta.env.VITE_MY_WALLET,
      metaUrl: import.meta.url,
      showTip: false,
      tooltipMessage: "Copy to clipboard",
    };
  },
  methods: {
    copyWalletAddress() {
      var self = this;
      this.tooltipMessage = "Copied!";
      setTimeout(function () {
        self.tooltipMessage = "Copy to clipboard";
      }, 3000);
      navigator.clipboard.writeText(this.walletAddress);
    },
    getImageUrl(name) {
      if (!name) return "";
      name = name.replace(/^\/|\/$/g, "");
      var i = import.meta;
      var j = import.meta.url;
      return new URL(`../../${name}`, j).href;
    },
    showTooltip() {
      this.showTip = true;
    },
    hideTooltip() {
      this.showTip = false;
    },
  },
  mounted() {
    var self = this;
    self.paymentsAccepted = payments.get();
    var crypto = self.paymentsAccepted.filter((e) => {
      return e.type === "crypto";
    });
    self.paymentsAccepted = self.paymentsAccepted.filter((e) => {
      return e.type !== "crypto";
    });

    if (crypto && crypto.length > 0) {
      crypto.forEach((el) => {
        var opts = {
          errorCorrectionLevel: "H",
          type: "image/jpeg",
          quality: 0.3,
          margin: 1,
          color: {
            dark: "#000",
            light: "#fff",
          },
        };

        QRCode.toDataURL(self.walletAddress, opts, function (err, url) {
          if (err) throw err;

          el.qrCode = url;

          self.paymentsAccepted.push(el);
        });
      });
    }
  },
};
</script>
<style>
.card,
.list-group-item,
.list-group {
  background: var(--color-background);
}
h3 {
  margin: 0;
}
.tooltiptext {
  width: 170px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 6px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -86px;
  white-space: nowrap;
}
.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>
