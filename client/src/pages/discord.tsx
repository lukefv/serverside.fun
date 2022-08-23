import React, { useEffect } from "react";

function Contact() {

  useEffect(() => {
    window.location.href = "https://discord.gg/MMnnY4jm9K";
  }, []);

  return (
    <div>
      <h2>Redirecting to discord...</h2>
    </div>
  );
}

export default Contact;
