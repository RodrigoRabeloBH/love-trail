'use server'

import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMemberProfile(data: MemberEditSchema, nameUpdated: boolean): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);

        if (!validated.success)
            return { status: 'error', error: validated.error.errors };

        const { city, country, description, name } = validated.data;

        if (nameUpdated) {
            await prisma.user.update({
                where: { id: userId },
                data: { name }
            });
        }

        const member = await prisma.member.update({
            where: { userId },
            data: { city, country, name, description }
        });

        return { status: 'success', data: member };

    } catch (error) {
        return { status: 'error', error: 'Something went wrong' };
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    create: [{ url, publicId }]
                }
            }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();

        await prisma.user.update({
            where: { id: userId },
            data: { image: photo.url }
        });

        await prisma.member.update({
            where: { userId },
            data: { image: photo.url }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();

        if (photo.publicId)
            await cloudinary.v2.uploader.destroy(photo.publicId);

        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    delete: { id: photo.id }
                }
            }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUserInfoForNav() {
    try {
        const userId = await getAuthUserId();

        return prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, image: true }
        });
    } catch (error) {
        console.error(error)
        throw error;
    }
}