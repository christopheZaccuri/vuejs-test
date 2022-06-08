<script>

import resulttarif from './resultTarif.vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default ({
    name: 'electrisCalculator',
    data() {

        return {
            yupObject: yup.object({
                adress : yup.string().matches(/^[a-zA-Z_.]/g, "chiffres non acceptés").required("ce champs est requis"),
                killowattInput : yup.number().typeError("doit etre un chiffre").min(100, "valeur trop petite").required("ce champs est requis"),
            }),
            //calculator data
            personSelectionData : '',
            citySelectionData : '',
            calculateurData : {},
            openTarifPage : false,

            //city selection data
            adressInput: '',
            adressToShow: '',
            removeAdressList : false,

            // person selection
            kilowatt : '',

            
        }
    },
    components : {
        'resulttarifpage' : resulttarif,
        Form, Field, ErrorMessage
        
    },
    methods : {
        //calculator methods
        onSubmit() {
            this.calculateurData = {city: this.adressInput, consoData: this.kilowatt}
            this.openTarifPage = true
                      
        },

        //city selection methods
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
        },
        // person selection methods
        getIndex(index) {
            const listPerson = document.querySelectorAll('.icon-person-content')
            const listPersonArray = Array.from(listPerson)
            this.kilowatt = 1500 + (1000*index)
            

            index += 1
            if(document.querySelector('.active')){
                document.querySelectorAll('.active').forEach(element => {
                    element.classList.remove('active')
                });
            }
            for (let i = 0; i < index; i++) {
                listPersonArray[i].classList.add('active') 
                
            }
        },
    },
    computed : {
        shema() {
            return this.yupObject

            
        }
    },
    mounted() {
        this.getData()
    }
})
</script>

<template>
    <div class="calculator-content">
        <h1>In wenigen Schritten zu Ihrem Tarif</h1>
        <Form @submit="onSubmit" :validationSchema="shema">

            <ul>
                <li>
                    <Field type="text" name="adress" v-model="adressInput" @input="adressInputEvent(adressInput)" />
                    <ErrorMessage name="adress" />

                    <ul v-if="adressToShow != ''" class="adress-to-show" :class="removeAdressList? 'hide' : ''" >
                        <li v-for="(adress, index) in adressToShow" :key="index" @click="putAdressToInput(adress)">{{adress}}</li>
                    </ul>
                </li>
                <li>
                    <div style ="display:flex;">
                        <ul class="content-person">
                            <li class="icon-person-content" v-for="(n, index) in 5" :key="index" @click="getIndex(index)"><span class="icon"></span></li>
                        </ul>
                        <Field name="killowattInput" required type="text" v-model="kilowatt" />
                        <ErrorMessage name="killowattInput" />
                    </div>
                    
                </li>
            </ul>
            <input class="button-calcul" type="submit" value="kalkulieren">
        </Form>



        <resulttarifpage :class="{ open : openTarifPage }" :dataCalculator ="calculateurData" :isopen="openTarifPage" @close="openTarifPage = !openTarifPage" />
    </div>
</template>




<style scoped>
    .calculator-content {
        width: 70%;
        border: solid 2px #482;
        padding: 20px;
        margin: 50px auto;
    }
    .button-calcul {
        color: #fff !important;
        width: auto;
        padding: 10px 40px;
        border: 0 !important;
        font-size: 18px;
        background: linear-gradient(135deg, rgba(255,214,0,1) 0%, rgba(202,200,0,1) 30%, rgba(159,184,29,1) 43%, rgba(87,179,110,1) 55%, rgba(0,157,148,1) 78%, rgb(0, 133, 162) 100%);
        font-weight: bold;
        border-radius: 10px 10px 30px 10px;
        text-align: right;
        float: right;
        cursor: pointer;
    }
    li {
        width: 33%;
        list-style: none;
        display: inline-block;
        vertical-align: top;
    }
    li:nth-child(2){
        width: 60%;
        margin-left: 5%;
    }
    .open {
        display: block;
    }
    .error-to-show {
        display: none;
    }

    /* city selection */
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
    .adress-to-show li {
        width: 100% !important;
        text-align: left;
        margin: 0 !important;
    }

    /* person select */
    .icon-person-content{
        display: inline-block;
        margin: 0 10px 0 0 !important;
        cursor: pointer;
        width: auto !important;
    }
    .content-person {
        width: 40%;
    }
    .icon {
        padding: 5px 10px;
        background: #ffebad;
    }
    .active .icon {
        background: #ffeb0e;
    }
</style>
