import React, { useCallback, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";

const ReviewForm: React.FC = () => {
  const [name, setName] = useState("");

  // Import 'executeRecaptcha' using 'useReCaptcha' hook
  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!executeRecaptcha) {
        console.error("Execute recaptcha not yet available");
        return;
      }

      // Generate ReCaptcha token
      const token = await executeRecaptcha("form_submit");

      const response = await fetch("/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    },
    [executeRecaptcha]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" content="Submit" />
      </form>
    </>
  );
};

export default ReviewForm;
