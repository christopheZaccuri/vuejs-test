<script>

export default {
    name: 'blocTarif',
    props: {productsList : Object, consoDataResultForBlocTarif : Number},
    data() {
        return {
            productDetail : this.productsList.detail,
            productPrice : this.productsList.price,
            productName : this.productsList.name,
            consoDataResult : 0,
            productImg : this.productsList.image,
            offerPrice : 0
        }
        
    },
    updated() {
        this.consoDataResult = this.consoDataResultForBlocTarif
    },
    methods : {
        calculProductPrice () {
            this.offerPrice = (this.productPrice * this.consoDataResult)/100
            return this.offerPrice+" €"
        }
    }
}
</script>
<template>
    <div class="bloc-tarif">
        <h2>{{productName}}</h2>
        <img :src="require(`@/assets/${productImg}.png`)" >
        <p class="price">{{calculProductPrice()}}</p>
        <h3>Tarif details</h3>
        <ul>
            <li v-for="(detail, index) of productDetail" :key="index">{{detail}}</li>
        </ul>
        <button @click="addProduct">Jetz bestellen</button>
    </div>
</template>

<style scoped>
    .bloc-tarif {
        display: inline-block;
        vertical-align: top;
        width: 40%;
        min-width: 300px;
    }
</style>
