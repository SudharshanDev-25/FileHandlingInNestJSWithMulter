/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const multerProductOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = './uploads/others';

      if (file.mimetype.startsWith('image')) uploadPath = './uploads/images';
      else if (file.mimetype === 'application/pdf')
        uploadPath = './uploads/docs';
      else if (file.mimetype.startsWith('video'))
        uploadPath = './uploads/videos';
      else if (file.mimetype.startsWith('audio'))
        uploadPath = './uploads/audios';

      // Auto-create folder if not exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const fileExt = extname(file.originalname);
      const fileName =
        Date.now() + '-' + Math.round(Math.random() * 1e9) + fileExt;
      cb(null, fileName);
    },
  }),
};
