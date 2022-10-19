import * as aws from "aws-sdk";
import { S3Config } from "../config";

aws.config.update({ region: "us-east-2" });

const S3 = new aws.S3({ apiVersion: "2006-03-01", credentials: { accessKeyId: S3Config.AccessKeyID, secretAccessKey: S3Config.SecretKey } });

const ImageUploader = (image: Buffer, fileName: string) => {
  return new Promise<aws.S3.ManagedUpload.SendData>((resolve, reject) => {
    const options: aws.S3.Types.PutObjectRequest = {
      Bucket: "inventoryprojectbucket",
      Key: fileName,
      Body: image,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };
    S3.upload(options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default ImageUploader;
