import multer, { memoryStorage } from "multer";

const storage = memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

export default upload;