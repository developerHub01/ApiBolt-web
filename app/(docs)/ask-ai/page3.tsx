"use client";

import { useCompletion } from "@ai-sdk/react";

const Page = () => {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/v1/ai/ask-query",
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        title="prompt"
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      <div>{completion}</div>
    </form>
  );
};

export default Page;
