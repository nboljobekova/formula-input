"use client";
import { useEffect, useState, useCallback } from "react";
import { useGetSuggestionsList } from "@/hooks/useGetList";
import { InputValue } from "@/types/inputs";
import Autosuggest, { SuggestionsFetchRequestedParams, ChangeEvent, InputProps } from 'react-autosuggest';


export function Form() {
  const { data, isLoading } = useGetSuggestionsList();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<InputValue[]|[]>([]);

  useEffect(() => {
    if(data) {
      setSuggestions(data)
    }
  }, [data])

  const getSuggestions = useCallback((value="") => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    let filteredData = suggestions.filter((item: InputValue) =>item.name.toLowerCase().includes(value));
    let resultData = inputLength === 0 ? [] : filteredData

    setSuggestions(resultData);
  }, [value, suggestions])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: ChangeEvent) => {
    setValue(newValue)
  };

  const getSuggestionValue = (suggestion: InputValue) => suggestion.name;

  const renderSuggestion = (suggestion: InputValue) => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    let values = getSuggestions(value);
    setSuggestions(values);
  };

  const inputProps: InputProps<InputValue> = {
    placeholder: 'Choose option',
    value,
    onChange: onChange
  };

  if(isLoading) {
    return <div>...Loading</div>
  }

  return (
    <form className="w-100 flex flex-row items-center p-7">
      <label className="p-7">New Variable</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </form>
  );
}