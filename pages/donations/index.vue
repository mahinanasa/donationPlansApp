<template>
  <div class="main-wrapper">
    <div id="vue">
      <div class="products mb-4">
        <div v-for="(k) in getProducts" :key="k.id" class="product apple">
          <div
            class="image"
            style="background-size: cover; background-position: center center; background-image: url(&quot;https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/apple.jpg&quot;);"
          ></div>
          <h5 class="name">{{k.name}}</h5>
          <!-- <div class="description">This is an apple</div> -->
          <p class="price">{{k.cur}} {{k.raisedFund}} raised of {{k.cur}} {{k.totalFund}}</p>
          <button @click="addToCart(k)" class="btn btn-primary">Add to Cart</button>
          <br />
          <br />
        </div>
      </div>
      <amount-breakup />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import AmountBreakup from "~/components/donation/amountBreakup.vue";
export default {
  data: function() {
    return {
      products: [],
    };
  },
  components: {
    AmountBreakup
  },
  computed: {
    ...mapGetters("donationStore", ["getProducts"]),
    
   
  },
    watch: {
  getUserDetails(){
    
    this.getUserDetailsObj = _.cloneDeep(this.getUserDetails)
  }
 },
  methods: {
    async addToCart(obj){ 
      let res = await this.$store.dispatch("donationStore/addToDonationList", obj);
      
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("donationStore/getAllProducts");
    await store.dispatch("userStore/getUserDetails");
  }
};
</script>

<style>
.main-wrapper #vue {
  margin: 0 auto;
  padding: 0.5em;
  text-align: center;
}
.main-wrapper #vue .products {
  margin: 0 auto;
  width: 100%;
  max-width: 80em;
}

.main-wrapper #vue .products .product {
  display: inline-block;
  margin: 0.75em;
  width: 100%;
  max-width: 18em;
}

.products .product .name {
  font-weight: bold;
  font-size: 1.25em;
}

.products .product .description {
  font-style: italic;
}

.products .product .price {
  font-weight: bold;
}

.checkout-area table th,
.checkout-area table td {
  padding: 0 0.25em;
}

.align-center {
  text-align: center;
}

.align-right {
  text-align: right;
}

.align-left {
  text-align: left;
}
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}
</style>