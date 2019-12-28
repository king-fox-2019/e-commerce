<template>
    <div>
        Number of items :
        <sui-button size="mini" icon="minus" @click="addInc(-1)"/>
        <sui-label id="suiLabel">{{number}}</sui-label>
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
        methods: {
            addInc(value) {
                if (this.number === 1 && value === -1) return
                if (this.number > 0) this.number += value
            }
        },
        computed: {}
    }
</script>

<style scoped>
    #suiLabel {
        background-color: white;
        /*font-size: 14px;*/
    }
</style>