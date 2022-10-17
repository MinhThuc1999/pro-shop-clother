import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

import "./searchBox.scss";
function SearchForm() {
  const { Search } = Input;
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const submitHandler = (e) => {
    navigate(e ? `/search/?query=${e}` : "/search");
  };
  return (
    <div className="search-form">
      <Search
        placeholder="input search text"
        onSearch={submitHandler}
        style={{
          width: 200,
        }}
      />
    </div>
  );
}

export default SearchForm;
