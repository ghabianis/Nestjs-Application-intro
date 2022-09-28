import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { publications } from './Publications'
const Stories = [
    {
        id: "1",
        publicationId: publications[0].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "2",
        publicationId: publications[1].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "3",

        publicationId: publications[5].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "4",

        publicationId: publications[19].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "5",

        publicationId: publications[20].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "6",

        publicationId: publications[21].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "7",
        publicationId: publications[25].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "8",
        publicationId: publications[26].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "9",

        publicationId: publications[30].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "10",

        publicationId: publications[44].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "11",

        publicationId: publications[45].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
    {
        id: "12",

        publicationId: publications[46].id,
        mediaLink: 'https://ik.imagekit.io/etpicxhlw/images_videos/VID-20220721-WA0000_5aIdYwEum0.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663230273784'

    },
]

export async function addStorySeedData() {
    for (let i = 0; i < Stories.length; i++) {
        await prisma.story.upsert({
            where: {
                id: Stories[i].id,
            },
            update: {
                publicationId: Stories[i].publicationId,


            },
            create: Stories[i],
        })

    }
}
