'use server'

import { MemberEditSchema, memberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);

        if (!validated.success)
            return { status: 'error', error: validated.error.errors };

        const { city, country, description, name } = validated.data;

        const member = await prisma.member.update({
            where: { userId },
            data: { city, country, name, description }
        });

        return { status: 'success', data: member };

    } catch (error) {
        return { status: 'error', error: 'Something went wrong' };
    }
}