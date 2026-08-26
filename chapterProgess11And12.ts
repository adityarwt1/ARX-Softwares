type ChapterStatus = "completed" | "pending" | "backlog"
interface Topics {
    topicName: string,
    isWeak: boolean,
    isConfident: boolean
    isPracticed: boolean
}
interface ChapterProgress {
    chapterName: string,
    status: ChapterStatus
    isPyqDone: boolean,
    completingDate?: string | Date
    topic?: Topics[],
    chapterLinkExamGoal?: string | URL
    isShortnoteCreated?: boolean
}

const Class11thPhsysicsJeeChapters: ChapterProgress[] = [
    {
        chapterName: "UNIT AND DIMENTIONS",
        isPyqDone: false,
        status: "pending",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/564d8d85-c7ad-52a8-8a62-2b498822051f",
        completingDate: ""
    },
    {
        chapterName: "Vector Algebra",
        isPyqDone: false,
        status: "completed",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/36c3a97f-a12f-5d2b-9f0e-2b881e7980ef",
        completingDate: ""

    },
    {
        chapterName: "MOTION IN STRAIGHT LINE",
        isPyqDone: false,
        status: "backlog",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/50b62666-a5b4-57ef-97ca-91542a1f366e"
    },
    {
        chapterName: "Circular Motion",
        isPyqDone: false,
        status: "pending",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/78dea22a-9b38-5ae0-a46f-6e58b2e6623e"
    },
    {
        chapterName: "Law of motion",
        isPyqDone: false,
        status: "backlog",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/582e7844-84f7-5f45-871d-b3746392cc95"
    },
    {
        chapterName: "Work Power Energy",
        isPyqDone: false,
        status: "backlog",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/1e0f32e4-342a-52ad-9e7a-ee26e94eaac8"
    },
    {
        chapterName: "Center of mass",
        chapterLinkExamGoal: "https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/653765f7-c90c-526a-b32e-6d0e35ffb6ca",
        isPyqDone: false,
        status:"backlog",

    }, 
    {
        chapterName:"Rotation Motions",
        isPyqDone:false,
        status:"backlog",
        chapterLinkExamGoal:"https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/7da2decb-0f68-5e60-b411-22b12492d544"
    },
    {
        chapterName:"Properties Of Matter",
        chapterLinkExamGoal:"https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/8e447d7f-edad-59ea-88d3-ae1a8a70e011",
        isPyqDone:false,
        status:"backlog"
    },
    {
        chapterName:"Heat and Thermodynamics",
        chapterLinkExamGoal:"https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/75619ede-121d-5942-9436-6509a6fcfec3",
        isPyqDone:false,
        status:"backlog"
    },
    {
        chapterName:"Gravitation",
        chapterLinkExamGoal:"https://room.examgoal.com/pyq/subject/99673506-f2c4-59c3-b166-d9543244d505/chapter/4a4657df-ea08-53ef-b676-e6ae4f08760a",
        isPyqDone:false,
        status:"backlog"
    }
]


const Class12thJeeChapters:ChapterProgress[] =[
    {
        chapterName:"Electrostatics",
        isPyqDone:false,
        status:"backlog"
    }
]