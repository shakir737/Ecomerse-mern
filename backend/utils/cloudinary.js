const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// const cloudinaryUploadImg = async (fileToUploads) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUploads, (result) => {
//       resolve(
//         {
//           urls: result.secure_url,
          
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };
// const cloudinaryDeleteImg = async (fileToDelete) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.destroy(fileToDelete, (result) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         },
//         {
//           resource_type: "auto",
//         }
//       );
//     });
//   });
// };

// module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
