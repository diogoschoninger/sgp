import { timingSafeEqual } from 'crypto';

const safeCompare = async (data: string, comparison: string) =>
  timingSafeEqual(Buffer.from(data), Buffer.from(comparison));

export default safeCompare;
