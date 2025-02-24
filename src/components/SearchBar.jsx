import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchBar() {
	const { searchTerm, setSearchTerm } = useContext(SearchContext);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<input
			type="text"
			className="form-inline mr-sm-2"
			placeholder="Search"
			value={searchTerm}
			onChange={handleInputChange}
			style={{
				color: "var(--text)",
				backgroundColor: "var(--background)",
				border: "none",
				borderRadius: "5px",
				height: "40px",
			}}
		/>
	);
}

export default SearchBar;
