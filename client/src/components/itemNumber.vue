<template>
    <div>
        Number of items :
        <sui-button size="mini" icon="minus" @click="addInc(-1)"/>
        <sui-label id="suiLabel" v-model="itemStock">{{itemStock}}</sui-label>
        <sui-button size="mini" icon="plus" @click="addInc(1)"/>
    </div>
</template>

<script>
    export default {
        name: "itemNumber",
        data() {
            return {
                number: 1
            }
        },
        props: {
            itemStock: Number
        },
        methods: {
            addInc(value) {
                this.number = this.itemStock;
                if (this.number === 1 && value === -1) return;
                this.number += value;
                this.$emit('stockNumber', this.number)
            }
        }
    }
</script>

<style scoped>
    #suiLabel {
        background-color: white;
        /*font-size: 14px;*/
    }
</style>