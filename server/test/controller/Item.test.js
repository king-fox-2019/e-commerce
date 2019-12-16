const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');

const Item = require('../../model/item');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

// checking item
describe("Items", () => {

    describe("GET /", () => {
        // Test to get all items record
        it("should get all items record", (done) => {
            chai.request(app)
                .get('/api/item')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("POST /", () => {
        // Test to create items record
        it("should post items record", (done) => {
            chai.request(app)
                .post('/api/item/register')
                .send({
                    name: "Apple iPhone 11 Pro Max 256 GB",
                    stock: "8",
                    price: "21790000",
                    image: "https://s4.bukalapak.com/" +
                        "morgana/9fb58af540077c7f4e5fbbd5/" +
                        "large/" +
                        "2019_11_01T16_07_48_07_00.jpg",
                    owner: "5df73c418a471c15b05d66b1",
                    description: "iPhone 11 Pro dan 11 Pro Max adalah " +
                        "sekuel dari iPhone XS dan iPhone XS Max - " +
                        "jika ada keraguan. Mereka sama besar, " +
                        "dengan desain dan layar yang serupa, " +
                        "tetapi datang dengan kinerja yang ditingkatkan, " +
                        "beberapa peningkatan kamera besar, baterai lebih besar, " +
                        "dan chip wideband Apple U1 baru. Memang, " +
                        "ada banyak yang harus dijelajahi, " +
                        "jadi jangan biarkan yang familiar itu menipu Anda." +
                        "Memang, desain iPhone 11 Pro tetap sama, " +
                        "atau setidaknya itulah yang disarankan depan. " +
                        "Ada pengaturan tiga kamera baru di bagian belakang, " +
                        "dan kaca belakang sekarang memiliki lapisan buram yang " +
                        "telah kami cintai sejak OnePlus 6. " +
                        "Perlindungan air juga mengalami peningkatan, " +
                        "dan sekarang yang kesebelas iPhone dapat bertahan dalam air " +
                        "sedalam hingga 4 meter.be called Pro."
                })
                .end((err, res) => {
                    done();
                });
        });
    });

});