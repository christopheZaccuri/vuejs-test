<script>
export default {
    name :'CitySelection',
    data() {
        return {
            adressInput: '',
            adressToShow: '',
            removeAdressList : false
        }
    },
    methods: {
        async getData() {
            try{
                const response =  await import('../../assets/city.json')
                return response;
            }catch(err){
                return err
            }
        },
        putAdressToInput(adress) {
            this.adressInput = adress
            this.removeAdressList = true
        },
        adressInputEvent(adressTyped){
            if(adressTyped.length > 1) {
                this.removeAdressList = false
                 console.log(this.removeAdressList)
                const getResponse = this.getData()
                getResponse.then(dataTab => {
                    let results = []
                    for (let i = 0; i < dataTab.length ; i++) {
                        const ville = dataTab[i].VILLE;
                        if(ville.includes(adressTyped.toUpperCase())) {
                            if(!results.includes(ville)) {
                                results.push(ville)
                                this.adressToShow = results
                            }
                        }
                    }
                })
                
            } else {
                this.adressToShow =''
            }
        }
    },

    mounted() {
        this.getData()
    },
    watch: {
       adressInput(result) {
           this.$emit('adressInputResult', result)
       }
    }
}
</script>
<template>
    <div>
        <input type="text" name="adress" v-model="adressInput" @input="adressInputEvent(adressInput)">
        <ul v-if="adressToShow != ''" class="adress-to-show" :class="removeAdressList? 'hide' : ''" >
            <li v-for="(adress, index) in adressToShow" :key="index" @click="putAdressToInput(adress)">{{adress}}</li>
        </ul>
    </div>
</template>

<style scoped>
    
    .adress-to-show {
        background: #eee;
    }
    .adress-to-show li {
        cursor: pointer;
    }
    input {
        width: 100%;
    }
    .hide {
        display: none;
    }
</style>