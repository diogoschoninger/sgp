import { BinaryLike, pbkdf2Sync } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const encryptionConfigs = {
  salt: process.env.SALT,
  iterations: Number(process.env.ITERATIONS),
  keyLength: Number(process.env.KEY_LENGTH),
  digest: process.env.DIGEST,
};

export const encrypt = async (data: string) =>
  pbkdf2Sync(
    data,
    encryptionConfigs.salt as BinaryLike,
    encryptionConfigs.iterations as any,
    encryptionConfigs.keyLength as any,
    encryptionConfigs.digest as string
  ).toString('hex');

export const jwtConfig = {
  secret: process.env.SECRET,
  expiration: process.env.EXPIRATION,
};
