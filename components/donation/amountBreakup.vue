<template>
  <div>
    
 <!-- {{getUserDetails != null ? getUserDetails : 'no name'}} -- 
    {{getDonationListArr}} -->
    <div class="row">
      <div class="col-md-8">
      <h4 class="text-left">Donation List</h4>
  <div v-if="getDonationListArr.length > 0">
    <table class="table table-bordared">
      <thead>
        <tr class="bg-light">
          <th class="align-left">Product Id</th>
          <th class="align-left">Name</th>
          <th class="align-center">One-Time</th>
          <th class="align-center">Monthly</th>
          <th class="align-right">Amount</th>
          <th class="align-right">Action</th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(dPdt,indx) in getDonationListArr" :key="indx">
          <td class="align-left">{{dPdt.productId}} </td>
          <td class="align-left">{{dPdt.name}}</td>
          <td class="align-center"> 
              <input :name="indx" 
            type="radio"
            :checked="dPdt.isOneTime"
            @change="disableIsMonthly(dPdt);dPdt.isMonthly = dPdt.isMonthly == true ? !dPdt.isMonthly : dPdt.isMonthly"
            />
           <td class="align-center"> 
             <input :name="indx"
            type="radio" 
            :checked="dPdt.isMonthly"
            @change="enableIsMonthly(dPdt); dPdt.isMonthly = !dPdt.isMonthly"
            />
            </td>
          <td class="align-right">{{dPdt.cur}}  {{dPdt.amount}}</td>
          <td class="align-right"><button @click="deleteDonationList(dPdt)" class="btn btn-sm btn-danger">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <p class="text-right"><button @click="doCheckout" class="btn btn-success">Checkout</button></p>
  </div>
  </div>
<div class="col-md-4">
  <div class="card mb-4 py-4">
    <h5>$ {{getUserDetails.balanceZakath }}</h5>
    <p class="text-muted" style="font-size:13px">of Zakath remain</p>
  </div>

  <div v-if="getDonationListArr.length > 0" class="card mb-4 py-4">
  <div class="row"><div class="col-md-5">
    <h5><strong>$ {{getTotal()}}</strong></h5>
    <p class="text-muted" style="font-size:13px">Total due today</p>
    </div>
    <div class="col-md-7">
      <h5><strong>{{getDonationListArr[0].cur}} {{isMonthlyTotalAmt}}</strong></h5>
    <p class="text-muted" style="font-size:13px">Including monthly payment</p>
    </div>
    </div>
  </div>
</div>


</div>
<div v-if="getDonationListArr.length == 0">
    No Product Found..!
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      products: [],
      getDonationListArr : [],
      isDailyArr : [], 
      getUserDetailsObj: null,
      totalDueToday : 0,
      isMonthlyTotalAmt : 0
    };
  },
  computed: {
         ...mapGetters("donationStore", {getDonationList: 'getDonationList'}),
         ...mapGetters("userStore",  {getUserDetails: 'getUserDetails'})
  },
  watch: {
  getDonationList(){
    
    this.getDonationListArr = _.cloneDeep(this.getDonationList)
  },
  getUserDetails(){
    
    this.getUserDetailsObj = _.cloneDeep(this.getUserDetails)
  }
 },
 methods: {
   getSetAmt(amt){
     this.totalDueToday += amt
     return parseFloat(amt).toFixed(2)
   },
   getTotal(){
    let total =  _.sumBy(this.getDonationList,(o)=>{return o.amount;});
    this.totalDueToday = total
     return total
   },
   async enableIsMonthly(pdtObj){
     
     pdtObj.isMonthly = true
     pdtObj.isOneTime = false
     let res = await this.$store.dispatch("donationStore/updatePdtEntity", pdtObj);
     this.isDailyArr.push(pdtObj)
      this.isMonthlyTotalAmt = 0
     this.isMonthlyTotalAmt =  _.sumBy(this.isDailyArr,(o)=>{return o.amount;});

   },
   async disableIsMonthly(pdtObj){
     
     let amt = 0
     
     pdtObj.isMonthly = false
     pdtObj.isOneTime = true
     let res = await this.$store.dispatch("donationStore/updatePdtEntity", pdtObj);
     _.remove(this.isDailyArr, function(n) { amt = n.amount; return n.productId == pdtObj.productId;})
     this.isMonthlyTotalAmt -= pdtObj.amount
     
   },
   async doCheckout(){
     
     let checkoutObj = {
        'userId' : this.getUserDetails.userId,
        'email' : this.getUserDetails.email,
        'totalAmount' : this.totalDueToday,
        'monthlyPayment' : this.isMonthlyTotalAmt,
        'productDetails' : []
     }
     let tempPdtArr = []
     _.forEach(this.getDonationListArr,(v,k)=>{
        tempPdtArr.push({
          'productId':v.productId,
          'name' : v.name,
          'cur':v.cur,
          'amount':v.amount,
          'isMonthly':v.isMonthly,
          'isOneTime':v.isOneTime,
        })
        checkoutObj.productDetails = tempPdtArr
        
     })
     
     let res = await this.$store.dispatch("donationStore/checkout", checkoutObj, {rootState:true});
     
     this.isMonthlyTotalAmt = 0
     this.totalDueToday = 0
   },
    async deleteDonationList(pdt){
     
     if(pdt.isMonthly){
          _.remove(this.isDailyArr, function(n) { return n.productId == pdt.productId;})
       this.isMonthlyTotalAmt -= pdt.amount
     }
     let res = await this.$store.dispatch("donationStore/deleteDonationList", pdt);
   }
 }
  
}
</script>