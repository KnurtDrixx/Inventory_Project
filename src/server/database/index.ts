import * as mysql from "mysql";
import { sqlConfig } from "../config";

const pool = mysql.createPool(sqlConfig);

export const query = <T = mysql.OkPacket>(sqlstring: string, values?: unknown[]) => {
  return new Promise<T>((resolve, reject) => {
    pool.query(sqlstring, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export default query;
