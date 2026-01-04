import type z from "zod";
import type { privateDocsLabel } from "../schemas/util.schemas.js";

export type DeepPartial<T> = T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

export type MulterFile = Express.Multer.File;
export type PrivateDocs = z.infer<typeof privateDocsLabel>;