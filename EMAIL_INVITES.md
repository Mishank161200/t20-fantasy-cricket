# Email Invitation Feature

## Auto-Join Functionality ✅ IMPLEMENTED

When setting up a tournament manually, you can now enter email addresses for each owner. When those users log in or sign up with that email address, they will **automatically be added to the tournament** without needing to enter a tournament code!

### How It Works:

1. **During Manual Setup**: Enter email addresses for each owner in the tournament setup page
2. **System Stores Invites**: The emails are saved to the tournament's `invitedEmails` array
3. **User Logs In**: When a user logs in or signs up with an invited email address
4. **Auto-Join**: The system automatically adds them to the tournament and removes their email from the pending invites list
5. **Access Tournament**: User can immediately access the tournament from their tournaments list

### Key Features:

- ✅ Email addresses are normalized (lowercase) for consistency
- ✅ Works for both new sign-ups and existing users logging in
- ✅ Automatically removes email from invite list once user joins
- ✅ User is added to tournament without any manual action required
- ✅ Works across multiple tournaments (user auto-joins all tournaments they're invited to)

## Email Notifications (Optional Enhancement)

To send actual email invitations to users, you would need to implement an email service. Here are the recommended approaches:

### Option 1: SendGrid (Recommended)

1. **Install SendGrid SDK**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Set up environment variable**:
   ```env
   SENDGRID_API_KEY=your_api_key_here
   ```

3. **Create email service** (`lib/email.ts`):
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function sendTournamentInvite(
     toEmail: string, 
     tournamentName: string, 
     hostName: string,
     appUrl: string
   ) {
     const msg = {
       to: toEmail,
       from: 'noreply@yourapp.com', // Your verified sender
       subject: `You're invited to join ${tournamentName}!`,
       html: `
         <h2>Tournament Invitation</h2>
         <p>${hostName} has invited you to join their fantasy cricket tournament: <strong>${tournamentName}</strong></p>
         <p>Simply log in or sign up to automatically join:</p>
         <a href="${appUrl}/auth" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
           Join Tournament
         </a>
       `,
     };
     
     await sgMail.send(msg);
   }
   ```

4. **Update manual setup page** to send emails after saving:
   ```typescript
   // After successful save
   for (const owner of owners) {
     if (owner.email) {
       await sendTournamentInvite(
         owner.email,
         tournament.name,
         user.name,
         window.location.origin
       );
     }
   }
   ```

### Option 2: Firebase Cloud Functions with NodeMailer

1. **Create a Cloud Function** that triggers when a tournament is updated
2. **Use NodeMailer** to send emails via SMTP (Gmail, etc.)
3. **Advantages**: Serverless, scales automatically

### Option 3: Resend (Developer-Friendly)

1. **Simple API** similar to SendGrid but more modern
2. **Better deliverability** for transactional emails
3. **React email templates** support

## Current Implementation

The auto-join feature is **fully functional** without email notifications. Users just need to:

1. Know the tournament exists (host tells them)
2. Log in/sign up with the email address the host entered
3. Tournament automatically appears in their list

This works great for small groups where the host can inform participants via WhatsApp, Slack, or other channels.

## Security Notes

- Email addresses are case-insensitive (all stored as lowercase)
- Invited emails are removed after successful join to prevent duplicate joins
- Only non-deleted tournaments are checked for invitations
- Works seamlessly with the existing authentication flow
