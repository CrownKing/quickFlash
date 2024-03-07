import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "../components_css/dropdown.css";

const DropdownAutocomplete = ({ options, labelField, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = async (event, newValue) => {
    const filteredOptions = options.filter(
      (x) => x.nomeDisciplina === newValue
    );
    setSelectedOption(filteredOptions.length > 0 ? filteredOptions[0] : null);
    if (onChange) {
      await onChange(filteredOptions.length > 0 ? filteredOptions[0] : null);
    }
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
    </>
  );
};

export default DropdownAutocomplete;
