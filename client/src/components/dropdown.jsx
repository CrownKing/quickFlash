import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../components_css/dropdown.css";

const DropdownAutocomplete = ({ options, labelField }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event, newValue) => {
    debugger;
    setSelectedOption(newValue);
  };

  return (
    <>
      <Autocomplete
        className="autoComplete"
        value={selectedOption}
        onChange={(event, newValue) => setSelectedOption(newValue)}
        inputValue={selectedOption ? selectedOption[labelField] : ""}
        onInputChange={handleInputChange}
        options={options}
        getOptionLabel={(option) => option[labelField] || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={selectedOption ? selectedOption[labelField] : ""} // Usando o labelField do objeto selecionado como placeholder
          />
        )}
      />
      <button className="sendButton">Solicitar avaliação</button>
    </>
  );
};

export default DropdownAutocomplete;
