<template>
    <sui-item>
        <sui-item-image
                size="tiny"
                :src="data.image"/>
        <div class="middle aligned content">
            <h5>
                {{ data.name }}
            </h5>
            <div class="description">
                <p>
                    Total: Rp. {{ price(data.price) }}<br>
                    Amount : {{ data.stock }} item
                </p>
            </div>
            <div class="extra">
                <sui-button icon="check" basic primary/>
                <sui-button icon="remove" basic negative @click="removeFromCart"/>
            </div>
        </div>
    </sui-item>
</template>

<script>
    export default {
        name: "chartList",
        props: {
            data: Object,
            index: Number
        },
        methods: {
            price(num) {
                let segment = [];
                let n = [];
                let priceReverse = "0" + num.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i]);
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            },
            removeFromCart(){
                this.$emit('remove', this.index)
            }
        }
    }
</script>

<style scoped>

</style>