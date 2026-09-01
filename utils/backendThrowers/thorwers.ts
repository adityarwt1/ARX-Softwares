"use server"

import { unauthorized } from "../httpResponses"

export const throwUnauthorized = async (isAuthorized: boolean) => {
    if (!isAuthorized) {
        return unauthorized()
    }

    return null
}