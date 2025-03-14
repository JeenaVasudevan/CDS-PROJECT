import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import axios from "axios";

const Home = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onTouched" });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState({});

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.idd?.root ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}` : "",
                    label: `${country.name.common} (${country.idd?.root || ""}${country.idd?.suffixes ? country.idd.suffixes[0] : ""})`,
                }));
                setCountries(countryOptions);
            })
            .catch((error) => console.error("Error fetching country data:", error));
    }, []);

    const handlePhoneChange = (value, field) => {
        setPhoneNumbers((prev) => ({ ...prev, [field]: value }));
        setValue(field, value, { shouldValidate: true });
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className={`transition-all duration-300 ${dropdownOpen ? "ml-64" : "ml-0"}`}>
            <Header setDropdownOpen={setDropdownOpen} />
            <main className="p-6 bg-gray-100 min-h-screen text-gray-900">
                <h1 className="text-3xl font-bold text-center mb-8">Add Student Details</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {["Student ID", "Student Name *", "Student Profession", "Institute of Student", "State *", "Primary Email Id *", "Gmail Id"].map((field, index) => (
                            <div className="flex flex-col" key={index}>
                                <label className="font-medium">{field.includes("*") ? <>{field.replace("*", "")} <span className="text-red-500">*</span></> : field}</label>
                                <input type="text" {...register(field.toLowerCase().replace(/ /g, "_"), { required: field.includes("*") })} className="input input-bordered w-full text-black bg-white" />
                                {errors[field.toLowerCase().replace(/ /g, "_")] && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                        ))}
                        <div className="flex flex-col">
                            <label className="font-medium">Gender <span className="text-red-500">*</span></label>
                            <select {...register("gender", { required: true })} className="input input-bordered w-full text-black bg-white">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">Date of Birth</label>
                            <input type="date" {...register("dob")} className="input input-bordered w-full text-black bg-white" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">Country <span className="text-red-500">*</span></label>
                            <select {...register("country", { required: true })} className="input input-bordered w-full text-black bg-white">
                                <option value="">Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.value}>{country.label}</option>
                                ))}
                            </select>
                            {errors.country && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                        {["Primary Phone Number *", "Whatsapp Number", "Telegram Number", "Second Phone Number"].map((field, index) => (
                            <div className="flex flex-col" key={index}>
                                <label className="font-medium">{field.includes("*") ? <>{field.replace("*", "")} <span className="text-red-500">*</span></> : field}</label>
                                <PhoneInput
                                    country="us"
                                    value={phoneNumbers[field.toLowerCase().replace(/ /g, "_")] || ""}
                                    onChange={(value) => handlePhoneChange(value, field.toLowerCase().replace(/ /g, "_"))}
                                    inputStyle={{ width: "100%", height: "40px" }}
                                />
                                {errors[field.toLowerCase().replace(/ /g, "_")] && <span className="text-red-500 text-sm">This field is required</span>}
                            </div>
                        ))}
                        <div className="flex flex-col">
                            <label className="font-medium">Loyalty Member <span className="text-red-500">*</span></label>
                            <select {...register("loyalty_member", { required: true })} className="input input-bordered w-full text-black bg-white">
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            {errors.loyalty_member && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>
                        {["Loyalty Start Date", "Loyalty End Date"].map((field, index) => (
                            <div className="flex flex-col" key={index}>
                                <label className="font-medium">{field}</label>
                                <input type="date" {...register(field.toLowerCase().replace(/ /g, "_"))} className="input input-bordered w-full text-black bg-white" />
                            </div>
                        ))}
                        {["Address", "Remark"].map((field, index) => (
                            <div className="flex flex-col md:col-span-4" key={index}>
                                <label className="font-medium">{field}</label>
                                <textarea {...register(field.toLowerCase().replace(/ /g, "_"))} className="textarea textarea-bordered w-full h-32 text-black bg-white"></textarea>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <button type="submit" className="btn bg-pink-600 hover:bg-pink-700 text-white w-full">Add Course</button>
                        <button type="submit" className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">Add Product</button>
                        <button type="reset" className="btn bg-red-600 hover:bg-red-700 text-white w-full">Cancel</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
