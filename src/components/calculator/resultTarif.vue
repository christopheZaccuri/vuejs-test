<script>
import bloctarif from'../form-tarif/blocTarif.vue'

export default ({
    name: 'resultTarif',
    props : {dataCalculator : Object},
    components : {
        'bloctarif' : bloctarif
    },
    data() {
        return {
            products : [
                {id: 1, name: "switch Mono Blue", image :"switchblue", price: 20.98, detail: ["100% nachhaltiger Strommix", "Abschluss in wenigen Minuten ohne lästigen Papierkram!", "Arbeitspreis Vertrieb: 12,51 ct / kWh /// Netz: 4,97 ct / kWh (netto)"]},
                {id: 2, name: "switch Mono", image:"switchmono", price: 20.61, detail: ["Volle Kostentransparenz", "Kostengünstiger Tarif"]}
                ],

            consoDataResult : 0
            

        }
    },
    updated() {
        this.consoDataResult = this.dataCalculator.consoData
    }
    
})

</script>


<template>
    <div class="result-tarif">
        <p class="recap"> City : {{dataCalculator.city}}  Conso :  {{dataCalculator.consoData}}</p>
       <p @click="$emit('close')" class="close">X</p>
       <h2>Tarifauswahl Strom</h2>
       <bloctarif v-for="product in products" :key="product.id" :productsList="product" :consoDataResultForBlocTarif="consoDataResult" />
       
    </div>
</template>
<style scoped>
    .result-tarif {
        display: none;
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    .recap {
        width: 80%;
        max-width: 1000px;
        margin:auto;
        margin-top: 50px;
    }
    .close {
        position: absolute;
        top: 5%;
        right: 5%;
        cursor: pointer;
    }
</style>
