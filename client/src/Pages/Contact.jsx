import { useState } from 'react';
import { toast } from 'react-toastify';

import option2 from '../assets/Json/option2.json';
import Particle from '../components/Particle';
import axiosInstance from '../helpers/AxiosInstance';
import HomeLayout from '../layouts/HomeLayout';

function Contact() {
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Input validation
        if (!userInput.name || !userInput.email || !userInput.message) {
            return toast.error('All fields are required');
        }

        const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userInput.email)) {
            return toast.error('Please enter a valid email address');
        }

        if (!/^[a-zA-Z\s]+$/.test(userInput.name)) {
            return toast.error('Name should contain only letters and spaces');
        }

        try {
            setIsLoading(true);
            toast.loading('Sending your message, please wait...', { position: 'top-center' });

            const response = await axiosInstance.post('/contactus', userInput);

            toast.dismiss();
            if (response.data?.success) {
                toast.success('Your message was sent successfully!');
                setUserInput({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                throw new Error(response.data?.message || 'Failed to send message');
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response?.statusText || error.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className="flex flex-col gap-3 justify-center items-center h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-lg border-2 border-yellow-400 lg:w-[450px] w-[90%] md:w-1/2 h-fit p-7 flex flex-col gap-5 bg-white text-black shadow-lg"
                >
                    <h1 className="text-3xl font-semibold mb-2">Contact Us</h1>
                    <p className="text-slate-400">
                        For any queries, please reach out to us. Our support team will get back to you within 24 hours.
                    </p>
                    <hr className="border-t-2 border-slate-500" />
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="name" className="font-semibold text-xl text-slate-500">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                id="name"
                                required
                                className="input input-bordered input-primary w-full text-white"
                                value={userInput.name}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="email" className="font-semibold text-xl text-slate-500">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                id="email"
                                required
                                className="input input-bordered input-primary w-full text-white"
                                value={userInput.email}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="message" className="font-semibold text-xl text-slate-500">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Write your query here..."
                                required
                                className="textarea textarea-primary text-white"
                                value={userInput.message}
                                onChange={handleUserInput}
                            ></textarea>
                        </div>
                    </div>
                    <button
                        className="btn-primary rounded-lg py-3 text-xl"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;
