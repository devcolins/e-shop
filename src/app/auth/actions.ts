import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { verifySession } from "@/lib/sessions";
import { eq } from "drizzle-orm";
import { cache } from "react";


export const getUser = cache(async () => {
    const session = await verifySession();

    const data = await db.select().from(usersTable).where(eq(usersTable.id,session.user_id));
    const user = data[0]

    return user
})