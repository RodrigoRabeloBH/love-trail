'use serve';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Photo } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function getMembers() {
    const session = await auth();

    if (!session?.user)
        return null;

    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({
            where: {
                userId: userId
            }
        })
    } catch (error) {
        console.error(error);
    }
}

export async function getMemberPhotosByUserId(userId: string)
    : Promise<Photo[] | null | undefined> {
    try {
        const member = await prisma.member.findUnique({
            where: { userId },
            select: { photos: true }
        });

        if (!member)
            return null;

        return member.photos.map(p => p) as Photo[];

    } catch (error) {
        console.error(error);
    }
}