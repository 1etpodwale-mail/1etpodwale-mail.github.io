document.getElementById('email-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the form from reloading the page
    
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;
    const statusDiv = document.getElementById('status');

    try {
        const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
            personalizations: [{
                to: [{ email: to }]  // The recipient's email address
            }],
            from: { email: 'you@1et.io' },  // Sender's email address
            subject: subject,  // Email subject
            content: [{
                type: 'text/plain',
                value: body  // Email content
            }]
        }, {
            headers: {
                'Authorization': `Bearer YOUR_SENDGRID_API_KEY`,  // Replace with your actual API key
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 202) {  // SendGrid returns a 202 status for successful requests
            statusDiv.innerHTML = '<p>Email sent successfully!</p>';
        } else {
            statusDiv.innerHTML = '<p>Failed to send email.</p>';
        }

    } catch (error) {
        console.error(error);
        statusDiv.innerHTML = `<p>Error sending email: ${error.response?.data?.errors[0]?.message || error.message}</p>`;
    }
});
