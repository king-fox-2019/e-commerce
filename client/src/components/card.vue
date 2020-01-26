<template>
    <div class="suiCard">
        <sui-card>
            <sui-dimmer-dimmable @mouseenter.native="cardOneActive = true" @mouseleave.native="cardOneActive = false">
                <sui-image :src="data.image" class="suiCardImage"></sui-image>
                <sui-dimmer blurring :active="cardOneActive">
                    <sui-button inverted @click.prevent="toggle">
                        Details
                    </sui-button>
                </sui-dimmer>
            </sui-dimmer-dimmable>
            <sui-card-content>
                <a is="sui-label" color="red" ribbon>
                    Hot Item
                </a>
                <h5>{{ data.name.slice(0, 20) }} ...</h5>
                <sui-card-meta>Rp. {{ price }}</sui-card-meta>
            </sui-card-content>
            <sui-card-content extra>
                <sui-icon name="users"/>
                {{ data.owner.name.split(" ")[0] }}
            </sui-card-content>
        </sui-card>
        <item-detail-modal :open="open" @toggle="toggle" :data="data"/>
    </div>
</template>

<script>
    import itemDetailModal from "./itemDetailModal";

    export default {
        name: "card",
        data() {
            return {
                cardOneActive: false,
                open: false
            };
        },
        props: {
            data: Object
        },
        methods: {
            toggle() {
                this.open = !this.open;
            }
        },
        computed: {
            price() {
                let segment = [];
                let n = [];
                let priceReverse = "0" + this.data.price.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i])
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            }
        },
        components: {
            itemDetailModal
        }
    }
</script>

<style scoped>
    .suiCard {
        width: 250px;
        padding: 5px;
    }

    .suiCardImage {
        height: 200px !important;
        width: 250px !important;
    }
</style>