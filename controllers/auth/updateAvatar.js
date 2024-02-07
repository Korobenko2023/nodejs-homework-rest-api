const path = require("path");
const fs = require("fs/promises");
const User = require("../../models/user");
const Jimp = require('jimp');

const updateAvatar = async (req, res) => {
    const { filename } = req.file;
    const { _id } = req.user;

    const tempPath = path.resolve("temp", filename);
    const publicDir = path.resolve("public", "avatars");
    const uniqueFilename = `${_id}_${Date.now()}_${filename}`; 
    const publicPath = path.resolve(publicDir, uniqueFilename);

    try {
        
        const image = await Jimp.read(tempPath);
        image.resize(250, 250);
        await image.writeAsync(publicPath);
   
        const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL: publicPath }, { new: true });
     
        return res.json({ avatarURL: updatedUser.avatarURL });
        
    } catch (error) {
        await fs.unlink(tempPath)
        throw error
    }    
}

module.exports = updateAvatar;