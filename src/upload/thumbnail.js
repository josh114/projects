import * as fs from "node:fs";
import * as fsProm from "node:fs/promises";
import path from "path";
import sharp from "sharp";
import http from "https";

// export const generateThumbnail = async (
//   filePath,
//   thumbnailPath,
//   time,
//   name,
//   ext
// ) => {
//   Ffmpeg(filePath)
//     .on('end', async () => {
//       console.log('thumbnail generated successfully');
//     })
//     .on('error', (err) =>
//       console.error('error generating thumbnail', err.message)
//     )
//     .screenshots({
//       timestamps: [time],
//       filename: `${name.split(`.${ext}`)[0]}-thumbnail.png`,
//       folder: thumbnailPath,
//       size: '80x60',
//     });
//   return `thumbnails/${name.split(`.${ext}`)[0]}-thumbnail.png`;
// };

export const fileSize = async (path) => {
  try {
    const stats = await fsProm.stat(path);
    let size = stats.size / 1048576;
    return parseFloat(size.toFixed(2));
  } catch (error) {
    // console.log(error?.message);
    return "";
  }
};
export const processImage = async (imgPath, outPath) => {
  try {
    await sharp(imgPath).resize(60, 60).toFile(outPath);
    // console.log('image resized and save successfully');
  } catch (error) {
    console.error("error resizing the image: ", error);
  }
};

export const downloadFile = async (url, filePath) => {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      const totalBytes = parseInt(response.headers["content-length"], 10);
      let downloadedBytes = 0;

      if (response.statusCode !== 200) {
        reject(
          new Error(
            `Failed to download file. Status Code: ${response.statusCode}`
          )
        );
        return;
      }
      const writer = fs.createWriteStream(filePath);
      response.on("data", (chunk) => {
        downloadedBytes += chunk.length;
        const progressPercentage = (
          (downloadedBytes / totalBytes) *
          100
        ).toFixed(2);
        // console.log(`Download progress: ${progressPercentage}%`);
      });

      response.pipe(writer);
      writer.on("finish", () =>
        resolve({
          fileName: path.basename(filePath),
          size: totalBytes,
        })
      );
      writer.on("error", reject);
    });
    request.on("error", (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
};
// const url =
//   'http://localhost/download/vids/korean_c6390138-ad23-467e-b73c-004cda8d568a.png';
// const videoPath = path.join(process.cwd(), '..', `vids/korean.png`);
// downloadFile(url, videoPath)
//   .then((result) => {
//     console.log('download complete', result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// const size = await fileSize(videoPath);
// console.log('this is size', size);
// const imagePath = path.join(
//   process.cwd(),
//   '..',
//   `vids/fastXThumbnail_51fd2413-fedc-49f3-940c-95beb725bfeb.png`
// );
// const output = path.join(
//   process.cwd(),
//   '..',
//   'thumbnails/fastXThumbnail_51fd2413-fedc-49f3-940c-95beb725bfeb-thumbnail.png'
// );

// console.log(processImage(imagePath, output));
