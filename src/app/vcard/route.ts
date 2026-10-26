import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import sharp from "sharp";
import VCard from "vcard-creator";

import { USER } from "@/features/profile/data/user";
import { createLogger } from "@/lib/logger";
import { decodeEmail, decodePhoneNumber } from "@/utils/string";

export const dynamic = "force-static";

const logger = createLogger("vcard");

export async function GET() {
  const card = new VCard();

  card
    .addName(USER.lastName, USER.firstName)
    .addPhoneNumber(decodePhoneNumber(USER.phoneNumber))
    .addAddress(USER.address)
    .addEmail(decodeEmail(USER.email))
    .addURL(USER.website);

  const photo = await getVCardPhoto(
    path.join(process.cwd(), "public", USER.avatar.replace(/^\/+/, ""))
  );
  if (photo) {
    card.addPhoto(photo.image, photo.mine);
  }

  if (USER.jobs.length > 0) {
    const company = USER.jobs[0];
    card.addCompany(company.company).addJobtitle(company.title);
  }

  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${USER.username}-vcard.vcf`,
    },
  });
}

async function getVCardPhoto(filePath: string) {
  try {
    const buffer = await readFile(filePath);
    if (buffer.length === 0) {
      return null;
    }

    const jpegBuffer = await convertImageToJpeg(buffer);
    const image = jpegBuffer.toString("base64");

    return {
      image,
      mine: "jpeg",
    };
  } catch {
    return null;
  }
}

async function convertImageToJpeg(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const jpegBuffer = await sharp(imageBuffer)
      .jpeg({
        quality: 90,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();

    return jpegBuffer;
  } catch (error) {
    logger.error("Could not convert the vCard photo to JPEG", { error });
    throw error;
  }
}
