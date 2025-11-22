export async function onRequestPost({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Replace with your email
  const YOUR_EMAIL = "dongjie@nexfase.com.au";

  const payload = {
    personalizations: [
      {
        to: [{ email: YOUR_EMAIL }],
      },
    ],
    from: {
      email: "no-reply@nexfase.com.au", // Must use your domain
      name: "Nexfase Website",
    },
    subject: `New Contact Form Submission from ${name}`,
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      },
    ],
  };

  const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return new Response("Message sent successfully!", { status: 200 });
  } else {
    return new Response("Failed to send message.", { status: 500 });
  }
}
