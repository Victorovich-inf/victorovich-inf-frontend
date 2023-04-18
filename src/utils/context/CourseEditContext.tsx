import React from "react";
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';

interface CourseEditContextProps {
    handleSetSelected: (data: LessonData | TaskData) => void;
    selected: LessonData | TaskData | null
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
