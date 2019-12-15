const chai = require("chai");
const chaiHttp = require("chai-http")
const chaiThings = require("chai-things")
const server = require("../app");
const { User, Product, Cart } = require("../models")
const { generateToken } = require("../helpers/jwt")
chai.use(chaiHttp);
chai.use(chaiThings)
const expect = chai.expect;

//---------------------------------------------------//
//                    Cart Testing                   //
// --------------------------------------------------//

