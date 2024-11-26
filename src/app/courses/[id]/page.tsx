/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CoursesDetailsPage from "@/app/_components/CourseDetails/CoursesDetailsPage";

export default function Page({ params }: any) {
    return (
        <div>
            <CoursesDetailsPage id={params.id} />
        </div>
    );
}
