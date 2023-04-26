import React from "react";
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { Content, ContentData } from '../../@types/editor';
import { CourseData } from '../../@types/course';

interface CourseEditContextProps {
    handleSetSelected: (data: LessonData | TaskData) => void;
    selected: LessonData | TaskData | null;
    content: Content;
    handleSetContent: (data: ContentData) => void;
    handleChangeContent: (data: ContentData) => void;
    handleDeleteElement: (id: string) => void;
    handleMoveDown: (index: number) => void;
    handleMoveUp: (index: number) => void;
    isLesson: (selected: LessonData | TaskData | null) => boolean
    isTask: (selected: LessonData | TaskData | null) => boolean
    course?: CourseData
}

const CourseEditContext = React.createContext<CourseEditContextProps | null>(null);

const CourseEditProvider = CourseEditContext.Provider

const useCourseEditContext = () => {
    const data = React.useContext(CourseEditContext)

    if (!data) {
        throw new Error(`Невозможно использовать useCourseEditContext вне CourseEditProvider`)
    }

    return data;
}

export {CourseEditProvider, useCourseEditContext}
