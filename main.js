document.getElementById('email-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    const statusDiv = document.getElementById('status');

    try {
        const response = await fetch('https://api.mailgun.net/v3/YOUR_DOMAIN/messages', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('api:YOUR_API_KEY'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                from: 'you@1et.io',
                to: to,
                subject: subject,
                text: body
            })
        });

        if (response.ok) {
            statusDiv.innerHTML = '<p>Email sent successfully!</p>';
        } else {
            statusDiv.innerHTML = '<p>Failed to send email.</p>';
        }
    } catch (error) {
        console.error(error);
        statusDiv.innerHTML = '<p>Error sending email.</p>';
    }
});
