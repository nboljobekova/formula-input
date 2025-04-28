"use client";
import { useEffect, useState, useCallback, FormEvent } from "react";
import { useGetSuggestionsList } from "@/hooks/useGetList";
import { InputValue } from "@/types/inputs";
import Autosuggest, { SuggestionsFetchRequestedParams, ChangeEvent, InputProps } from 'react-autosuggest';
import styles from "./form.module.scss"


export function Form() {
  const { data, isLoading } = useGetSuggestionsList();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<InputValue[] | []>([]);

  useEffect(() => {
    if (data) {
      setSuggestions(data)
    }
  }, [data])

  const getSuggestions = useCallback((value: string): InputValue[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let filteredData = suggestions.filter((item: InputValue) => item.name.toLowerCase().includes(value));
    let resultData = inputLength === 0 ? [] : filteredData
    setSuggestions(resultData)
    return resultData;
  }, [value, suggestions])

  const onChange = (event: FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
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

  const onSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
    const { value } = params;
    let values: InputValue[] = getSuggestions(value);
    setSuggestions(values);
  };

  const inputProps: InputProps<InputValue> = {
    placeholder: 'Enter variable name',
    value,
    onChange: onChange
  };

  if (isLoading) {
    return <div>...Loading</div>
  }

  return (
    <form className={`${styles.form} flex flex-row p-7`}>
      <label>New Variable</label>
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