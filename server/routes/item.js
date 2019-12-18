const router = require("express").Router();
const Item = require("../controllers/itemController");
const { authentication, authorizationRole } = require("../middlewares/auth");
const gcsUpload = require("gcs-upload");
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: "keyfile.json",
    bucketName: "img-dragon-nest"
  }
});

router.use(authentication);
router.post("/", authorizationRole, upload.single("image"), Item.create);
router.get("/detail/:id", Item.getDetail);
router.get("/", Item.getAll);
router.delete("/:id", authorizationRole, Item.remove);
router.put("/:id", authorizationRole, upload.single("image"), Item.update);

module.exports = router;
