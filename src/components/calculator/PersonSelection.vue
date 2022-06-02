<script>
export default {
    name: 'PersonSelection',
    data() {
        return {
            kilowatt : ''
        }
    },
    methods : {
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
    watch : {
        kilowatt(result) {
            result = parseInt(result)
            this.$emit('kilowattResult', result)
        }
    }
}
</script>
<template>
    <div>
        <ul>
            <li class="icon-person-content" v-for="(n, index) in 5" :key="index" @click="getIndex(index)"><span class="icon"></span></li>
        </ul>
        <input type="text" v-model="kilowatt">
    </div>
</template>

<style scoped>
    div {
        display: flex;
    }
    .icon-person-content{
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
    }
    .icon {
        padding: 5px 10px;
        background: #ffebad;
    }
    .active .icon {
        background: #ffeb0e;
    }
</style>