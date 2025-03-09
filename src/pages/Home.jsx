import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import axios from "axios";

const Home = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
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
    };

    return (
        <div className={`transition-all duration-300 ${dropdownOpen ? "ml-64" : "ml-0"}`}>
            <Header setDropdownOpen={setDropdownOpen} />
            <main className="p-6 bg-gray-100 min-h-screen text-gray-900">
                <h1 className="text-3xl font-bold text-center mb-8">Add Student Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {["Student ID", "Student Name", "Student Profession", "Gender", "Institute of Student", "Country", "State", "Primary Email Id", "Gmail Id"].map((field, index) => (
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium">{field}</label>
                            <input type="text" className="input input-bordered w-full text-black" />
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <label className="font-medium">Date of Birth</label>
                        <input type="date" className="input input-bordered w-full text-black" />
                    </div>
                    {["Primary Phone Number", "Secondary Phone Number", "Whatsapp Number", "Telegram Number"].map((field, index) => (
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium">{field}</label>
                            <PhoneInput
                                country={selectedCountry?.value || "us"}
                                value={phoneNumbers[field] || ""}
                                onChange={(value) => handlePhoneChange(value, field)}
                                inputStyle={{ width: "100%", height: "40px" }}
                            />
                        </div>
                    ))}
                    {["Loyalty Member", "Loyalty Start Date", "Loyalty End Date"].map((field, index) => (
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium">{field}</label>
                            <input type={field.includes("Date") ? "date" : "text"} className="input input-bordered w-full text-black" />
                        </div>
                    ))}
                    {["Address", "Remark"].map((field, index) => (
                        <div className="flex flex-col md:col-span-4" key={index}>
                            <label className="font-medium">{field}</label>
                            <textarea className="textarea textarea-bordered w-full h-32 text-black"></textarea>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <button className="btn bg-pink-600 hover:bg-pink-700 text-white w-full">Add Course</button>
                    <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">Add Product</button>
                    <button className="btn bg-red-600 hover:bg-red-700 text-white w-full">Cancel</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
