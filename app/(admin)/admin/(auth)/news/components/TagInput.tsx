import React, { useState, KeyboardEvent } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        const newTag = inputValue.trim();
        if (!value.includes(newTag)) {
          onChange([...value, newTag]);
        }
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="border rounded-md p-2 focus-within:border-indigo-500">
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-indigo-600 hover:text-indigo-800">
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type and press Enter to add tags"}
          className="outline-none flex-grow min-w-[120px]"
        />
      </div>
    </div>
  );
};
