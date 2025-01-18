import { useLocation } from "react-router-dom";
import HomeLayout from '../../layouts/HomeLayout';

function CourseDescription() {
    const { state } = useLocation();

    const {
        title = "Course Title Not Available",
        description = "No description provided for this course.",
        category = "Uncategorized",
        createdBy = "Unknown",
        numberOfLectures = 0,
        thumbnail = {},
        youtubeLink 
    } = state || {};

    const handleSubscribeClick = () => {
        if (youtubeLink) {
            window.open(youtubeLink, '_blank');
        } else {
            alert("No YouTube link available for this course.");
        }
    };

    return (
        <HomeLayout>
            <div className="flex flex-col lg:flex-row lg:px-20 py-12">
                {/* Left Section */}
                <div className="lg:w-1/2 w-full px-12 flex flex-col gap-7">
                    <img
                        src={thumbnail.secure_url || "https://via.placeholder.com/300"}
                        alt="Course Thumbnail"
                        className="rounded-xl w-full h-96"
                    />
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Course category: <span className="text-xl text-blue-500">{category}</span>
                    </p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Instructor: <span className="text-xl text-blue-500">{createdBy}</span>
                    </p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">
                        Number of lectures: <span className="text-xl text-blue-500">{numberOfLectures}</span>
                    </p>
                    <button
                        className="btn btn-primary capitalize"
                        onClick={handleSubscribeClick}
                        aria-label="Go to the course's YouTube link"
                    >
                        Go to Course
                    </button>
                </div>

                {/* Right Section */}
                <div className="lg:w-1/2 w-full px-12 py-12 flex flex-col gap-4">
                    <h1 className="font-bold text-yellow-500 lg:text-4xl text-xl capitalize">
                        {title}
                    </h1>
                    <p className="font-semibold lg:text-2xl text-xl text-amber-500 capitalize">
                        Course Description:
                    </p>
                    <p className="font-semibold lg:text-xl text-xs text-white normal-case tracking-wider">
                        {description}
                    </p>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;
