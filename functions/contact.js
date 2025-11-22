// /functions/contact.js
export async function onRequestPost({ request }) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return new Response("All fields are required.", { status: 400 });
    }

    // Replace this with your real email
    const YOUR_EMAIL = "dongjie@nexfase.com.au";

    // MailChannels payload
    const payload = {
      personalizations: [
        { to: [{ email: YOUR_EMAIL }] }
      ],
      from: {
        email: "no-reply@nexfase.com.au", // must be a domain you control
        name: "Nexfase Website"
      },
      subject: `New Contact Form Submission from ${name}`,
      content: [
        {
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        }
      ]
    };

    // Send email via MailChannels
    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return new Response("Message sent successfully!", { status: 200 });
    } else {
      return new Response("Failed to send message.", { status: 500 });
    }

  } catch (err) {
    console.error(err);
    return new Response("An error occurred while sending your message.", { status: 500 });
  }
}


