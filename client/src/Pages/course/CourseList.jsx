import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeLayout from '../../layouts/HomeLayout';
import { getAllCourse } from '../../redux/slices/CourseSlice';
import CourseCard from './CourseCard';

function CourseList() {
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state?.course);

    async function loadCourses() {
        await dispatch(getAllCourse());
    }
    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main content */}
            <HomeLayout>
                <div className="flex-grow flex flex-col lg:pt-10 md:pt-10 pt-20 lg:px-20 px-4 gap-14">
                    <h1 className="font-bold lg:text-4xl md:text-4xl text-2xl font-serif text-white text-center">
                        Explore all courses made by <span className="text-yellow-400">Industry Experts</span>
                    </h1>
                    <div className="flex flex-wrap mb-10 gap-14 w-full px-8 justify-center">
                        {courseData?.map((course) => (
                            <CourseCard key={course._id} data={course} />
                        ))}
                    </div>
                </div>
            </HomeLayout>

            {/* Footer */}
            <footer className="bg-gray-900 text-center text-Black py-4">
            </footer>
        </div>
    );
}

export default CourseList;
