const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');

const Item = require('../../model/item');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

// checking item
describe("Items", () => {

    describe("POST /", () => {
        it("should post items record", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1Nzk5NzQxNDB9.b0lieR5e7UPcad5Hqa7YHpS9JA81sQbHBV_hF1PZy4I')
                .send({
                    name: "Android IPhone 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error duplicate item", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1Nzk5NzQxNDB9.b0lieR5e7UPcad5Hqa7YHpS9JA81sQbHBV_hF1PZy4I')
                .send({
                    name: "Apple IPhone 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get all items record", (done) => {
            chai.request(app)
                .get('/api/items')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get the items you are looking for", (done) => {
            chai.request(app)
                .get('/api/items/iphone')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});