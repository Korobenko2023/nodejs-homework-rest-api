const path = require("path");
const fs = require("fs/promises");
const User = require("../../models/user");
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
    const { filename } = req.file;
    const { _id } = req.user;

    const tempPath = path.join("temp", filename);
    const uniqueFilename = `${_id}_${Date.now()}_${filename}`; 
    const publicPath = path.join("public", "avatars", uniqueFilename); 
    const avatarURL = ("avatars", uniqueFilename);

    
    const image = await Jimp.read(tempPath);
    image.resize(250, 250).writeAsync(publicPath);

    await fs.unlink(tempPath);
       
    const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
     
    return res.json({ avatarURL: updatedUser.avatarURL });
}

module.exports = updateAvatar;