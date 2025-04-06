import jwt from 'jsonwebtoken';

const privateKey = 'privateKey';
const publicKey = 'publicKey';

export const signJWT = (payload: any, expiresIn: number) => {
  return jwt.sign(payload, privateKey, {
    // algorithm: 'RS256',
    expiresIn,
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { payload: decoded, expired: false };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { payload: null, expired: error.message.includes('jwt expired') };
    }
    return { payload: null, expired: true };
  }
};
