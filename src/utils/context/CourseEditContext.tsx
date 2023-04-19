import React from "react";
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { Content, ContentData } from '../../@types/editor';

interface CourseEditContextProps {
    handleSetSelected: (data: LessonData | TaskData) => void;
    selected: LessonData | TaskData | null;
    content: Content;
    handleSetContent: (data: ContentData) => void;
    handleChangeContent: (data: ContentData) => void;
    handleDeleteElement: (id: string) => void;
    handleMoveDown: (index: number) => void;
    handleMoveUp: (index: number) => void;
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
