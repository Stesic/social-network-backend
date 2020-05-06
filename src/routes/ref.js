const multer = require("multer");

const uploadFile = multer({
  // dest: "images",
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      cb(new Error("File must be .img or .png"));
    }

    cb(null, true);
  },
});

router.put("/user/:id/image", uploadFile.single("image"), async (req, res) => {
  const image = req.file.buffer;
  const id = req.params.id;
  const user = await User.findById(id);
  user.avatarUrl = image;
  const updatedUser = await user.save();
  if (updatedUser) {
    res.status(201).send({ data: "Update done!" });
  } else {
    res.status(400).send("Error: user image not updated!");
  }
});

router.get("/user/:id/image", async (req, res) => {
  const ownerId = req.params.id;
  const user = await User.findById(ownerId);

  if (user) {
    const img = new Buffer(user.avatarUrl).toString("base64");

    res.status(200).send({ src: `data:image/jpg;base64,${img}` });
  } else {
    res.status(400).send("Error: user image not updated!");
  }