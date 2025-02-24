import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function About() {
	const { theme } = useContext(ThemeContext);

	return (
		<section
			className={`about-section py-5 ${
				theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
			}`}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-10">
						<h1 className="text-center mb-4">About the Project</h1>
						<p className="text-justify">
							This project is a comprehensive web application designed to
							integrate server-side functionalities via REST APIs. It enables
							users to manage and interact with site content dynamically,
							ensuring a seamless and intuitive user experience. Features
							include user authentication, content management, and responsive
							design tailored for all devices.
						</p>
						<p className="text-justify">
							Key functionalities include a robust content management system,
							role-based navigation, and an aesthetically pleasing UI. The
							project is developed using React, CSS, and modern development
							practices to ensure high performance and maintainability.
						</p>
						<h2 className="text-center mt-5 mb-3">About Me</h2>
						<p className="text-justify">
							I am a passionate web developer with a focus on creating
							user-friendly and visually appealing web applications. My
							expertise includes modern JavaScript frameworks, responsive
							design, and crafting clean, maintainable code. This project
							represents my dedication to delivering high-quality solutions and
							continuous growth in the tech industry.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
