const ImageKit = require("imagekit")
export default new ImageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY,
    publicKey:process.env.IMAGE_KIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGE_KIT_ENDPOINT
})