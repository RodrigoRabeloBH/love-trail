import { ZodIssue } from "zod";

type ActionResult<T> =
    { status: 'success', data: T } | { status: 'error', error: string | ZodIssue[] }

type UserInfo = {
    name: string | null
    image: string | null
} | null